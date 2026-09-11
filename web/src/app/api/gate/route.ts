import { NextResponse } from "next/server";

import {
  GATE_COOKIE_MAX_AGE_SECONDS,
  GATE_COOKIE_NAME,
  signGateCookie,
} from "@/lib/gate/cookie";
import { constantTimeEqualStrings } from "@/lib/gate/crypto";
import { resolveGateEnv } from "@/lib/gate/env";
import {
  checkRateLimit,
  hashIdentifier,
  recordFailure,
  recordSuccess,
} from "@/lib/gate/rate-limit";

export const dynamic = "force-dynamic";

/** Only a same-origin, relative path is ever honoured. */
function sanitizeNextPath(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("://")
  ) {
    return "/";
  }
  return value;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Verifies the preview PIN and sets the gate cookie.
 *
 * A plain form-POST endpoint rather than a server action, for two reasons:
 * the gate must work with no client JavaScript at all (it is the first thing
 * a visitor hits, before any bundle has loaded), and on Cloudflare Workers a
 * `Set-Cookie` written from a server action does not reliably reach the
 * browser. Setting it on this handler's own 303 response does.
 */
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const pin = String(form?.get("pin") ?? "").trim();
  const next = sanitizeNextPath(form?.get("next"));

  const origin = new URL(request.url).origin;
  const back = (error: string) => {
    const url = new URL("/gate", origin);
    url.searchParams.set("next", next);
    url.searchParams.set("error", error);
    return NextResponse.redirect(url, 303);
  };

  const { GATE_PIN, GATE_SECRET } = await resolveGateEnv();

  // Gate disabled server-side — let the visitor through.
  if (!GATE_PIN || !GATE_SECRET) {
    return NextResponse.redirect(new URL(next, origin), 303);
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  const idHash = await hashIdentifier(GATE_SECRET, ip);

  const rate = checkRateLimit(idHash);
  if (!rate.allowed) {
    return back("locked");
  }

  if (!pin || !constantTimeEqualStrings(pin, GATE_PIN.trim())) {
    recordFailure(idHash);
    await delay(400 + Math.floor(Math.random() * 400));
    return back("wrong");
  }

  recordSuccess(idHash);

  const expiryMs = Date.now() + GATE_COOKIE_MAX_AGE_SECONDS * 1000;
  const cookieValue = await signGateCookie(GATE_SECRET, expiryMs);
  const host = request.headers.get("host") ?? "";
  const isLocalHttp = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  const response = NextResponse.redirect(new URL(next, origin), 303);
  response.cookies.set(GATE_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: !isLocalHttp,
    sameSite: "lax",
    path: "/",
    maxAge: GATE_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

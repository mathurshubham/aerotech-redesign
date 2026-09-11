"use server";

import { cookies, headers } from "next/headers";
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

export type VerifyGateResult = { ok: true; next: string } | { ok: false; error: string };

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Only a same-origin, relative path is ever honoured; anything else falls back to `/`. */
function sanitizeNextPath(raw: FormDataEntryValue | null): string {
  const value = typeof raw === "string" ? raw : "";
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("://")
  ) {
    return "/";
  }
  return value;
}

export async function verifyGate(formData: FormData): Promise<VerifyGateResult> {
  const pin = String(formData.get("pin") ?? "").trim();
  const next = sanitizeNextPath(formData.get("next"));

  const { GATE_PIN, GATE_SECRET } = await resolveGateEnv();

  // Gate disabled server-side (no GATE_PIN configured) — let the visitor
  // through rather than trapping them on the gate page.
  if (!GATE_PIN || !GATE_SECRET) {
    return { ok: true, next };
  }

  const headerList = await headers();
  const ip =
    headerList.get("cf-connecting-ip") ?? headerList.get("x-forwarded-for") ?? "unknown";
  const idHash = await hashIdentifier(GATE_SECRET, ip);

  const rate = checkRateLimit(idHash);
  if (!rate.allowed) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfterMs / 60_000));
    return {
      ok: false,
      error: `Too many attempts. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  if (!pin || !constantTimeEqualStrings(pin, GATE_PIN.trim())) {
    recordFailure(idHash);
    // Artificial delay so a scripted 4-digit brute force can't move faster
    // than one attempt every 400-800ms even before the WAF rule engages.
    await delay(400 + Math.floor(Math.random() * 400));
    return { ok: false, error: "Incorrect PIN. Please try again." };
  }

  recordSuccess(idHash);

  const expiryMs = Date.now() + GATE_COOKIE_MAX_AGE_SECONDS * 1000;
  const cookieValue = await signGateCookie(GATE_SECRET, expiryMs);

  const host = headerList.get("host") ?? "";
  const isLocalHttp = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  const cookieStore = await cookies();
  cookieStore.set(GATE_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: !isLocalHttp,
    sameSite: "lax",
    path: "/",
    maxAge: GATE_COOKIE_MAX_AGE_SECONDS,
  });

  // Deliberately no server-side `redirect()` here. On Cloudflare Workers the
  // `Set-Cookie` written by a server action does not survive the redirect
  // response, so the visitor lands back on the gate. Returning the path and
  // navigating from the client keeps the cookie on a plain 200 action
  // response, which does carry it.
  return { ok: true, next };
}

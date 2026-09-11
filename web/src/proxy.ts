import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { GATE_COOKIE_NAME, verifyGateCookie } from "@/lib/gate/cookie";
import { resolveGateEnv } from "@/lib/gate/env";

/**
 * Preview PIN gate. Blocks every route except the gate page itself and the
 * usual crawler/static/API exceptions. See `src/lib/gate/README.md`.
 *
 * `/gate` stays in the matcher (rather than being excluded) so this file can
 * also handle `?logout=1` there — clearing the cookie needs a response to
 * attach a `Set-Cookie` to, which a server component can't do on its own.
 */
export const config = {
  matcher: [
    "/((?!_next/|images/|downloads/|favicon\\.ico|icon|opengraph-image|robots\\.txt|sitemap\\.xml|llms\\.txt|feed\\.xml|api/).*)",
  ],
};

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/gate") {
    if (searchParams.get("logout") === "1") {
      const response = NextResponse.redirect(new URL("/gate", request.url));
      response.cookies.delete(GATE_COOKIE_NAME);
      return response;
    }
    return NextResponse.next();
  }

  const { GATE_PIN, GATE_SECRET } = await resolveGateEnv();

  // No PIN configured: the gate is disabled (local dev without secrets set
  // still works).
  if (!GATE_PIN || !GATE_SECRET) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(GATE_COOKIE_NAME)?.value;
  if (await verifyGateCookie(GATE_SECRET, cookieValue)) {
    return NextResponse.next();
  }

  const gateUrl = new URL("/gate", request.url);
  gateUrl.searchParams.set("next", `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(gateUrl, 302);
}

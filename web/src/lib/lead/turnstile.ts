const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

let warnedDisabled = false;

interface TurnstileVerifyResponse {
  success: boolean;
  [key: string]: unknown;
}

/**
 * Verifies a Cloudflare Turnstile token server-side.
 *
 * If `secret` is unset (e.g. local dev without the widget configured), this
 * is a deliberate no-op that always passes — logged once so it's obvious in
 * server logs that Turnstile is not actually protecting the endpoint.
 */
export async function verifyTurnstile(
  token: string | undefined,
  secret: string | undefined,
  ip?: string,
): Promise<boolean> {
  if (!secret) {
    if (!warnedDisabled) {
      warnedDisabled = true;
      console.warn("Turnstile disabled (no secret)");
    }
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token);
    if (ip) {
      body.set("remoteip", ip);
    }

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    return data.success === true;
  } catch (error) {
    console.error("[lead] Turnstile verification failed", error);
    return false;
  }
}

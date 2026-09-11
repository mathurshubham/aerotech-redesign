/**
 * Signed, PIN-free preview-gate cookie.
 *
 * Value shape: `v1.<expiry-ms>.<base64url HMAC-SHA256 signature>`, where the
 * signature covers the literal string `v1|<expiry-ms>`. The PIN itself never
 * appears in the cookie — only proof that the server issued it before
 * `expiry-ms`, verifiable with `GATE_SECRET` alone.
 */
import { constantTimeEqualBytes, fromBase64Url, hmacSign, toBase64Url } from "./crypto";

export const GATE_COOKIE_NAME = "aero_gate";
export const GATE_COOKIE_VERSION = "v1";
export const GATE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function signingMessage(version: string, expiryMs: string): string {
  return `${version}|${expiryMs}`;
}

/** Issues a fresh cookie value that expires at `expiryMs` (epoch ms). */
export async function signGateCookie(secret: string, expiryMs: number): Promise<string> {
  const expiryStr = String(expiryMs);
  const signature = await hmacSign(secret, signingMessage(GATE_COOKIE_VERSION, expiryStr));
  return `${GATE_COOKIE_VERSION}.${expiryStr}.${toBase64Url(signature)}`;
}

/**
 * Verifies a cookie value: correct version, unexpired, and a signature that
 * matches under constant-time comparison. Returns `false` (never throws) for
 * any malformed, tampered, or expired value.
 */
export async function verifyGateCookie(
  secret: string,
  value: string | undefined | null,
  now: number = Date.now(),
): Promise<boolean> {
  if (!value) return false;

  const parts = value.split(".");
  if (parts.length !== 3) return false;
  const [version, expiryStr, signaturePart] = parts;
  if (version !== GATE_COOKIE_VERSION) return false;

  const expiryMs = Number(expiryStr);
  if (!Number.isFinite(expiryMs) || expiryMs <= now) return false;

  try {
    const expected = await hmacSign(secret, signingMessage(version, expiryStr));
    const actual = fromBase64Url(signaturePart);
    return constantTimeEqualBytes(expected, actual);
  } catch {
    return false;
  }
}

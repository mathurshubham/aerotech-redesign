/**
 * Web Crypto (`crypto.subtle`) primitives shared by the gate cookie and the
 * per-IP rate limiter. Deliberately Web-API-only — no `node:crypto` — so the
 * same code runs unmodified on workerd (Cloudflare Workers / the OpenNext
 * edge middleware bundle) and on Node 22 (both `next dev` and the
 * `node:test` suite).
 */

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + "=".repeat(padLength);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

/** HMAC-SHA256 of `message` with `secret`, raw bytes. */
export async function hmacSign(secret: string, message: string): Promise<Uint8Array> {
  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return new Uint8Array(signature);
}

/** HMAC-SHA256 of `message` with `secret`, base64url-encoded. */
export async function hmacSignBase64Url(secret: string, message: string): Promise<string> {
  return toBase64Url(await hmacSign(secret, message));
}

/** Constant-time byte comparison (does not short-circuit on length or content). */
export function constantTimeEqualBytes(a: Uint8Array, b: Uint8Array): boolean {
  const length = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < length; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

/** Constant-time string comparison (encodes to bytes, then compares). */
export function constantTimeEqualStrings(a: string, b: string): boolean {
  return constantTimeEqualBytes(new TextEncoder().encode(a), new TextEncoder().encode(b));
}

export { toBase64Url, fromBase64Url };

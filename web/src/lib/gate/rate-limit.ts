/**
 * Best-effort per-isolate brute-force mitigation for the 4-digit PIN.
 *
 * This is `Map`-backed in-memory state: it resets whenever the isolate
 * recycles and is never shared across Workers isolates or `next dev`
 * reloads, so it is a speed bump, not the durable control. The durable layer
 * is a Cloudflare WAF rate-limit rule on `POST /gate` — see
 * `src/lib/gate/README.md`.
 */
import { hmacSignBase64Url } from "./crypto";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const BUCKET_TTL_MS = LOCKOUT_MS * 2;

type Bucket = { count: number; lockedUntil: number; lastSeen: number };

const buckets = new Map<string, Bucket>();

function prune(now: number): void {
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastSeen > BUCKET_TTL_MS) buckets.delete(key);
  }
}

/** HMACs `cf-connecting-ip` (or whatever identifier) with `GATE_SECRET` so nothing IP-shaped is held in memory. */
export async function hashIdentifier(secret: string, identifier: string): Promise<string> {
  return hmacSignBase64Url(secret, `rate-limit|${identifier}`);
}

export type RateLimitStatus =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

/** Read-only check: is this identifier currently locked out? */
export function checkRateLimit(idHash: string, now: number = Date.now()): RateLimitStatus {
  const bucket = buckets.get(idHash);
  if (!bucket) return { allowed: true };
  if (bucket.lockedUntil > now) {
    return { allowed: false, retryAfterMs: bucket.lockedUntil - now };
  }
  return { allowed: true };
}

/** Records a failed PIN attempt; locks the identifier out after `MAX_ATTEMPTS`. */
export function recordFailure(idHash: string, now: number = Date.now()): void {
  prune(now);
  const bucket = buckets.get(idHash) ?? { count: 0, lockedUntil: 0, lastSeen: now };
  bucket.count += 1;
  bucket.lastSeen = now;
  if (bucket.count >= MAX_ATTEMPTS) {
    bucket.lockedUntil = now + LOCKOUT_MS;
    bucket.count = 0;
  }
  buckets.set(idHash, bucket);
}

/** Clears any attempt history for the identifier on a successful PIN entry. */
export function recordSuccess(idHash: string): void {
  buckets.delete(idHash);
}

import type { LeadInput } from "./schema";

export interface StoreLeadContext {
  ip?: string;
  ua?: string;
  sourcePath?: string;
}

export interface StoreLeadResult {
  id: string;
  stored: boolean;
}

/** Daily-rotating salt so an IP hash can't be correlated across days. */
async function hashIp(ip: string): Promise<string> {
  const dayBucket = new Date().toISOString().slice(0, 10);
  const encoder = new TextEncoder();
  const data = encoder.encode(`${dayBucket}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Persists a lead to D1 when the `DB` binding is present. Falls back to a
 * console stub in local `next dev` (no wrangler bindings) or if D1 is not
 * yet provisioned.
 */
export async function storeLead(
  lead: LeadInput,
  env: { DB?: CloudflareEnv["DB"] },
  context: StoreLeadContext = {},
): Promise<StoreLeadResult> {
  const id = crypto.randomUUID();

  if (!env.DB) {
    console.info("[lead] stub store");
    return { id, stored: false };
  }

  const ipHash = context.ip ? await hashIp(context.ip) : null;
  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO leads (id, created_at, name, email, topic, target_date, where_, message, ip_hash, ua, source_path)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`,
  )
    .bind(
      id,
      createdAt,
      lead.name,
      lead.email,
      lead.topic,
      lead.targetDate ?? null,
      lead.where ?? null,
      lead.message ?? null,
      ipHash,
      context.ua ?? null,
      context.sourcePath ?? null,
    )
    .run();

  return { id, stored: true };
}

"use server";

import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { LeadInputSchema, type LeadInput } from "@/lib/lead/schema";
import { verifyTurnstile } from "@/lib/lead/turnstile";
import { sendLeadEmail } from "@/lib/lead/notify";
import { storeLead } from "@/lib/lead/store";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Best-effort `CloudflareEnv` lookup that works both when deployed to
 * Workers (via `getCloudflareContext`) and in local `next dev` without
 * wrangler bindings, where it falls back to `process.env` (stub mode).
 */
async function resolveEnv(): Promise<Partial<CloudflareEnv>> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env;
  } catch {
    // Not running under the Cloudflare adapter (e.g. plain `next dev`).
    return {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
      LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL,
      LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL,
      // `DB` intentionally omitted: no local D1 binding outside wrangler.
    };
  }
}

function firstFieldErrors(error: {
  issues: Array<{ path: PropertyKey[]; message: string }>;
}): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in fieldErrors)) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

function readFormValue(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export async function submitLead(formData: FormData): Promise<SubmitLeadResult> {
  // Honeypot check comes first, before any Zod parsing: a bot that fills the
  // hidden `website` field must get a silent fake success, never a
  // validation error that would tip it off. Nothing is logged to storage or
  // email, just a server-side note for our own visibility.
  const honeypot = readFormValue(formData, "website");
  if (honeypot) {
    console.log("[lead] honeypot");
    return { ok: true };
  }

  let parsed: LeadInput;

  try {
    const tsRaw = formData.get("ts");
    const input = {
      name: readFormValue(formData, "name") ?? "",
      email: readFormValue(formData, "email") ?? "",
      topic: readFormValue(formData, "topic") ?? "",
      targetDate: readFormValue(formData, "targetDate"),
      where: readFormValue(formData, "where"),
      message: readFormValue(formData, "message"),
      ts: typeof tsRaw === "string" ? Number(tsRaw) : Number.NaN,
      turnstileToken: readFormValue(formData, "cf-turnstile-response") ?? readFormValue(formData, "turnstileToken"),
    };

    const result = LeadInputSchema.safeParse(input);
    if (!result.success) {
      return {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        fieldErrors: firstFieldErrors(result.error),
      };
    }
    parsed = result.data;
  } catch (error) {
    console.error("[lead] failed to parse submission", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  let headerList: Headers;
  try {
    headerList = await headers();
  } catch (error) {
    console.error("[lead] failed to read headers", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  const ip = headerList.get("cf-connecting-ip") ?? undefined;
  const ua = headerList.get("user-agent") ?? undefined;
  const sourcePath = headerList.get("referer") ?? undefined;

  const env = await resolveEnv();

  if (parsed.turnstileToken || env.TURNSTILE_SECRET_KEY) {
    const verified = await verifyTurnstile(parsed.turnstileToken, env.TURNSTILE_SECRET_KEY, ip);
    if (!verified) {
      return {
        ok: false,
        error: "We couldn't verify you're human. Please try again.",
      };
    }
  }

  const [storeResult, emailResult] = await Promise.allSettled([
    storeLead(parsed, { DB: env.DB }, { ip, ua, sourcePath }),
    sendLeadEmail(parsed, {
      RESEND_API_KEY: env.RESEND_API_KEY,
      LEAD_FROM_EMAIL: env.LEAD_FROM_EMAIL,
      LEAD_TO_EMAIL: env.LEAD_TO_EMAIL,
    }),
  ]);

  if (storeResult.status === "rejected") {
    console.error("[lead] failed to store lead", storeResult.reason);
  }
  if (emailResult.status === "rejected") {
    console.error("[lead] failed to send lead email", emailResult.reason);
  }

  if (storeResult.status === "rejected" && emailResult.status === "rejected") {
    return {
      ok: false,
      error: "We couldn't submit your enquiry. Please email us directly instead.",
    };
  }

  // Storage succeeded (or was reachable) even if the email notification
  // failed — the lead isn't lost, so tell the visitor it went through.
  return { ok: true };
}

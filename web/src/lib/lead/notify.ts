import type { LeadInput } from "./schema";

const RESEND_URL = "https://api.resend.com/emails";

export interface SendLeadEmailResult {
  stubbed: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildBody(lead: LeadInput): { text: string; html: string } {
  const rows: [string, string | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Topic", lead.topic],
    ["Target date", lead.targetDate],
    ["Where", lead.where],
    ["Message", lead.message],
  ];

  const text = rows
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const html = `
    <table cellpadding="4" cellspacing="0">
      ${rows
        .filter(([, value]) => Boolean(value))
        .map(
          ([label, value]) =>
            `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
              String(value),
            ).replace(/\n/g, "<br />")}</td></tr>`,
        )
        .join("\n")}
    </table>
  `.trim();

  return { text, html };
}

/**
 * Sends the "new enquiry" notification via the Resend REST API.
 *
 * When `RESEND_API_KEY` is unset (local dev, or a preview without secrets),
 * this stubs out to a console log instead of calling out to Resend.
 */
export async function sendLeadEmail(
  lead: LeadInput,
  env: Pick<CloudflareEnv, "RESEND_API_KEY" | "LEAD_FROM_EMAIL" | "LEAD_TO_EMAIL">,
): Promise<SendLeadEmailResult> {
  if (!env.RESEND_API_KEY) {
    console.info("[lead] stub email", lead);
    return { stubbed: true };
  }

  const from = env.LEAD_FROM_EMAIL || "Aerotech Website <leads@aerotechss.com>";
  const to = env.LEAD_TO_EMAIL;

  if (!to) {
    console.error("[lead] LEAD_TO_EMAIL is not set; cannot send notification email");
    return { stubbed: true };
  }

  const { text, html } = buildBody(lead);

  const res = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `New enquiry — ${lead.topic} — ${lead.name}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend request failed (${res.status}): ${body}`);
  }

  return { stubbed: false };
}

import { services } from "@/content";

import type { LeadTopicOption } from "./LeadForm";

/**
 * Chip labels for the lead form. Values are service slugs (plus `other`),
 * matching `LEAD_TOPICS` in `src/lib/lead/schema.ts`; labels are the phrasing
 * from `design/Contact.dc.html`.
 */
const CHIP_LABELS: Record<string, string> = {
  orat: "ORAT for a new terminal",
  "audits-compliance": "Audit or compliance",
  "sustainable-aviation": "CORSIA / emissions",
  "aircraft-recovery": "Aircraft recovery",
  "india-market-entry": "India market entry",
  "aero-opt": "Aero Opt",
};

export const leadTopics: LeadTopicOption[] = [
  ...services.map((service) => ({
    value: service.slug,
    label: CHIP_LABELS[service.slug] ?? service.shortTitle,
  })),
  { value: "other", label: "Something else" },
];

/** Resolve a `?topic=` value to a valid chip, or nothing. */
export function resolveTopic(raw?: string | string[]): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  return leadTopics.find((topic) => topic.value === value)?.value;
}

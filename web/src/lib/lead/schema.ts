import { z } from "zod";
import { services } from "@/content/services";

/** Service slugs a lead can pick as their topic, plus a catch-all "other". */
export const LEAD_TOPICS = [
  ...services.map((service) => service.slug),
  "other",
] as const;

export type LeadTopic = (typeof LEAD_TOPICS)[number];

export const LeadInputSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address.")),
  topic: z.enum(LEAD_TOPICS, {
    error: "Pick a topic.",
  }),
  targetDate: z.string().trim().max(40, "Keep the target date short.").optional(),
  where: z.string().trim().max(120, "Keep this under 120 characters.").optional(),
  message: z.string().trim().max(2000, "Keep the message under 2000 characters.").optional(),
  // Client-submitted timestamp (ms) used to reject too-fast (bot-like) submissions.
  ts: z
    .number()
    .refine((value) => Date.now() - value >= 3000, {
      error: "That was fast — please try again.",
    }),
  turnstileToken: z.string().optional(),
});

export type LeadInput = z.infer<typeof LeadInputSchema>;

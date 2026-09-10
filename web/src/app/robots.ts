import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_URL } from "@/lib/utils";

/**
 * Per BUILD-PLAN §3: we want AI citations, so every AI crawler is explicitly allowed —
 * training exposure for a brochure/consulting site is not a risk worth blocking for.
 * New zones default-block AI crawlers since July 2025; this ships our own `Allow: /`
 * rather than relying on a managed robots.txt.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: new URL(SITE_URL).host,
  };
}

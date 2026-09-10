import { insights, getPerson, site } from "@/content";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString();
}

function buildFeed(): string {
  const items = [...insights]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((insight) => {
      const url = absoluteUrl(`/insights/${insight.slug}`);
      const author = getPerson(insight.author);
      return `    <item>
      <title>${escapeXml(insight.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(insight.date)}</pubDate>
      <description>${escapeXml(insight.description)}</description>
      ${author ? `<author>${escapeXml(`${site.nap.email} (${author.name})`)}</author>` : ""}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Insights</title>
    <link>${absoluteUrl("/insights")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en-in</language>
${items}
  </channel>
</rss>
`;
}

export async function GET() {
  return new Response(buildFeed(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

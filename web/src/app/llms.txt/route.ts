import { services, work, people, insights, pages, site } from "@/content";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

function servicePath(slug: string, isTool?: boolean): string {
  return isTool ? "/tools/aero-opt" : `/services/${slug}`;
}

function link(label: string, path: string, detail?: string): string {
  const line = `- [${label}](${absoluteUrl(path)})`;
  return detail ? `${line}: ${detail}` : line;
}

/**
 * Per llms.txt.org and BUILD-PLAN §3: Ahrefs' server-log study found 97% of llms.txt
 * files receive zero requests, so this is deliberately short — a summary and links,
 * nothing more.
 */
function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${site.name}`, "");
  lines.push(`> ${site.description}`, "");

  lines.push("## Services", "");
  for (const s of services) {
    lines.push(link(s.title, servicePath(s.slug, s.isTool), s.oneLiner));
  }
  lines.push("");

  lines.push("## Work", "");
  for (const w of work) {
    lines.push(link(w.title, `/work/${w.slug}`, w.summary));
  }
  lines.push("");

  lines.push("## About", "");
  lines.push(link("About", "/about", site.tagline));
  for (const p of people) {
    lines.push(link(p.name, `/about/${p.slug}`, p.shortBio));
  }
  lines.push("");

  lines.push("## Insights", "");
  for (const i of insights) {
    lines.push(link(i.title, `/insights/${i.slug}`, i.description));
  }
  lines.push("");

  lines.push("## Optional", "");
  for (const slug of ["compliance", "privacy"]) {
    const page = pages.find((p) => p.slug === slug);
    if (page) lines.push(link(page.title, `/${page.slug}`, page.seo.description));
  }

  return `${lines.join("\n")}\n`;
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

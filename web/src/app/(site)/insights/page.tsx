import type { Metadata } from "next";
import Link from "next/link";

import { PageHead, renderText } from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content";
import { breadcrumbGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = metaFor.insights();

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />

      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        title="Answer-first briefings on ORAT, DGCA and CORSIA"
        lede="Short, direct write-ups on the questions we actually get asked — no gated PDF, no newsletter wall."
      />

      <section aria-labelledby="insights-list" className="py-12 lg:py-21">
        <div className="container-site">
          <h2 id="insights-list" className="sr-only">
            All posts
          </h2>
          <ul className="flex flex-col">
            {insights.map((insight) => (
              <li
                key={insight.slug}
                className="border-t border-line py-8 last:border-b lg:py-9"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                  {insight.draft && (
                    <span className="rounded-full border border-orange-500 bg-orange-100 px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-orange-600 uppercase">
                      Draft
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-xl leading-[1.25] font-semibold lg:text-2xl">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="transition-colors duration-150 hover:text-orange-600"
                  >
                    {renderText(insight.title)}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[68ch] text-[0.9375rem] leading-[1.58]">
                  {renderText(insight.description)}
                </p>
                <p className="mt-4 font-mono text-[0.8125rem] text-subtle">
                  {formatDate(insight.date)} · {insight.readingMinutes} min read ·{" "}
                  <Link
                    href="/about/ashwani-khanna"
                    className="text-orange-600 hover:text-orange-500"
                  >
                    Ashwani Khanna
                  </Link>
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-9 font-mono text-[0.8125rem] text-subtle">
            <a href="/feed.xml" className="text-orange-600 hover:text-orange-500">
              RSS feed
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

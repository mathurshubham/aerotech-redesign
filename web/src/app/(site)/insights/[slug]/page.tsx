import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";

import { Breadcrumb, CTABand, Placeholder, PersonCard, Prose, renderText } from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getInsight, getPerson, getService, insightSlugs } from "@/content";
import { articleGraph, breadcrumbGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

import Body_whatIsOrat, { meta as meta_whatIsOrat } from "@/content/insights/what-is-orat.mdx";
import Body_corsia2027, {
  meta as meta_corsia2027,
} from "@/content/insights/corsia-2027-india-operators.mdx";
import Body_dgcaCarMap, {
  meta as meta_dgcaCarMap,
} from "@/content/insights/dgca-car-map-foreign-oems.mdx";

const BODIES: Record<string, ComponentType> = {
  [meta_whatIsOrat.slug]: Body_whatIsOrat,
  [meta_corsia2027.slug]: Body_corsia2027,
  [meta_dgcaCarMap.slug]: Body_dgcaCarMap,
};

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return insightSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metaFor.insight(slug);
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  const Body = BODIES[slug];
  if (!insight || !Body) notFound();

  const author = getPerson(insight.author);
  const firstTagService = getService(
    insight.tags[0]?.toLowerCase().replace(/\s+/g, "-") ?? "",
  );
  const ctaService = firstTagService ?? getService("india-market-entry");

  return (
    <>
      <JsonLd
        data={[
          articleGraph({
            title: insight.seo.title,
            description: insight.seo.description,
            path: `/insights/${insight.slug}`,
            datePublished: insight.date,
            authorSlug: insight.author,
            image: insight.seo.ogImage,
            about: insight.tags,
          }),
          breadcrumbGraph([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: insight.title, path: `/insights/${insight.slug}` },
          ]),
        ]}
      />

      <section aria-labelledby="insight-title" className="border-b border-line bg-surface py-12 lg:py-18">
        <div className="container-site measure">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: insight.title },
            ]}
            className="mb-5"
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-subtle uppercase"
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-[0.8125rem] text-subtle">
              {formatDate(insight.date)} · {insight.readingMinutes} min read
            </span>
          </div>
          <h1
            id="insight-title"
            className="mt-4 max-w-[22ch] font-display text-[2.125rem] leading-[1.1] font-bold lg:text-[2.75rem]"
          >
            {renderText(insight.title)}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.56] text-ink-soft lg:text-xl">
            {renderText(insight.description)}
          </p>
          {insight.draft && (
            <div className="mt-6">
              <Placeholder>Draft — citations to verify</Placeholder>
            </div>
          )}
        </div>
      </section>

      <section aria-label="Article body" className="py-12 lg:py-18">
        <div className="container-site">
          <Prose>
            <Body />
          </Prose>
        </div>
      </section>

      {author && <PersonCard person={author} />}

      <CTABand
        title={
          ctaService
            ? ctaService.oneLiner
            : "Talk to us about your programme"
        }
        topic={ctaService?.slug}
      />
    </>
  );
}

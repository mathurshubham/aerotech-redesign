import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Breadcrumb,
  btnOutline,
  btnPrimary,
  PhotoCaption,
  Prose,
  renderText,
  resolveImage,
} from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCaseStudy, getService, workSlugs } from "@/content";
import { articleGraph, breadcrumbGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return workSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metaFor.case(slug);
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const hero = resolveImage(study.heroImage.src, study.heroImage);
  const relatedService = getService(study.relatedService);
  const relatedHref = relatedService
    ? relatedService.isTool
      ? "/tools/aero-opt"
      : `/services/${relatedService.slug}`
    : "/services/india-market-entry";

  return (
    <>
      <JsonLd
        data={[
          articleGraph({
            title: study.seo.title,
            description: study.seo.description,
            path: `/work/${study.slug}`,
            datePublished: "2026-09-11",
            authorSlug: "ashwani-khanna",
            image: study.seo.ogImage ?? study.heroImage.src,
            about: relatedService ? [relatedService.title] : undefined,
          }),
          breadcrumbGraph([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.title, path: `/work/${study.slug}` },
          ]),
        ]}
      />

      {/* Hero — photo with navy gradient overlay */}
      <section aria-labelledby="case-title" className="relative overflow-hidden bg-band">
        <Image
          src={hero.src}
          alt={study.heroImage.alt}
          width={hero.width}
          height={hero.height}
          unoptimized={hero.unoptimized}
          priority
          sizes="100vw"
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(0deg,var(--navy-900)_4%,rgba(22,32,58,0.82)_52%,rgba(22,32,58,0.55)_100%)]"
        />
        <div className="container-site relative py-14 lg:py-30">
          <Breadcrumb
            onBand
            items={[
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: study.client },
            ]}
            className="mb-5.5"
          />
          <p className="eyebrow-accent">{renderText(study.eyebrow)}</p>
          <h1
            id="case-title"
            className="mt-4 max-w-[21ch] font-display text-[2.125rem] leading-[1.05] font-bold text-white lg:text-[3.625rem]"
          >
            {renderText(study.title)}
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg leading-[1.55] text-navy-300 lg:text-xl">
            {renderText(study.summary)}
          </p>
        </div>
      </section>

      {/* Fact bar */}
      <section aria-label="Engagement facts" className="border-b border-line bg-surface">
        <div className="container-site grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {[
            { label: "Client", value: study.client },
            { label: "Airports", value: study.airports.join(" · ") },
            { label: "Scope", value: study.sector },
            { label: "Our role", value: study.role },
          ].map((fact) => (
            <div key={fact.label} className="bg-surface px-5 py-7 lg:px-6.5">
              <p className="eyebrow">{fact.label}</p>
              <p className="mt-2 text-base font-medium text-ink">
                {renderText(fact.value)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge */}
      <section aria-labelledby="challenge-heading" className="py-14 lg:py-21">
        <div className="container-site grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
          <p id="challenge-heading" className="eyebrow pt-1">
            Challenge
          </p>
          <Prose>
            {study.challenge.map((paragraph, i) => (
              <p key={i}>{renderText(paragraph)}</p>
            ))}
          </Prose>
        </div>
      </section>

      {/* Image pair */}
      {study.gallery.length > 0 && (
        <section aria-label="Project photography" className="pb-4">
          <div className="container-site grid gap-6 sm:grid-cols-2">
            {study.gallery.map((image) => {
              const img = resolveImage(image.src, image);
              return (
                <figure key={image.src + image.alt}>
                  <Image
                    src={img.src}
                    alt={image.alt}
                    width={img.width}
                    height={img.height}
                    unoptimized={img.unoptimized}
                    loading="lazy"
                    sizes="(min-width: 1024px) 588px, 100vw"
                    className="h-auto w-full rounded-lg object-cover"
                  />
                  {image.caption && <PhotoCaption>{image.caption}</PhotoCaption>}
                </figure>
              );
            })}
          </div>
        </section>
      )}

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="py-14 lg:py-18">
        <div className="container-site grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
          <p id="approach-heading" className="eyebrow pt-1">
            Approach
          </p>
          <ol className="measure">
            {study.approach.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[44px_1fr] gap-5 border-t border-line py-6 last:border-b"
              >
                <span className="font-mono text-sm text-orange-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {renderText(step.title)}
                  </h3>
                  <p className="mt-2 text-base leading-[1.62]">
                    {renderText(step.body)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcome — dark band */}
      <section aria-labelledby="outcome-heading" className="bg-band py-14 lg:py-21">
        <div className="container-site grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-14">
          <p id="outcome-heading" className="eyebrow-accent pt-1">
            Outcome
          </p>
          <div>
            <p className="max-w-[30ch] border-l-[3px] border-orange-500 pl-6 font-display text-2xl leading-[1.28] font-medium text-white">
              {renderText(study.outcome.quote)}
            </p>
            <p className="mt-8 max-w-[62ch] text-[1.0625rem] leading-[1.65] text-band-muted">
              {renderText(study.outcome.body)}
            </p>

            {study.outcome.stats.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-px border border-band-line bg-band-line lg:grid-cols-4">
                {study.outcome.stats.map((stat, i) => (
                  <div key={stat.label} className="bg-band px-5.5 py-6">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span
                        className={cn(
                          "block font-mono text-2xl leading-none",
                          i === study.outcome.stats.length - 1
                            ? "text-orange-500"
                            : "text-white",
                        )}
                      >
                        {renderText(stat.value)}
                      </span>
                      <span className="mt-2.5 block text-[0.8125rem] leading-[1.45] text-band-muted">
                        {renderText(stat.label)}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {study.placeholders.length > 0 && (
              <div className="mt-7 flex items-start gap-4 rounded-lg border border-band-line bg-[#0F1729] px-6 py-5.5">
                <span className="mt-0.5 font-mono text-xs text-orange-500">
                  PLACEHOLDER
                </span>
                <ul className="flex flex-col gap-1.5">
                  {study.placeholders.map((placeholder) => (
                    <li key={placeholder} className="text-sm leading-[1.6] text-[#8C95B0]">
                      {renderText(placeholder)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next — related service CTA row */}
      <section aria-labelledby="next-heading" className="bg-surface py-14 lg:py-18">
        <div className="container-site flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="next-heading"
              className="max-w-[26ch] font-display text-2xl leading-[1.18] font-semibold lg:text-[1.875rem]"
            >
              {relatedService
                ? relatedService.oneLiner
                : "Bringing aviation equipment into the Indian market?"}
            </h2>
            <p className="mt-3 max-w-[52ch] text-base leading-[1.6]">
              {relatedService
                ? relatedService.summary.split(". ")[0] + "."
                : "That path is now a service."}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact#book" className={btnPrimary}>
              Book a consultation
            </Link>
            <Link href={relatedHref} className={btnOutline}>
              {relatedService ? relatedService.shortTitle : "India market entry"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

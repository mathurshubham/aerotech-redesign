import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  CTABand,
  linkArrow,
  PageHead,
  Placeholder,
  Prose,
} from "@/components/site";
import Body, { meta } from "@/content/insights/dgca-car-map-foreign-oems.mdx";
import { getService } from "@/content";
import { breadcrumbGraph, webPageGraph } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

const PATH = "/services/india-market-entry/dgca-guide";

export const metadata = buildMetadata({
  title: meta.seo.title,
  description: meta.seo.description,
  path: PATH,
});

export default function DgcaGuidePage() {
  const service = getService("india-market-entry");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbGraph([
            { name: "Services", path: "/services" },
            { name: "India market entry", path: "/services/india-market-entry" },
            { name: "DGCA guide", path: PATH },
          ]),
          webPageGraph({
            title: meta.title,
            description: meta.description,
            path: PATH,
          }),
        ]}
      />

      <PageHead
        crumbs={[
          { label: "Services", href: "/services" },
          { label: "India market entry", href: "/services/india-market-entry" },
          { label: "DGCA guide" },
        ]}
        title={meta.title}
        lede={meta.description}
        aside={
          <div className="border-t border-band-line pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
            <p className="eyebrow-accent">Status</p>
            <p className="mt-4">
              <Placeholder>draft — verify citations</Placeholder>
            </p>
            <p className="mt-4 text-sm leading-[1.55] text-band-muted">
              Every regulatory reference below is marked where it still needs
              checking against the current DGCA text before you rely on it.
            </p>
            <dl className="mt-5 flex flex-col gap-3.5 border-t border-band-line pt-5">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <dt className="text-band-muted">Reading time</dt>
                <dd className="font-mono text-white">
                  {meta.readingMinutes} min
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <dt className="text-band-muted">Service</dt>
                <dd className="font-mono text-white">India market entry</dd>
              </div>
            </dl>
          </div>
        }
      />

      <section aria-labelledby="guide-body" className="py-12 lg:py-21">
        <div className="container-site">
          <h2 id="guide-body" className="eyebrow">
            The guide
          </h2>
          <Prose className="mt-8">
            <Body />
          </Prose>
          {service && (
            <p className="measure mt-12 border-t border-line pt-6">
              <Link href="/services/india-market-entry" className={linkArrow}>
                Back to {service.shortTitle} →
              </Link>
            </p>
          )}
        </div>
      </section>

      <CTABand
        title="Talk to us"
        body="Tell us the product, the airframe or system it touches, and who you have already approached."
        topic="india-market-entry"
        primary={{
          label: "Book a consultation",
          href: "/contact?topic=india-market-entry#book",
        }}
      />
    </>
  );
}

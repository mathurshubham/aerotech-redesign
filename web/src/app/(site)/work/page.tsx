import type { Metadata } from "next";

import { CaseCard, CTABand, Placeholder, PageHead } from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { work } from "@/content";
import { metaFor } from "@/lib/seo";
import { breadcrumbGraph } from "@/lib/jsonld";

export const metadata: Metadata = metaFor.work();

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
        title="Selected engagements"
        lede="Four engagements, in the operator's own words: what the problem actually was, what was done, and what happened. No case study here claims a figure that cannot be substantiated."
      />

      <section aria-labelledby="work-grid" className="py-12 lg:py-21">
        <div className="container-site">
          <h2 id="work-grid" className="sr-only">
            Case studies
          </h2>
          <ul className="grid gap-6 lg:grid-cols-2">
            {work.map((study) => (
              <li key={study.slug}>
                <CaseCard study={study} />
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Placeholder>
              [PLACEHOLDER: aggregate counts — projects, airports, audits, ORATs]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABand
        title="Bring the engagement that cannot be allowed to fail"
        body="A thirty-minute call with the person who runs it."
      />
    </>
  );
}

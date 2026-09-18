import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  Breadcrumb,
  btnOutline,
  btnPrimary,
  CTABand,
  renderText,
  resolveImage,
  SectionHeading,
  StatBand,
} from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbGraph, webPageGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { getPerson, site } from "@/content";

export const metadata: Metadata = metaFor.about();

const RECORD = [
  {
    value: "T3",
    label: "ORAT and commissioning of Delhi Terminal 3, with the GMR Group",
  },
  {
    value: "119 → 1",
    label: "Terminal 1D's ACI-ASQ ranking — then held at No. 1 twice in a row",
  },
  {
    value: "World 1st",
    label: "TaxiBot operations, cleared with both Airbus and Boeing",
  },
  {
    value: "4",
    label: "Auditor certifications — ISO 9001, 45001, 14064 and AS9100D",
  },
];

const CERTIFICATIONS = [
  { code: "ISO 9001", note: "Quality — lead auditor", wide: false },
  { code: "ISO 45001", note: "Safety — lead auditor", wide: false },
  { code: "ISO 14064", note: "Greenhouse gas — lead auditor", wide: false },
  { code: "AS9100D", note: "Aerospace auditor", wide: false },
  {
    code: "ICAO CORSIA",
    note: "Certified on verification and validation",
    wide: true,
  },
];

export default function AboutPage() {
  const principal = getPerson("ashwani-khanna");
  const photo = principal
    ? resolveImage(principal.photo.src, principal.photo)
    : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbGraph([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          webPageGraph({
            title: "About",
            description:
              "Aerotech Support Services advises airlines, airports and aerospace suppliers on planning, operations management and technical compliance — deliberately small, led by director Ashwani Khanna.",
            path: "/about",
          }),
        ]}
      />
      <section
        aria-labelledby="page-title"
        className="border-b border-line bg-surface py-11 lg:py-21"
      >
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-20">
          <div>
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "About" }]}
              className="mb-5"
            />
            <h1
              id="page-title"
              className="max-w-[22ch] font-display text-[2.125rem] leading-[1.07] font-bold lg:text-[3.125rem]"
            >
              A consultancy the size of the person running it
            </h1>
            <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.56] text-ink-soft lg:mt-6.5 lg:text-xl">
              {site.legalName} advises airlines, airports and aerospace
              suppliers on planning, operations management and technical
              compliance. We are deliberately small: the person who scopes your
              engagement is the person who delivers it.
            </p>
            <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-[1.66]">
              That is a constraint as much as a pitch. We take on work where
              thirty years of operational judgement is the thing that matters —
              a terminal transfer, an approval nobody has granted before, an
              audit that has to hold up. For anything that needs a hundred
              consultants, we will tell you so on the call.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-9">
              <Link href="/contact#book" className={btnPrimary}>
                Book a consultation
              </Link>
              <Link href="/work" className={btnOutline}>
                See our work
              </Link>
            </div>
          </div>

          {principal && photo && (
            <div className="max-w-[320px] lg:max-w-none">
              <Image
                src={photo.src}
                alt={principal.photo.alt}
                width={photo.width}
                height={photo.height}
                unoptimized={photo.unoptimized}
                priority
                sizes="(min-width: 1024px) 440px, 320px"
                className="h-auto w-full rounded-t-lg object-cover"
              />
              <div className="rounded-b-lg border border-t-0 border-line bg-surface px-5 py-5">
                <p className="font-display text-xl font-semibold text-ink">
                  {principal.name}
                </p>
                <p className="mt-1.5 font-mono text-xs tracking-[0.07em] text-aqua-700 uppercase">
                  {principal.role}
                </p>
                <p className="mt-3 text-sm leading-[1.55]">
                  Almost thirty years across aircraft manufacturing, maintenance
                  and airport service delivery.
                </p>
                <Link
                  href={`/about/${principal.slug}`}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-aqua-700 hover:text-aqua-600"
                >
                  Full profile →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <StatBand
        stats={RECORD}
        eyebrow="The record, in four numbers"
        label="The record, in four numbers"
        accentIndex={1}
      />

      {principal && (
        <section aria-labelledby="career-heading" className="py-12 lg:py-21">
          <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-18">
            <div>
              <p className="eyebrow">Aviation career</p>
              <h2
                id="career-heading"
                className="mt-3 font-display text-2xl leading-[1.16] font-semibold lg:text-[1.875rem]"
              >
                Operator side, not adviser side
              </h2>
              <p className="mt-3.5 mb-6 text-base leading-[1.6]">
                Every role below was inside an operation with a schedule to
                hold, not alongside one.
              </p>
              <ul>
                {principal.career.map((role) => (
                  <li
                    key={`${role.role}-${role.org}`}
                    className="grid grid-cols-1 gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <span className="text-base font-medium text-ink">
                      {role.role}
                    </span>
                    <span className="font-mono text-[0.8125rem] text-subtle">
                      {role.org}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-10">
              <section aria-labelledby="certifications-heading">
                <h2 id="certifications-heading" className="eyebrow">
                  Certifications
                </h2>
                <ul className="mt-4.5 grid gap-3 sm:grid-cols-2">
                  {CERTIFICATIONS.map((cert) => (
                    <li
                      key={cert.code}
                      className={`rounded-lg border bg-surface px-5 py-4.5 ${
                        cert.wide
                          ? "border-aqua-500 sm:col-span-2"
                          : "border-line"
                      }`}
                    >
                      <p className="font-mono text-sm font-medium text-ink">
                        {cert.code}
                      </p>
                      <p className="mt-1.5 text-[0.8125rem] text-subtle">
                        {cert.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="honours-heading">
                <h2 id="honours-heading" className="eyebrow">
                  Honours
                </h2>
                <ul className="mt-4">
                  {principal.honours.map((honour) => (
                    <li
                      key={honour}
                      className="border-t border-line py-3.5 text-[0.9375rem] text-ink last:border-b"
                    >
                      {renderText(honour)}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="positions-heading">
                <h2 id="positions-heading" className="eyebrow">
                  Industry positions
                </h2>
                <ul className="mt-4">
                  {principal.affiliations.map((affiliation) => (
                    <li
                      key={affiliation}
                      className="border-t border-line py-3.5 text-[0.9375rem] text-ink last:border-b"
                    >
                      {renderText(affiliation)}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </section>
      )}

      {principal && (
        <section
          aria-labelledby="engagements"
          className="border-t border-line bg-surface py-12 lg:py-21"
        >
          <div className="container-site">
            <SectionHeading
              eyebrow="Selected engagements"
              title="Where the judgement was earned"
              id="engagements"
            />
            <ul className="grid gap-x-14 lg:grid-cols-2">
              {principal.keyProjects.map((project, i) => (
                <li
                  key={project.client}
                  className={
                    i === 0 || i === 3
                      ? "border-t-2 border-ink py-5.5"
                      : "border-t border-line py-5.5"
                  }
                >
                  <p className="eyebrow-accent">
                    {project.client}
                  </p>
                  <p className="mt-2 text-base leading-[1.55] text-ink">
                    {renderText(project.body)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand
        title="Thirty minutes, with the person who would run it"
        body="Aerocity, adjacent to Delhi IGI. Or wherever the terminal is."
      />
    </>
  );
}

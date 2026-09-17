import type { Metadata } from "next";

import {
  CaseFeature,
  CredentialStrip,
  CTABand,
  Hero,
  LogoRow,
  MandateGrid,
  PersonCard,
  Reveal,
  Section,
  SectionHeading,
  SectionRail,
  ServiceCard,
  CaseCard,
} from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { getCaseStudy, getPerson, services, site } from "@/content";

export const metadata: Metadata = metaFor.home();

/**
 * The homepage's slides, in scroll order, for `SectionRail`. Labels are what
 * the rail shows on hover — short enough to read at a glance, and named for
 * what the visitor gets rather than for the component that renders it.
 */
const SLIDES = [
  { id: "start", label: "Start" },
  { id: "mandates-section", label: "Scope of engagement" },
  { id: "practices", label: "Practice areas" },
  { id: "case", label: "TaxiBot case" },
  { id: "principal", label: "Engagement lead" },
  { id: "engagements", label: "Engagement record" },
  { id: "book", label: "Contact" },
];

const HERO_IMAGE = {
  src: "/images/aircraft-approach.jpg",
  alt: "Aircraft on final approach against a clear sky",
  width: 2560,
  height: 1655,
};

export default function Home() {
  const principal = getPerson("ashwani-khanna");
  const taxibot = getCaseStudy("taxibot-india");
  const proof = ["delhi-t3-orat", "stelia-aerospace"]
    .map((slug) => getCaseStudy(slug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study));

  return (
    <>
      <JsonLd
        data={webPageGraph({
          title: `${site.name} — Aviation & airport consulting, New Delhi`,
          description: site.description,
          path: "/",
        })}
      />
      {/* The rail is scroll-as-navigation, not narrative: on a page paced as
          slides the visitor needs to know where they are and how much is
          left. Every id below belongs to a `.section-slide`; `LogoRow` is a
          rail rather than a slide and so has no dot. */}
      <SectionRail items={SLIDES} />

      <Hero
        id="start"
        eyebrow="Aviation & airport consulting · New Delhi"
        title={site.tagline}
        body="Thirty years of airport and airline operations in India. Every engagement is led by the certified lead auditor who signs the report and represents you before the regulator."
        image={HERO_IMAGE}
        primary={{ label: "Book a consultation", href: "/contact#book" }}
        secondary={{ label: "Review the case record", href: "/work/taxibot-india" }}
        proof="Thirty minutes with Ashwani Khanna, Director. Response within one working day."
        footer={<CredentialStrip credentials={site.credentials} label="Credentials" />}
      />

      {/* Deliberately not a slide: a 150px proof rail between the first and
          second screens. Forcing it to `100dvh` would buy a screen of empty
          white. */}
      <LogoRow />

      {/* `tone="band"`, not the `surface` a bare `CaseFeature`/`PersonCard`
          would default to: `LogoRow` right above is already a white rail and
          the "Five practices" section right below is `paper`, so `surface`
          here would repeat the ground on one side or the other. `band` is
          the one tone that alternates against both neighbours. */}
      <MandateGrid id="mandates-section" tone="band" slide />

      <Section id="practices" tone="paper" slide aria-labelledby="services">
        <div className="container-site">
          <SectionHeading
            eyebrow="Practice areas"
            title="Five practice areas, one operating discipline"
            id="services"
            link={{ label: "All services", href: "/services" }}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug}>
                <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                  <ServiceCard
                    service={service}
                    variant={
                      service.isTool
                        ? "tool"
                        : service.slug === "india-market-entry"
                          ? "featured"
                          : "default"
                    }
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {taxibot && <CaseFeature id="case" study={taxibot} tone="band" slide />}

      {principal && <PersonCard id="principal" person={principal} tone="surface" slide />}

      <Section id="engagements" tone="paper" slide aria-labelledby="selected-work">
        <div className="container-site">
          <SectionHeading
            eyebrow="Engagement record"
            title="Selected engagements"
            id="selected-work"
            link={{ label: "All engagements", href: "/work" }}
          />
          <ul className="grid gap-6 lg:grid-cols-2">
            {proof.map((study, i) => (
              <li key={study.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <CaseCard study={study} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTABand
        id="book"
        tone="band"
        slide
        eyebrow="Contact"
        title="Discuss an engagement"
        body="Thirty minutes with the director who would lead the engagement. Bring a terminal opening date, an audit scope, or an approval that has stalled."
        form
      />
    </>
  );
}

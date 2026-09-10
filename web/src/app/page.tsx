import type { Metadata } from "next";

import {
  CaseFeature,
  CredentialStrip,
  CTABand,
  Hero,
  LogoRow,
  PersonCard,
  Reveal,
  SectionHeading,
  ServiceCard,
  CaseCard,
} from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { getCaseStudy, getPerson, services, site } from "@/content";

export const metadata: Metadata = metaFor.home();

const HERO_IMAGE = {
  src: "/images/hero-runway.jpg",
  alt: "Approach lighting on final into Indira Gandhi International, Delhi",
  width: 1080,
  height: 720,
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
      <Hero
        eyebrow="Aviation & airport consulting · New Delhi"
        title={site.tagline}
        body="Thirty years of Indian aviation operations, compliance and ORAT. We delivered the world's first TaxiBot operations with both Airbus and Boeing."
        image={HERO_IMAGE}
        primary={{ label: "Book a consultation", href: "/contact#book" }}
        secondary={{ label: "See our work", href: "/work" }}
      />

      <CredentialStrip credentials={site.credentials} label="Credentials" />

      <LogoRow />

      <section aria-labelledby="services" className="py-12 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we do"
            title="Five practices, one operating discipline"
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
      </section>

      {taxibot && <CaseFeature study={taxibot} />}

      {principal && <PersonCard person={principal} />}

      <section aria-labelledby="selected-work" className="py-12 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Selected work"
            title="Proof, not positioning"
            id="selected-work"
            link={{ label: "All work", href: "/work" }}
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
      </section>

      <CTABand
        id="book"
        title="Talk to us about your project"
        body="Thirty minutes with the person who would run the engagement. Bring a terminal opening date, an audit scope, or an approval you cannot get through."
        form
      />
    </>
  );
}

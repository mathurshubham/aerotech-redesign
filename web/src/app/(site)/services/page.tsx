import {
  CTABand,
  PageHead,
  renderText,
  Reveal,
  SectionHeading,
  ServiceCard,
} from "@/components/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, site } from "@/content";
import { breadcrumbGraph, webPageGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";

export const metadata = metaFor.services();

const HOW_WE_ENGAGE = [
  {
    n: "01",
    title: "A scope call",
    body: `Thirty minutes with the person who would run the engagement. Bring the date you are working against, even a provisional one. ${site.responsePromise}`,
  },
  {
    n: "02",
    title: "A written proposal",
    body: "A scope, a phase plan and a deliverables list you can hold us to — not a capability deck. [PLACEHOLDER: confirm proposal turnaround in working days]",
  },
  {
    n: "03",
    title: "A named lead",
    body: "The person who scoped the work delivers it. No handover to an account team, no junior working off someone else's certification.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbGraph([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          webPageGraph({
            title: "Services",
            description:
              "Airport lifecycle consulting: ORAT, audits and compliance, sustainable aviation, aircraft recovery and India market entry.",
            path: "/services",
          }),
        ]}
      />

      <PageHead
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="Five practices, one operating discipline"
        lede="Every engagement below is run by the person who scopes it, against a date somebody else has already announced."
      />

      <section aria-labelledby="services" className="py-12 lg:py-21">
        <div className="container-site">
          <p className="eyebrow">What we do</p>
          <h2
            id="services"
            className="mt-3 max-w-[26ch] font-display text-[1.75rem] leading-[1.14] font-semibold lg:text-[2.125rem]"
          >
            One discipline, applied to five problems
          </h2>
          <p className="measure mt-5 text-base leading-[1.62]">
            The practices differ; the method does not. Baseline what is actually
            in place, name the gaps while they are still cheap to close, write
            the procedures the operation will run on, then rehearse them before
            the date arrives. That sequence is the same whether it is a terminal
            transfer, a certification audit, a CORSIA reporting cycle, a
            disabled-aircraft plan or a DGCA approval nobody has been granted
            before. It is also why the work is deliberately small: the judgement
            is the deliverable, and it does not scale by adding consultants.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
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

      <section
        aria-labelledby="how-we-engage"
        className="border-y border-line bg-surface py-12 lg:py-21"
      >
        <div className="container-site">
          <SectionHeading
            eyebrow="How we engage"
            title="Three steps, then work starts"
            id="how-we-engage"
            link={{ label: "Book a consultation", href: "/contact#book" }}
          />
          <ol className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {HOW_WE_ENGAGE.map((step) => (
              <li key={step.n} className="border-t-2 border-ink pt-5">
                <p className="font-mono text-eyebrow font-medium tracking-[0.11em] text-orange-500">
                  {step.n}
                </p>
                <h3 className="mt-2.5 font-display text-lg leading-[1.3] font-semibold lg:text-[1.3125rem]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.58] lg:text-[0.9375rem]">
                  {renderText(step.body)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        title="Tell us what you are trying to get through"
        body="A terminal opening date, an audit scope, an approval that has stalled. Thirty minutes with the person who would run it."
      />
    </>
  );
}

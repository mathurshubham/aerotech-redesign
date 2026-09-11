import Link from "next/link";

import {
  btnPrimary,
  CaseCard,
  DeliverablesGrid,
  FAQ,
  focusRing,
  PageHead,
  PhaseTimeline,
  renderText,
  Reveal,
  SectionHeading,
  serviceHref,
  StatBand,
  CTABand,
  type Crumb,
} from "@/components/site";
import { getCaseStudy, getPerson, getService, type Service, type Stat } from "@/content";

const NUMBER_WORDS = [
  "No",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/**
 * The "engagement shape" rows in the page-head aside. Every row is derived
 * from the service's own content — the T-window of its first phase, its phase
 * and deliverable counts, and the named lead from `content/people`. Nothing is
 * invented: a row is omitted when the content cannot support it.
 */
function engagementRows(service: Service): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];

  const window = service.phases[0]?.window ?? "";
  const tWindow = /^T[-−]\d+/.exec(window);
  if (tWindow) {
    rows.push({ label: "Engaged from", value: tWindow[0].replace("-", "−") });
  }

  if (service.phases.length > 0) {
    rows.push({ label: "Phases", value: String(service.phases.length) });
  }
  if (service.deliverables.length > 0) {
    rows.push({ label: "Deliverables", value: String(service.deliverables.length) });
  }

  const lead = getPerson("ashwani-khanna");
  if (lead) rows.push({ label: "Led by", value: lead.name });

  return rows;
}

/**
 * Long-form explainer pages that sit under a service. Routing, not content —
 * the copy on each page comes from `content/`.
 */
const PILLARS: Record<string, { href: string; title: string; body: string }> = {
  "india-market-entry": {
    href: "/services/india-market-entry/dgca-guide",
    title: "A foreign OEM's guide to DGCA's CARs",
    body: "Where to start on eGCA, which Civil Aviation Requirement applies, and what a realistic approval timeline looks like.",
  },
};

/** "Four phases against your opening date" only when the phases are T-windowed. */
function phaseHeading(service: Service): string {
  const count = numberWord(service.phases.length);
  return /^T[-−]/.test(service.phases[0]?.window ?? "")
    ? `${count} phases against your opening date`
    : `${count} stages, in the order they run`;
}

/**
 * One service page, composed per `design/Orat.dc.html`: dark page head with an
 * engagement-shape aside, who-it's-for 3-up on 2px ink rules, a deliverables
 * intro column beside the hairline grid, the phase timeline, a navy why-us
 * band with the related panel, related work, the FAQ, and the CTA band.
 *
 * Shared by `/services/[slug]` and `/tools/aero-opt`.
 */
export function ServicePage({
  service,
  crumbs,
  asideEyebrow = "Engagement shape",
  stats,
}: {
  service: Service;
  crumbs: Crumb[];
  /** The aside's mono label. `/tools/aero-opt` passes "Tool". */
  asideEyebrow?: string;
  /** Rendered as a `StatBand` under the page head when supplied. */
  stats?: Stat[];
}) {
  const rows = engagementRows(service);
  const relatedWork = service.relatedWork
    .map((slug) => getCaseStudy(slug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study));
  const relatedServices = service.relatedServices
    .map((slug) => getService(slug))
    .filter((related): related is Service => Boolean(related));
  const contactHref = `/contact?topic=${service.slug}#book`;
  const pillar = PILLARS[service.slug];
  const relatedLinks = [
    ...relatedServices.map((related) => ({
      key: related.slug,
      href: serviceHref(related),
      title: related.title,
      body: related.oneLiner,
    })),
    ...(pillar ? [{ key: "pillar", ...pillar }] : []),
  ];

  return (
    <>
      <PageHead
        crumbs={crumbs}
        title={service.title}
        lede={service.oneLiner}
        aside={
          <div className="border-t border-band-line pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
            <p className="eyebrow-accent">{asideEyebrow}</p>
            {rows.length > 0 && (
              <dl className="mt-4 flex flex-col gap-3.5">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="text-band-muted">{row.label}</dt>
                    <dd className="font-mono text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        }
      />

      {stats && stats.length > 0 && (
        <StatBand stats={stats} eyebrow="In numbers" label="In numbers" />
      )}

      <section
        aria-labelledby="who-for"
        className="border-b border-line bg-surface py-12 lg:py-21"
      >
        <div className="container-site">
          <p className="eyebrow">Who this is for</p>
          <h2
            id="who-for"
            className="mt-3 font-display text-[1.75rem] leading-[1.14] font-semibold lg:text-[2.125rem]"
          >
            {numberWord(service.forWhom.length)} teams, one handover
          </h2>
          <ul className="mt-6 grid gap-6 lg:mt-7 lg:grid-cols-3">
            {service.forWhom.map((group) => (
              <li key={group.title} className="border-t-2 border-ink pt-5">
                <h3 className="font-display text-lg leading-[1.3] font-semibold lg:text-[1.3125rem]">
                  {renderText(group.title)}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.58] lg:text-[0.9375rem]">
                  {renderText(group.body)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="deliverables" className="py-12 lg:py-21">
        <div className="container-site grid gap-10 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-18">
          <div>
            <p className="eyebrow">What you get</p>
            <h2
              id="deliverables"
              className="mt-3 font-display text-[1.75rem] leading-[1.14] font-semibold lg:text-[2.125rem]"
            >
              Deliverables, not a deck
            </h2>
            <p className="mt-4 text-base leading-[1.62]">
              {renderText(service.summary)}
            </p>
          </div>
          <Reveal>
            <DeliverablesGrid deliverables={service.deliverables} />
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="how-it-runs"
        className="border-t border-line bg-surface py-12 lg:py-21"
      >
        <div className="container-site">
          <p className="eyebrow">How it runs</p>
          <h2
            id="how-it-runs"
            className="mt-3 max-w-[26ch] font-display text-[1.75rem] leading-[1.14] font-semibold lg:text-[2.125rem]"
          >
            {phaseHeading(service)}
          </h2>
          <Reveal className="mt-9 lg:mt-11">
            <PhaseTimeline phases={service.phases} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="why-us" className="bg-band py-12 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-18">
          <div>
            <p className="eyebrow-accent">Why us on this</p>
            <h2
              id="why-us"
              className="mt-3 max-w-[24ch] font-display text-[1.75rem] leading-[1.16] font-semibold text-white lg:text-[2.125rem]"
            >
              The person who scopes it is the person who runs it
            </h2>
            <p className="mt-5 max-w-[50ch] text-[1.0625rem] leading-[1.6] text-band-muted">
              {renderText(service.whyUs)}
            </p>
            {service.credentialsForThis.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {service.credentialsForThis.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-band-line px-3.5 py-1.5 font-mono text-[0.8125rem] text-band-ink"
                  >
                    {renderText(credential)}
                  </li>
                ))}
              </ul>
            )}
            <Link href={contactHref} className={`${btnPrimary} mt-8`}>
              Book a consultation
            </Link>
          </div>

          {relatedLinks.length > 0 && (
            <div className="rounded-lg border border-band-line bg-band-deep px-6 py-6 lg:px-8.5 lg:py-8">
              {/*
                This card sits on `bg-band-deep`, not inside a `.band`
                ancestor, so the default `.eyebrow` (`text-subtle`) never
                gets the on-band override — it was rendering the light-mode
                colour on a navy background (a pre-existing contrast miss,
                worse once `text-subtle` darkened for the paper/surface AA
                fix). `text-band-muted` is the correct on-band eyebrow
                colour, same as `.band .eyebrow`.
              */}
              <p className="eyebrow text-band-muted">Related</p>
              <ul className="mt-3">
                {relatedLinks.map((related) => (
                  <li
                    key={related.key}
                    className="border-b border-band-line py-4.5 last:border-b-0 last:pb-0"
                  >
                    <Link
                      href={related.href}
                      className={`-my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 font-display text-[1.0625rem] font-semibold text-white transition-colors duration-150 hover:text-orange-500 ${focusRing}`}
                    >
                      {related.title}
                    </Link>
                    <p className="mt-1 text-sm leading-[1.5] text-band-muted">
                      {renderText(related.body)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {relatedWork.length > 0 && (
        <section
          aria-labelledby="related-work"
          className="border-b border-line bg-surface py-12 lg:py-21"
        >
          <div className="container-site">
            <SectionHeading
              eyebrow="Related work"
              title="Where this has been done"
              id="related-work"
              link={{ label: "All work", href: "/work" }}
            />
            <ul className="grid gap-6 lg:grid-cols-2">
              {relatedWork.map((study, i) => (
                <li key={study.slug}>
                  <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                    <CaseCard study={study} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faqs.length > 0 && (
        <section aria-labelledby="faqs" className="py-12 lg:py-21">
          <div className="container-site">
            <SectionHeading
              eyebrow="Common questions"
              title="Questions we get on this"
              id="faqs"
            />
            <FAQ faqs={service.faqs} idPrefix={`faq-${service.slug}`} />
          </div>
        </section>
      )}

      <CTABand
        title={service.cta.title}
        body={service.cta.body}
        topic={service.slug}
        primary={{ label: "Book a consultation", href: contactHref }}
      />
    </>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { type Tone, toneClass } from "./Section";
import { SectionMarker } from "./SectionMarker";
import { linkArrow, linkArrowBand, sectionPad, slide as slideClass } from "./styles";

type Mandate = {
  n: string;
  title: string;
  body: string;
  href: string;
  /** Mono footnote: the engagements that back the claim, not a case link. */
  refs: string;
};

// Fixed to four mandates rather than a `content/*` prop: these are the scope
// boundary of the practice, not a list that grows with new case studies. Per
// DESIGN.md's register rules, the authority names (DGCA, CAR, ICAO, CORSIA,
// T−18) carry the persuasion, so they are named plainly rather than dressed
// up. The `−` above and below is U+2212 (minus sign), matching the glyph
// `PhaseTimeline`'s `T−18 → T−12` range already uses — a hyphen-minus reads
// as a typo next to it.
const MANDATES: Mandate[] = [
  {
    n: "01",
    title: "Operational readiness for a new or expanded terminal",
    body: "Trials, orientation, familiarisation and the construction-to-operations handover — planned from T−18 across the airport operator, ground handlers, airlines, security and CISF, immigration, customs and the regulator.",
    href: "/services/orat",
    refs: "Delhi T3 · Delhi T1D · engaged from T−18",
  },
  {
    n: "02",
    title: "DGCA approval and market entry for foreign OEMs",
    body: "Certification pathway mapped against the applicable CAR, airframer sign-off, submission and follow-through with DGCA, and field representation once in service.",
    href: "/services/india-market-entry",
    refs: "TaxiBot · Stelia Aerospace · Aerowash",
  },
  {
    n: "03",
    title: "Third-party audit, certification and emissions verification",
    body: "ISO 9001, 45001 and 14064 lead-auditor engagements, AS9100D aerospace audits, and CORSIA verification — conducted personally by the certified lead auditor.",
    href: "/services/audits-compliance",
    refs: "ICAO CORSIA verification & validation",
  },
  {
    n: "04",
    title: "Aircraft recovery preparedness and runway restoration",
    body: "Recovery plan development to ICAO and manufacturer guidance, team preparation, equipment assessment and live drills, so restoration time is planned, not improvised.",
    href: "/services/aircraft-recovery",
    refs: "Plans, team preparation, live drills",
  },
];

/**
 * 2×2 hairline grid of the four mandates the practice is engaged for — the
 * homepage's scope statement, one step more concrete than `ServiceCard`'s
 * five practices further down the page. Cells are always white `surface`
 * over a `line` grid (the DESIGN.md §5 "white card on a pastel band" lift),
 * independent of the section's own `tone`, the same split `ServiceCard`
 * keeps between its always-white card and whatever ground it sits on.
 */
export function MandateGrid({
  tone = "surface",
  slide = false,
  id,
}: {
  /** Ground is set by the page, not baked in here. */
  tone?: Tone;
  /** Claim a screen and become a scroll-snap point. */
  slide?: boolean;
  /** Slide id, so `SectionRail` can observe this section. */
  id?: string;
}) {
  const headingId = "mandates";
  // `band`/`band-deep` need the band-ink/band-muted/band-line stops per
  // DESIGN.md §5; every other tone reads fine against plain ink/body/line.
  const onBand = tone === "band" || tone === "band-deep";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(toneClass(tone), slide && slideClass, sectionPad)}
    >
      <div className="container-site">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-11">
          <div>
            <SectionMarker>Scope of engagement</SectionMarker>
            <h2
              id={headingId}
              className={cn(
                "mt-5 max-w-[24ch] font-display text-h2 font-semibold",
                onBand && "text-band-ink",
              )}
            >
              Four mandates we are engaged for
            </h2>
          </div>
          {/* The lede stands in for `SectionHeading`'s optional link slot —
              this section's context is "how it starts", not "see more". */}
          <p
            className={cn(
              "max-w-[42ch] text-[0.9375rem] leading-[1.6] sm:pb-2",
              onBand ? "text-band-muted" : "text-body",
            )}
          >
            Each begins with a thirty-minute consultation with the director
            who will run the engagement.
          </p>
        </div>

        <ol
          className={cn(
            "grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2",
            onBand ? "border-band-line bg-band-line" : "border-line bg-line",
          )}
        >
          {MANDATES.map((mandate) => (
            <li key={mandate.href} className="flex flex-col gap-3 bg-surface px-6 py-6 lg:px-7 lg:py-7.5">
              {/* `aria-hidden`: the `<ol>` already gives each cell its real
                  ordinal for assistive tech, so this is a visual echo, not
                  the label — the h3 right below is what tells cells apart. */}
              <p aria-hidden="true" className="font-mono text-sm text-subtle">
                {mandate.n}
              </p>
              <h3 className="font-display text-h3 font-semibold">{mandate.title}</h3>
              <p className="text-sm leading-[1.58] lg:text-[0.9375rem]">{mandate.body}</p>
              <Link href={mandate.href} className={cn(linkArrow, "mt-1")}>
                {/* Generic label, same move as `ServiceCard`'s "The tool" —
                    the h3 above already carries the specific name, so the
                    link itself doesn't need to repeat it. */}
                The practice
                <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <p className="mt-auto pt-2 font-mono text-xs text-aqua-700">{mandate.refs}</p>
            </li>
          ))}
        </ol>

        <div
          className={cn(
            "mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-10 lg:pt-7",
            onBand ? "border-band-line" : "border-line",
          )}
        >
          <div className="flex flex-wrap items-center gap-5">
            <p className={cn("text-sm font-medium", onBand ? "text-band-ink" : "text-ink")}>
              Requirement outside these four?
            </p>
            <Link href="/contact#book" className={onBand ? linkArrowBand : linkArrow}>
              Describe the scope
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
          <Link href="/services" className={onBand ? linkArrowBand : linkArrow}>
            All five practices
            <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

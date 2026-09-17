import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Person } from "@/content";
import { cn } from "@/lib/utils";

import { resolveImage } from "./image-size";
import { PhotoCaption } from "./PhotoCaption";
import { isPlaceholder, Placeholder, renderText } from "./Placeholder";
import { type Tone, toneClass } from "./Section";
import { SectionMarker } from "./SectionMarker";
import { linkArrow, sectionPad, slide as slideClass } from "./styles";

/**
 * Fallback for a person whose content carries no `headlineFacts`. The facts
 * belong to the person, not to this component — they were hardcoded here
 * while there was only ever one principal on the page.
 */
const FALLBACK_FACTS = [
  { label: "Lead auditor", value: "ISO 9001 · ISO 45001 · ISO 14064" },
  { label: "Aerospace", value: "AS9100D certified auditor" },
  { label: "ICAO", value: "CORSIA verification & validation" },
  { label: "Based", value: "Aerocity, adjacent to Delhi IGI" },
];

/**
 * 440px captioned portrait beside the principal's credentials — the
 * "who you actually work with" band.
 */
export function PersonCard({
  person,
  eyebrow = "Who you actually work with",
  caption = "Lead auditor briefing · New Delhi",
  tone = "surface",
  slide = false,
  id,
}: {
  person: Person;
  eyebrow?: string;
  caption?: string;
  /** Ground is set by the page, not baked in here. */
  tone?: Tone;
  /** Claim a screen and become a scroll-snap point. */
  slide?: boolean;
  /** Slide id, so `SectionRail` can observe this section. */
  id?: string;
}) {
  const img = resolveImage(person.photo.src, person.photo);
  const headingId = `person-${person.slug}`;
  const facts = person.headlineFacts ?? FALLBACK_FACTS;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "border-y border-line",
        toneClass(tone),
        slide && slideClass,
        sectionPad,
      )}
    >
      <div className="container-site grid gap-8 lg:grid-cols-[440px_1fr] lg:items-start lg:gap-16">
        <figure className="max-w-[280px] lg:max-w-none">
          <Image
            src={img.src}
            alt={person.photo.alt}
            width={img.width}
            height={img.height}
            unoptimized={img.unoptimized}
            loading="lazy"
            sizes="(min-width: 1024px) 440px, 280px"
            className="h-auto w-full rounded-lg object-cover"
          />
          <PhotoCaption>{caption}</PhotoCaption>
        </figure>

        <div>
          <SectionMarker>{eyebrow}</SectionMarker>
          <h2
            id={headingId}
            className="mt-5 font-display text-h2 font-semibold"
          >
            {person.name}
          </h2>
          {/* The doctorate sits beside the job title rather than inside it:
              `role` feeds schema.org `jobTitle`, which has to stay a plain
              job title. */}
          <p className="eyebrow-accent mt-2">
            {person.role}
            {person.postNominal && ` · ${person.postNominal}`}
          </p>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-[1.56] text-ink-soft lg:text-[1.1875rem]">
            {renderText(person.shortBio)}
          </p>

          <dl className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:mt-8.5">
            {facts.map((fact) => (
              <div key={fact.label} className="border-t border-line py-4">
                <dt className="eyebrow">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link href={`/about/${person.slug}`} className={linkArrow}>
              Full profile
              <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </Link>
            {person.linkedin &&
              (isPlaceholder(person.linkedin) ? (
                <Placeholder>{person.linkedin}</Placeholder>
              ) : (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkArrow}
                >
                  LinkedIn
                  <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

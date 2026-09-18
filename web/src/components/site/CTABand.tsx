import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { site } from "@/content";
import { cn } from "@/lib/utils";

import { LeadForm } from "./LeadForm";
import { renderText } from "./Placeholder";
import { type Tone, toneClass } from "./Section";
import { btnGhost, btnPrimary, focusRing, sectionPad, slide as slideClass } from "./styles";
import { leadTopics } from "./topics";

/**
 * Pastel contact band. With `form`, the lead panel sits on the right and the
 * NAP rows on the left (home); without it, a single teal CTA (page ends).
 */
export function CTABand({
  title,
  body,
  topic,
  form = false,
  primary = { label: "Book a consultation", href: "/contact#book" },
  secondary,
  id,
  tone = "band",
  slide = false,
}: {
  title: string;
  body?: string;
  topic?: string;
  form?: boolean;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
  /** Ground is set by the page, not baked in here. */
  tone?: Tone;
  /** Claim a screen and become a scroll-snap point. */
  slide?: boolean;
}) {
  const headingId = id ? `${id}-title` : "cta-title";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(toneClass(tone), slide && slideClass, sectionPad)}
    >
      <div
        className={cn(
          "container-site",
          form
            ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-start lg:gap-16"
            : "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12",
        )}
      >
        {/* With the form, this column is much shorter than the panel beside
            it, which left a screen of empty band next to a form the visitor
            was still filling in. Sticking it below the header keeps the ask
            and the phone number in view for the whole scroll of the form
            instead of splitting them onto a slide of their own. */}
        <div
          className={cn(
            form && "lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start",
          )}
        >
          <h2
            id={headingId}
            className="max-w-[24ch] font-display text-h2 font-semibold text-band-ink"
          >
            {renderText(title)}
          </h2>
          {body && (
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-[1.6] text-band-muted lg:text-[1.0625rem]">
              {renderText(body)}
            </p>
          )}

          {form ? (
            <ul className="mt-8 flex flex-col gap-4.5 lg:mt-9.5">
              <li className="flex items-start gap-3.5">
                <MapPin
                  size={19}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-aqua-500"
                />
                <span className="text-[0.9375rem] leading-[1.5] text-band-muted lg:text-base">
                  {site.nap.addressLines.join(", ")}
                  <br />
                  {site.nap.locality} {site.nap.postalCode} — adjacent to Delhi IGI
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.nap.phoneE164}`}
                  className={`flex min-h-11 items-center gap-3.5 font-mono text-base text-aqua-700 transition-colors duration-150 hover:text-ink ${focusRing}`}
                >
                  <Phone
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-aqua-500"
                  />
                  {site.nap.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.nap.email}`}
                  className={`flex min-h-11 items-center gap-3.5 font-mono text-base text-aqua-700 transition-colors duration-150 hover:text-ink ${focusRing}`}
                >
                  <Mail
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-aqua-500"
                  />
                  {site.nap.email}
                </a>
              </li>
            </ul>
          ) : (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:hidden">
              <Link href={primary.href} className={btnPrimary}>
                {primary.label}
              </Link>
              {secondary && (
                <Link href={secondary.href} className={btnGhost}>
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {form ? (
          <LeadForm topics={leadTopics} initialTopic={topic} />
        ) : (
          <div className="hidden shrink-0 gap-3 lg:flex">
            <Link href={primary.href} className={btnPrimary}>
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className={btnGhost}>
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

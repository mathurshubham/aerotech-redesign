import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { site } from "@/content";
import { cn } from "@/lib/utils";

import { LeadForm } from "./LeadForm";
import { renderText } from "./Placeholder";
import { btnGhost, btnPrimary, focusRing } from "./styles";
import { leadTopics } from "./topics";

/**
 * Dark contact band. With `form`, the lead panel sits on the right and the
 * NAP rows on the left (home); without it, a single orange CTA (page ends).
 */
export function CTABand({
  title,
  body,
  topic,
  form = false,
  primary = { label: "Book a consultation", href: "/contact#book" },
  secondary,
  id,
}: {
  title: string;
  body?: string;
  topic?: string;
  form?: boolean;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  id?: string;
}) {
  const headingId = id ? `${id}-title` : "cta-title";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("bg-band", form ? "py-12 lg:py-21" : "py-12 lg:py-18")}
    >
      <div
        className={cn(
          "container-site",
          form
            ? "grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-20"
            : "flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12",
        )}
      >
        <div>
          <h2
            id={headingId}
            className="max-w-[24ch] font-display text-[1.75rem] leading-[1.14] font-semibold text-white lg:text-[2.25rem]"
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
                  className="mt-1 shrink-0 text-orange-500"
                />
                <span className="text-[0.9375rem] leading-[1.5] text-navy-300 lg:text-base">
                  {site.nap.addressLines.join(", ")}
                  <br />
                  {site.nap.locality} {site.nap.postalCode} — adjacent to Delhi IGI
                </span>
              </li>
              <li>
                <a
                  href={`tel:${site.nap.phoneE164}`}
                  className={`flex min-h-11 items-center gap-3.5 font-mono text-base text-white transition-colors duration-150 hover:text-orange-500 ${focusRing}`}
                >
                  <Phone
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-orange-500"
                  />
                  {site.nap.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.nap.email}`}
                  className={`flex min-h-11 items-center gap-3.5 font-mono text-base text-white transition-colors duration-150 hover:text-orange-500 ${focusRing}`}
                >
                  <Mail
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="shrink-0 text-orange-500"
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

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { renderText } from "./Placeholder";
import { SectionMarker } from "./SectionMarker";
import { linkArrow, linkArrowBand } from "./styles";

/**
 * Section marker + h2, with an optional right-aligned "All … →" link.
 * The marker names the section; it is not decoration. `onBand` no longer
 * changes the label colour — `aqua-700` clears AA on every ground the site
 * has — it only darkens the heading and swaps the link's hover.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  link,
  onBand = false,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Set when the parent `section` uses `aria-labelledby`. */
  id?: string;
  link?: { label: string; href: string };
  onBand?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        "mb-8 lg:mb-11",
        className,
      )}
    >
      <div>
        <SectionMarker>{eyebrow}</SectionMarker>
        <h2
          id={id}
          className={cn(
            "mt-5 max-w-[24ch] font-display text-h2 font-semibold",
            onBand && "text-band-ink",
          )}
        >
          {renderText(title)}
        </h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn(
            onBand ? linkArrowBand : linkArrow,
            "sm:pb-2 text-[0.9375rem]",
          )}
        >
          {link.label}
          <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

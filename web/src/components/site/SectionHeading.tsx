import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { renderText } from "./Placeholder";
import { linkArrow, linkArrowBand } from "./styles";

/**
 * Eyebrow + h2, with an optional right-aligned "All … →" link.
 * The eyebrow names the section; it is not decoration.
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
        <p className={onBand ? "eyebrow-accent" : "eyebrow"}>{eyebrow}</p>
        <h2
          id={id}
          className={cn(
            "mt-3 max-w-[24ch] font-display text-[1.75rem] leading-[1.14] font-semibold lg:text-[2.375rem]",
            onBand && "text-white",
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

import Link from "next/link";

import { cn } from "@/lib/utils";

import { focusRing } from "./styles";

export type Crumb = { label: string; href?: string };

/**
 * Mono 11px uppercase trail above the page h1. The last item is plain text
 * with `aria-current="page"` — never a link.
 */
export function Breadcrumb({
  items,
  onBand = false,
  className,
}: {
  items: Crumb[];
  onBand?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-eyebrow font-medium uppercase">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={onBand ? "text-band-line" : "text-line"}
                >
                  /
                </span>
              )}
              {last || !item.href ? (
                <span
                  aria-current={last ? "page" : undefined}
                  className={onBand ? "text-band-ink" : "text-ink"}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    // Pad the tap target to >=44px tall without moving the
                    // 11px text: equal padding + a matching negative margin
                    // keep the visible line position unchanged.
                    "-my-4 inline-flex min-h-11 items-center py-4 transition-colors duration-150",
                    onBand
                      ? "text-band-muted hover:text-ink"
                      : "text-subtle hover:text-aqua-700",
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

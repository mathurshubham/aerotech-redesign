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
                    "transition-colors duration-150",
                    onBand
                      ? "text-band-muted hover:text-white"
                      : "text-subtle hover:text-orange-600",
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

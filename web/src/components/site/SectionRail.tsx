"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { focusRing } from "./styles";

export interface SectionRailItem {
  id: string;
  label: string;
}

/**
 * Fixed right-edge progress rail for the homepage's slide-paced scroll —
 * "scroll as navigation". One dot per slide, the current one filled in the
 * accent colour and slightly larger, the rest `band-line`. Desktop only: the
 * mobile viewport is too narrow for a third fixed element, and that corner
 * already belongs to `WhatsAppButton`, so this never carries
 * `data-whatsapp-avoid` — the two never share a breakpoint.
 */
export function SectionRail({ items }: { items: SectionRailItem[] }) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Reduced-motion is a client-only fact (matchMedia doesn't exist on the
  // server), so the rail stays unrendered until this effect has run once —
  // otherwise the server markup and the first client render would disagree
  // and React would flag a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const found = new Map<string, HTMLElement>();
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) found.set(item.id, el);
    }
    elementsRef.current = found;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedIds(new Set(found.keys()));
    if (found.size === 0) return;

    // A slide only reads as "current" once it clears the sticky header, so
    // the observer's root is shrunk from the top by --header-h rather than
    // watching the raw viewport — read live off the root element because the
    // header is 67px on mobile and 85px on desktop (globals.css), and this
    // rail only ever renders at the desktop width anyway.
    const headerH = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-h")
      .trim();
    const observer = new IntersectionObserver(
      (entries) => {
        // Snap scrolling can leave a short slide and a tall neighbour both
        // intersecting at once; the one to mark active is whichever fills
        // more of the space below the header, not just whichever fired
        // first.
        let best: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { id: entry.target.id, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActiveId(best.id);
      },
      {
        rootMargin: `-${headerH || "0px"} 0px 0px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    found.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!mounted || reducedMotion || resolvedIds.size === 0) return null;

  const visibleItems = items.filter((item) => resolvedIds.has(item.id));

  return (
    <nav
      aria-label="Section progress"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {visibleItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
            onClick={() =>
              elementsRef.current
                .get(item.id)
                ?.scrollIntoView({ block: "start" })
            }
            className={cn(
              // 44px hit target around an 8px dot — same padding trick as
              // `linkArrow` in styles.ts, just centred instead of inline.
              "group relative flex min-h-11 min-w-11 items-center justify-center rounded-full",
              focusRing,
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "rounded-full transition-[background-color,transform] duration-150",
                isActive ? "h-2.5 w-2.5 bg-aqua-600" : "h-2 w-2 bg-band-line",
              )}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full mr-3 rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

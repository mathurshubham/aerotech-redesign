import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { resolveImage } from "./image-size";
import { focusRing } from "./styles";

type WordmarkVariant = "dark" | "light";
type WordmarkSize = "header" | "footer" | "mobile";

/**
 * Default glyph heights (px) per legacy `size` — the nav/mobile lockup
 * targets the 36–40px glyph height called out in DESIGN.md §9a; the
 * footer runs a touch larger since it has more room. `SiteHeader` and
 * `SiteFooter` pass an explicit `height` and don't rely on this map; it is
 * what `app/gate/page.tsx` (no `size`/`height`) falls back to.
 */
const DEFAULT_HEIGHTS: Record<WordmarkSize, number> = {
  header: 38,
  mobile: 38,
  footer: 48,
};

/** Glyph height (px) the type sizes below are tuned for. `height` scales
 * everything proportionally around this. */
const REFERENCE_HEIGHT = 38;
const NAME_SIZE = 19;
const NAME_TRACKING = "0.02em";
const TAGLINE_SIZE = 9;
const TAGLINE_TRACKING = "0.19em";
const GLYPH_GAP = 12;
const STACK_GAP = 2;

/**
 * Renders the Aerotech lockup: the client's real arrowhead glyph
 * (`logo-glyph(-light)`, cropped from the source logo — see
 * `web/DESIGN.md` §9a) beside a typeset "AEROTECH" / "SUPPORT SERVICES"
 * name, sized from `public/images/manifest.json` intrinsic dimensions.
 * Server component.
 *
 * - `variant="dark"` (default) → navy glyph + ink name. Every ground in the
 *   page chrome is now light — paper, white and the pastel bands — so this is
 *   the only variant the site itself uses, including in the footer.
 * - `variant="light"` → `logo-glyph-light` + white name. Only correct on a
 *   genuinely dark ground; the raster is recoloured near-white and vanishes on
 *   pastel. Retained for the dark social card, unused by the page chrome.
 * - `withTagline` → swaps in the full raster `logo-lockup` (mark + tagline
 *   image, dark palette only) for large marketing use — unchanged from
 *   before, do not combine with `variant="light"`.
 * - `height` sets the glyph height in px and scales the type/gaps around
 *   it (tuned at `REFERENCE_HEIGHT` = 38px, the nav size).
 *
 * `onBand`/`size` are the original props, kept for `app/gate/page.tsx`;
 * `variant`/`height`, when passed, take precedence over them.
 */
export function Wordmark({
  href = "/",
  onBand = false,
  size = "header",
  variant,
  height,
  withTagline = false,
  priority = false,
  className,
}: {
  href?: string | null;
  onBand?: boolean;
  size?: WordmarkSize;
  variant?: WordmarkVariant;
  height?: number;
  withTagline?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const resolvedVariant: WordmarkVariant = variant ?? (onBand ? "light" : "dark");
  const resolvedHeight = height ?? DEFAULT_HEIGHTS[size];

  if (withTagline) {
    const img = resolveImage("/images/logo-lockup.png");
    const width = Math.round((resolvedHeight * img.width) / img.height);
    const body = (
      <Image
        src={img.src}
        alt="Aerotech Support Services"
        width={width}
        height={resolvedHeight}
        unoptimized={img.unoptimized}
        priority={priority}
        className={cn("block", className)}
      />
    );
    return wrapInLink(body, href);
  }

  const scale = resolvedHeight / REFERENCE_HEIGHT;
  const glyphName = resolvedVariant === "light" ? "logo-glyph-light" : "logo-glyph";
  const glyph = resolveImage(`/images/${glyphName}.png`);
  const glyphWidth = Math.round((resolvedHeight * glyph.width) / glyph.height);

  const nameColor = resolvedVariant === "light" ? "text-white" : "text-ink";
  const taglineColor = resolvedVariant === "light" ? "text-mist-300" : "text-subtle";

  const row = (
    <>
      <Image
        src={glyph.src}
        alt=""
        aria-hidden="true"
        width={glyphWidth}
        height={resolvedHeight}
        unoptimized={glyph.unoptimized}
        priority={priority}
        className="block shrink-0"
      />
      <span className="flex flex-col justify-center" style={{ gap: STACK_GAP * scale }}>
        <span
          className={cn("font-display leading-none font-bold whitespace-nowrap", nameColor)}
          style={{ fontSize: NAME_SIZE * scale, letterSpacing: NAME_TRACKING }}
        >
          AEROTECH
        </span>
        <span
          className={cn(
            "font-mono leading-none font-medium whitespace-nowrap uppercase",
            taglineColor,
          )}
          style={{ fontSize: TAGLINE_SIZE * scale, letterSpacing: TAGLINE_TRACKING }}
        >
          Support Services
        </span>
      </span>
    </>
  );

  if (!href) {
    return (
      <span className={cn("inline-flex items-center", className)} style={{ gap: GLYPH_GAP * scale }}>
        {row}
      </span>
    );
  }

  // Grow the tap target to the 44px floor without moving the glyph: pad the
  // link box and cancel the added height with an equal negative margin, so
  // the row's layout (and the glyph's visual position within it) is
  // unchanged — only the invisible hit area grows.
  const hitSlop = Math.max(0, 44 - resolvedHeight) / 2;

  return (
    <Link
      href={href}
      aria-label="Aerotech Support Services — home"
      className={cn("inline-flex items-center rounded-lg", focusRing, className)}
      style={{
        gap: GLYPH_GAP * scale,
        paddingTop: hitSlop,
        paddingBottom: hitSlop,
        marginTop: -hitSlop,
        marginBottom: -hitSlop,
      }}
    >
      {row}
    </Link>
  );
}

function wrapInLink(body: ReactNode, href: string | null) {
  if (!href) return body;
  return (
    <Link
      href={href}
      aria-label="Aerotech Support Services — home"
      className={cn("inline-flex rounded-lg", focusRing)}
    >
      {body}
    </Link>
  );
}

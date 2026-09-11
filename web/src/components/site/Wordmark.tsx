import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { resolveImage } from "./image-size";
import { focusRing } from "./styles";

type WordmarkVariant = "dark" | "light";
type WordmarkSize = "header" | "footer" | "mobile";

/**
 * Default render heights (px) per legacy `size`, chosen for legibility: at a
 * 44–52px nav height "Aerotech" turns to mush (tested against
 * `logo-mark`'s 697×570 crop), 56px is the smallest height where the
 * wordmark reads cleanly. See `web/DESIGN.md` for the test sheet notes.
 */
const DEFAULT_HEIGHTS: Record<WordmarkSize, number> = {
  header: 56,
  mobile: 56,
  footer: 72,
};

/**
 * Renders the real Aerotech logo — never the old text wordmark — via
 * `next/image`, sized from `public/images/manifest.json` intrinsic
 * dimensions (see `scripts/source-images/logo-*.png` + `pnpm images`).
 *
 * - `variant="dark"` (default) → `logo-mark` (swoosh + "Aerotech", no
 *   tagline), for paper/white grounds.
 * - `variant="light"` → `logo-mark-light`, the same crop recoloured (white
 *   text, lightened swoosh) for navy bands.
 * - `withTagline` → swaps in the full `logo-lockup` (mark + "Transforming
 *   Aviation"). Only exists in the dark palette — do not combine with
 *   `variant="light"`.
 *
 * `onBand`/`size` are the original props, kept because `MobileNav.tsx` and
 * `app/gate/page.tsx` call this component and are out of scope for this
 * change; `variant`/`height`, when passed, take precedence over them.
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

  const name = withTagline
    ? "logo-lockup"
    : resolvedVariant === "light"
      ? "logo-mark-light"
      : "logo-mark";
  const img = resolveImage(`/images/${name}.png`);
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

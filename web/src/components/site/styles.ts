/**
 * Shared class recipes for the site shell. Tokens only — see `web/DESIGN.md`.
 * These are app-level compositions, not ui primitives.
 */

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-0";

/** 52px primary action. Single accent button per group. */
export const btnPrimary = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg bg-aqua-600 px-6 font-sans text-base font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-aqua-700 ${focusRing}`;

/**
 * Secondary action inside a pastel band. The bands are light grounds, so this
 * is an ink outline rather than the white-on-navy ghost it used to be.
 */
export const btnGhost = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg border border-ink/25 px-6 font-sans text-base font-semibold text-ink transition-colors duration-150 hover:border-ink/55 hover:bg-white/45 ${focusRing}`;

/** Secondary action on a light ground. */
export const btnOutline = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 font-sans text-base font-semibold text-ink transition-colors duration-150 hover:border-ink/40 ${focusRing}`;

/**
 * Inline "Read the case →" style link on a light ground. `-my-2.5`/`py-2.5`
 * pads the tap target to the 44px floor (these sit at 20-28px of visible
 * text) without shifting the visible line — same technique as `ServiceCard`.
 */
export const linkArrow = `-my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 text-sm font-semibold text-aqua-700 transition-colors duration-150 hover:text-aqua-600 ${focusRing}`;

/** Same, on a pastel band — hover darkens to ink instead of lightening to white. */
export const linkArrowBand = `-my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[0.9375rem] font-semibold text-aqua-700 transition-colors duration-150 hover:text-ink ${focusRing}`;

/**
 * The site's only section vertical rhythm: `clamp(4rem, 8vw, 7.5rem)`, per
 * DESIGN.md. Implemented as `.section-pad` in `globals.css` so it is one
 * fluid value rather than a breakpoint jump. Sections must use this instead
 * of hand-rolling `py-NN`.
 */
export const sectionPad = "section-pad";

/**
 * A section that claims a screen: `100dvh` minus the sticky header, content
 * vertically centred, and a scroll-snap point at its top. See `.section-slide`
 * in `globals.css` for why snapping is `proximity` and the height is a
 * minimum. Compose as `${slide} ${sectionPad}` — the padding still sets the
 * floor for a section whose content outgrows one screen.
 */
export const slide = "section-slide";

/** A thin strip between slides that deliberately does not claim a screen. */
export const rail = "section-rail";

/** Card surface. */
export const cardBase = "rounded-lg border border-line bg-surface";

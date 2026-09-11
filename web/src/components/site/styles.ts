/**
 * Shared class recipes for the site shell. Tokens only — see `web/DESIGN.md`.
 * These are app-level compositions, not ui primitives.
 */

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-0";

/** 52px primary action. Single orange button per group. */
export const btnPrimary = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg bg-orange-500 px-6 font-sans text-base font-semibold text-white transition-colors duration-150 hover:bg-orange-600 ${focusRing}`;

/** Ghost action for use inside a navy band. */
export const btnGhost = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg border border-white/35 px-6 font-sans text-base font-semibold text-white transition-colors duration-150 hover:border-white/70 ${focusRing}`;

/** Secondary action on a light ground. */
export const btnOutline = `inline-flex h-13 items-center justify-center gap-2.5 rounded-lg border border-line bg-surface px-6 font-sans text-base font-semibold text-ink transition-colors duration-150 hover:border-ink/40 ${focusRing}`;

/**
 * Inline "Read the case →" style link on a light ground. `-my-2.5`/`py-2.5`
 * pads the tap target to the 44px floor (these sit at 20-28px of visible
 * text) without shifting the visible line — same technique as `ServiceCard`.
 */
export const linkArrow = `-my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 text-sm font-semibold text-orange-600 transition-colors duration-150 hover:text-orange-500 ${focusRing}`;

/** Same, on a navy band. */
export const linkArrowBand = `-my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[0.9375rem] font-semibold text-orange-500 transition-colors duration-150 hover:text-white ${focusRing}`;

/** Section vertical rhythm: 64–120px at D, ~48px at M. */
export const sectionPad = "py-12 sm:py-16 lg:py-24";

/** Card surface. */
export const cardBase = "rounded-lg border border-line bg-surface";

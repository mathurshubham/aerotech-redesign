import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { sectionPad, slide as slideClass } from "./styles";

/**
 * The page's grounds, in one place. Every band used to be baked into the
 * component that happened to render it, so the alternation was whatever fell
 * out of the component order — two `band` grounds ended up adjacent on the
 * homepage. Ground is a property of *position in the page*, not of the
 * component, so it is passed in.
 */
export type Tone = "paper" | "surface" | "band" | "band-deep";

const TONE_CLASS: Record<Tone, string> = {
  // `paper` is the body ground: no class, so the page shows through.
  paper: "",
  surface: "bg-surface",
  band: "bg-band",
  "band-deep": "bg-band-deep",
};

/** Ground class for a tone, for components that render their own `<section>`. */
export function toneClass(tone: Tone) {
  return TONE_CLASS[tone];
}

/**
 * A homepage/landing section: one ground, one rhythm, optionally one screen.
 *
 * - `tone` sets the ground (see `Tone`).
 * - `slide` makes it claim a screen and become a scroll-snap point.
 * - `pad` (default on) applies the single `.section-pad` rhythm. Turn it off
 *   only for a section that manages its own vertical space, like the hero.
 */
export function Section({
  tone = "paper",
  slide = false,
  pad = true,
  className,
  children,
  ...rest
}: {
  tone?: Tone;
  slide?: boolean;
  pad?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"section">, "className" | "children">) {
  return (
    <section
      className={cn(TONE_CLASS[tone], slide && slideClass, pad && sectionPad, className)}
      {...rest}
    >
      {children}
    </section>
  );
}

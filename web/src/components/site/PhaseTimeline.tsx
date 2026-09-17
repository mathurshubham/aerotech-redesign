import type { Phase } from "@/content";

import { renderText } from "./Placeholder";

/**
 * Four equal columns with a teal bar that fades across the run. Stacks to
 * a single column below `lg`.
 */
export function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const opacities = ["opacity-100", "opacity-90", "opacity-85", "opacity-80"];

  return (
    <ol className="grid gap-8 lg:grid-cols-4 lg:gap-0">
      {phases.map((phase, i) => {
        const last = i === phases.length - 1;
        return (
          <li key={phase.title} className="relative pl-5 lg:pr-7 lg:pl-0">
            {/* Connects phases down the left edge on mobile, where the grid
                collapses to one column — the sequence still reads as a
                timeline rather than a stack of unrelated cards. Each phase
                keeps its own teal bar; this rule just links them. */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-2.5 -bottom-8 left-0 w-px bg-line lg:hidden"
              />
            )}
            <div
              aria-hidden="true"
              className={`h-[3px] w-8 bg-aqua-600 lg:w-full ${opacities[i % opacities.length]}`}
            />
            <p className="mt-4 font-mono text-eyebrow font-medium tracking-[0.09em] text-aqua-700 uppercase">
              {renderText(phase.window)}
            </p>
            <h3 className="mt-2.5 font-display text-[1.1875rem] leading-[1.3] font-semibold">
              {renderText(phase.title)}
            </h3>
            <p className="mt-2 text-sm leading-[1.58]">{renderText(phase.body)}</p>
          </li>
        );
      })}
    </ol>
  );
}

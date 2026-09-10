import type { Phase } from "@/content";

import { renderText } from "./Placeholder";

/**
 * Four equal columns with an orange bar that fades across the run. Stacks to
 * a single column below `lg`.
 */
export function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const opacities = ["opacity-100", "opacity-75", "opacity-50", "opacity-30"];

  return (
    <ol className="grid gap-8 lg:grid-cols-4 lg:gap-0">
      {phases.map((phase, i) => (
        <li key={phase.title} className="lg:pr-7">
          <div
            aria-hidden="true"
            className={`h-[3px] bg-orange-500 ${opacities[i % opacities.length]}`}
          />
          <p className="mt-4 font-mono text-eyebrow font-medium tracking-[0.09em] text-orange-600 uppercase">
            {renderText(phase.window)}
          </p>
          <h3 className="mt-2.5 font-display text-[1.1875rem] leading-[1.3] font-semibold">
            {renderText(phase.title)}
          </h3>
          <p className="mt-2 text-sm leading-[1.58]">{renderText(phase.body)}</p>
        </li>
      ))}
    </ol>
  );
}

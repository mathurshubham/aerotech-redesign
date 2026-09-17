import type { Deliverable } from "@/content";

import { renderText } from "./Placeholder";

/**
 * 2×3 hairline grid inside an 8px `line` frame. Mono `01`–`06` in teal.
 */
export function DeliverablesGrid({
  deliverables,
}: {
  deliverables: Deliverable[];
}) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {deliverables.map((item) => (
        <li key={item.n} className="bg-surface px-6 py-6 lg:px-6.5">
          <p className="font-mono text-eyebrow font-medium tracking-[0.09em] text-aqua-700">
            {item.n}
          </p>
          <h3 className="mt-2.5 font-display text-[1.0625rem] leading-[1.35] font-semibold">
            {renderText(item.title)}
          </h3>
          <p className="mt-2 text-sm leading-[1.58]">{renderText(item.body)}</p>
        </li>
      ))}
    </ol>
  );
}

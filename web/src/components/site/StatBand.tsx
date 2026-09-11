import type { Stat } from "@/content";
import { cn } from "@/lib/utils";

import { renderText } from "./Placeholder";

/**
 * Hairline fact grid — mono numerals over 12–13px labels, `gap-px` over a
 * band-line/line ground so the gap is the rule. Aggregate numbers only.
 */
export function StatBand({
  stats,
  eyebrow,
  label = "Key figures",
  tone = "band",
  accentIndex,
  className,
}: {
  stats: Stat[];
  eyebrow?: string;
  label?: string;
  tone?: "band" | "paper";
  /** One numeral may carry the orange accent. Keeps orange under 5%. */
  accentIndex?: number;
  className?: string;
}) {
  const onBand = tone === "band";
  const cols =
    stats.length >= 4
      ? "grid-cols-2 lg:grid-cols-4"
      : stats.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-2";

  return (
    <section
      aria-label={label}
      className={cn(onBand ? "bg-band" : "bg-paper", "py-11 lg:py-15", className)}
    >
      <div className="container-site">
        {eyebrow && <p className={onBand ? "eyebrow-accent mb-6" : "eyebrow mb-6"}>{eyebrow}</p>}
        <dl
          className={cn(
            "grid gap-px border",
            cols,
            onBand ? "border-band-line bg-band-line" : "border-line bg-line",
          )}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn("px-5 py-6 lg:px-6.5 lg:py-7", onBand ? "bg-band" : "bg-surface")}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={cn(
                    "block font-mono text-2xl leading-none lg:text-[1.875rem]",
                    i === accentIndex
                      ? "text-orange-500"
                      : onBand
                        ? "text-white"
                        : "text-ink",
                  )}
                >
                  {renderText(stat.value)}
                </span>
                <span
                  className={cn(
                    "mt-3 block text-[0.8125rem] leading-[1.45]",
                    onBand ? "text-band-muted" : "text-body",
                  )}
                >
                  {renderText(stat.label)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

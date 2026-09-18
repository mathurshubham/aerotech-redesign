import { cn } from "@/lib/utils";

/**
 * The label above a section heading: a 52×3 teal rule followed by the label
 * itself. It replaces the bare `.eyebrow` in every section-heading slot.
 *
 * The rule is the runway motif (`--runway`) reduced to one dash, so the
 * section label and the hero's closing rule read as the same system. It also
 * gives the label a fixed anchor point at every width, which an unadorned
 * 13px line does not have.
 *
 * `tone="accent"` is the default and correct on any ground the site uses:
 * `aqua-700` clears 4.5:1 on paper, surface, band and band-deep alike. Use
 * `tone="subtle"` for a label that is genuinely secondary — a card's dateline
 * rather than a section's name.
 */
export function SectionMarker({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "subtle";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "h-[3px] w-13 shrink-0",
          tone === "accent" ? "bg-aqua-500" : "bg-mist-300",
        )}
      />
      <span className={tone === "accent" ? "eyebrow-accent" : "eyebrow"}>
        {children}
      </span>
    </div>
  );
}

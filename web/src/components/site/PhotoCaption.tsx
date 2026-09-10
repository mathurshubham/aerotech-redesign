import { cn } from "@/lib/utils";

import { renderText } from "./Placeholder";

/**
 * Mono 11px caption, 9–10px under the image. Client · airport · year.
 * A captioned photo is evidence; an uncaptioned one is decoration.
 */
export function PhotoCaption({
  children,
  onBand = false,
  className,
}: {
  children: string;
  onBand?: boolean;
  className?: string;
}) {
  return (
    <figcaption
      className={cn(
        "mt-2.5 font-mono text-eyebrow",
        onBand ? "text-band-muted" : "text-subtle",
        className,
      )}
    >
      {renderText(children)}
    </figcaption>
  );
}

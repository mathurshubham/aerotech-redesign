import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const PLACEHOLDER_RE = /\[PLACEHOLDER[^\]]*\]/g;

/** True when a content string is (or contains) an unresolved placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  return typeof value === "string" && value.includes("[PLACEHOLDER");
}

/**
 * A `[PLACEHOLDER: …]` string, rendered as a mono, teal-bordered chip so it
 * can never be mistaken for finished copy.
 */
export function Placeholder({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      data-placeholder="true"
      className={cn(
        "inline-flex items-center rounded-lg border border-aqua-500 bg-aqua-100 px-2 py-0.5 align-baseline font-mono text-[0.75rem] leading-snug text-aqua-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Every content string reaching the page goes through this helper. Plain copy
 * is returned untouched; any `[PLACEHOLDER: …]` fragment is wrapped in a
 * visible `Placeholder` chip, including when it sits inside a sentence.
 */
export function renderText(value: string | undefined | null): ReactNode {
  if (value == null) return null;
  if (!isPlaceholder(value)) return value;

  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  PLACEHOLDER_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = PLACEHOLDER_RE.exec(value)) !== null) {
    if (match.index > cursor) parts.push(value.slice(cursor, match.index));
    parts.push(<Placeholder key={`ph-${key++}`}>{match[0]}</Placeholder>);
    cursor = match.index + match[0].length;
  }
  if (cursor < value.length) parts.push(value.slice(cursor));

  return parts;
}

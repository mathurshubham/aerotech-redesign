import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Long-form wrapper: left-aligned, 68ch measure, token typography. */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("prose-site measure", className)}>{children}</div>;
}

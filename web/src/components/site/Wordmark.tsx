import Link from "next/link";

import { cn } from "@/lib/utils";

import { focusRing } from "./styles";

/**
 * "AEROTECH / SUPPORT SERVICES" as text — Archivo 700 21px over mono 9px.
 * Never an image.
 */
export function Wordmark({
  href = "/",
  onBand = false,
  size = "header",
  className,
}: {
  href?: string | null;
  onBand?: boolean;
  size?: "header" | "footer" | "mobile";
  className?: string;
}) {
  const top =
    size === "header"
      ? "text-[1.0625rem] lg:text-[1.3125rem]"
      : size === "footer"
        ? "text-[1.1875rem]"
        : "text-[1.0625rem]";

  const body = (
    <span className={cn("flex flex-col gap-px", className)}>
      <span
        className={cn(
          "font-display font-bold tracking-[0.02em]",
          top,
          onBand ? "text-white" : "text-ink",
        )}
      >
        AEROTECH
      </span>
      <span className="font-mono text-[0.5625rem] tracking-[0.19em] text-subtle">
        SUPPORT SERVICES
      </span>
    </span>
  );

  if (!href) return body;

  return (
    <Link
      href={href}
      aria-label="Aerotech Support Services — home"
      className={cn("inline-flex rounded-lg", focusRing)}
    >
      {body}
    </Link>
  );
}

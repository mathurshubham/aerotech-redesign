import { cn } from "cn";

/**
 * `cn` is re-exported from the `cn` package so that app code and the
 * shadcn/ui primitives in `src/components/ui` (which import it directly
 * from `"cn"`) resolve to the same clsx + tailwind-merge implementation.
 */
export { cn };

/** Canonical origin. Overridable per-environment; falls back to production. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aerotechss.com"
).replace(/\/+$/, "");

/**
 * Turn a site-relative path into an absolute URL.
 * Absolute inputs (`http:`, `https:`, protocol-relative) pass through.
 */
export function absoluteUrl(path = "/"): string {
  if (/^(https?:)?\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * Format an ISO date (`2026-09-12`) as `12 Sep 2026`.
 * Returns the raw input unchanged if it is not a parseable date.
 */
export function formatDate(iso: string | Date): string {
  const date = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  return dateFormatter.format(date).replace(/\s+/g, " ");
}

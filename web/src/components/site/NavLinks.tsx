"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/content";
import { cn } from "@/lib/utils";

import { focusRing } from "./styles";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop nav. The one client island in the header. */
export function NavLinks() {
  const pathname = usePathname() ?? "/";

  return (
    <ul className="flex items-center gap-7 xl:gap-[1.875rem]">
      {site.nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                // Single-word labels ("Work", "About"...) render narrower
                // than the 44px hit-target floor. `-mx-3.5`/`px-3.5` widen
                // the tap area without moving the visible text or the gap
                // between items (the negative margin cancels the padding).
                "-mx-3.5 inline-flex items-center justify-center rounded-sm px-3.5 pb-1 text-[0.9375rem] transition-colors duration-150",
                active
                  ? "font-semibold text-ink shadow-[inset_0_-2px_0_var(--aqua-500)]"
                  : "font-medium text-ink-soft hover:text-ink",
                focusRing,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Same links, for the mobile menu under the sticky header. */
export function MobileNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";

  return (
    <ul className="flex flex-col gap-1">
      {site.nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-13 items-center font-display text-[1.75rem] leading-none font-semibold tracking-tight transition-colors duration-150",
                active ? "text-aqua-700" : "text-ink hover:text-aqua-700",
                focusRing,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

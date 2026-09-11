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
                  ? "font-semibold text-ink shadow-[inset_0_-2px_0_var(--orange-500)]"
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

/** Same links, 44px tall, for the mobile Sheet. */
export function MobileNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname() ?? "/";

  return (
    <ul className="flex flex-col">
      {site.nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href} className="border-b border-line">
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center py-3 text-base transition-colors duration-150",
                active
                  ? "font-semibold text-orange-600"
                  : "font-medium text-ink hover:text-orange-600",
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

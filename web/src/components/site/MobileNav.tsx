"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content";
import { cn } from "@/lib/utils";

import { MobileNavLinks } from "./NavLinks";
import { btnPrimary, focusRing } from "./styles";

/**
 * Three bars that rotate into an X. Lives in the header trigger so close
 * is the same control as open — the panel has no second wordmark or close.
 */
function MenuGlyph({ open }: { open: boolean }) {
  const bar =
    "absolute left-1/2 h-[1.75px] w-[18px] -translate-x-1/2 rounded-full bg-current transition-[transform,opacity,top] duration-200 ease-out motion-reduce:transition-none";

  return (
    <span className="relative block size-[22px]" aria-hidden="true">
      <span className={cn(bar, open ? "top-[10.125px] rotate-45" : "top-[4.5px]")} />
      <span
        className={cn(bar, "top-[10.125px]", open ? "opacity-0" : "opacity-100")}
      />
      <span
        className={cn(bar, open ? "top-[10.125px] -rotate-45" : "top-[15.75px]")}
      />
    </span>
  );
}

/**
 * Mobile menu. The hamburger lives in the sticky header and morphs to an X
 * in place — there is no second wordmark or second close inside the panel.
 * The panel is the remaining viewport under the header, not a cloned app chrome.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={`inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-150 [@media(hover:hover)]:hover:bg-surface-2 ${focusRing}`}
      >
        <MenuGlyph open={open} />
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        overlayClassName="top-[var(--header-h)]"
        className="inset-x-0 top-[var(--header-h)] bottom-0 h-[calc(100dvh-var(--header-h))] w-full max-w-none gap-0 border-0 bg-surface p-0 shadow-none data-[side=top]:inset-x-0 data-[side=top]:top-[var(--header-h)] data-[side=top]:h-[calc(100dvh-var(--header-h))] data-[side=top]:border-0"
      >
        <SheetTitle className="sr-only">Site menu</SheetTitle>
        <nav aria-label="Site" className="flex-1 overflow-y-auto px-6 pt-6">
          <MobileNavLinks onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-auto px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <Link
            href="/contact#book"
            onClick={() => setOpen(false)}
            className={`${btnPrimary} w-full`}
          >
            Book a consultation
          </Link>
          <div className="mt-5 flex flex-col">
            <a
              href={`tel:${site.nap.phoneE164}`}
              className={`inline-flex min-h-11 items-center gap-2.5 font-mono text-[0.9375rem] text-ink ${focusRing}`}
            >
              <Phone size={19} strokeWidth={1.6} aria-hidden="true" className="text-aqua-500" />
              {site.nap.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.nap.email}`}
              className={`inline-flex min-h-11 items-center gap-2.5 font-mono text-[0.9375rem] text-ink ${focusRing}`}
            >
              <Mail size={19} strokeWidth={1.6} aria-hidden="true" className="text-aqua-500" />
              {site.nap.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { Mail, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content";

import { MobileNavLinks } from "./NavLinks";
import { btnPrimary, focusRing } from "./styles";
import { Wordmark } from "./Wordmark";

/**
 * Mobile drawer. Radix Dialog gives us Escape-to-close, focus return to the
 * trigger and body scroll lock; we only add the 44px item sizing and copy.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={`inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink transition-colors duration-150 hover:border-ink/40 ${focusRing}`}
      >
        <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[86%] max-w-sm gap-0 border-line bg-surface p-0 shadow-none sm:max-w-sm"
      >
        <div className="flex h-16 items-center border-b border-line px-6">
          <SheetTitle asChild>
            <span>
              <Wordmark href={null} size="mobile" />
            </span>
          </SheetTitle>
        </div>
        <nav aria-label="Site" className="px-6 pt-2">
          <MobileNavLinks onNavigate={() => setOpen(false)} />
        </nav>
        <div className="mt-auto flex flex-col gap-4 border-t border-line px-6 py-6">
          <Link
            href="/contact#book"
            onClick={() => setOpen(false)}
            className={`${btnPrimary} w-full`}
          >
            Book a consultation
          </Link>
          <a
            href={`tel:${site.nap.phoneE164}`}
            className={`flex min-h-11 items-center gap-2.5 font-mono text-[0.9375rem] text-ink ${focusRing}`}
          >
            <Phone size={19} strokeWidth={1.6} aria-hidden="true" className="text-orange-500" />
            {site.nap.phoneDisplay}
          </a>
          <a
            href={`mailto:${site.nap.email}`}
            className={`flex min-h-11 items-center gap-2.5 font-mono text-[0.9375rem] text-ink ${focusRing}`}
          >
            <Mail size={19} strokeWidth={1.6} aria-hidden="true" className="text-orange-500" />
            {site.nap.email}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}

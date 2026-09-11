import Link from "next/link";

import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import { focusRing } from "./styles";
import { Wordmark } from "./Wordmark";

/** Sticky white nav: 66px at M, 84px at D. One orange CTA. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="container-site flex h-[66px] items-center justify-between lg:h-21">
        <Wordmark variant="dark" height={38} priority />

        <div className="flex items-center gap-8">
          <nav aria-label="Main" className="hidden lg:block">
            <NavLinks />
          </nav>
          <Link
            href="/contact#book"
            className={`hidden h-11 items-center rounded-lg bg-orange-500 px-5 font-sans text-[0.9375rem] font-semibold text-white transition-colors duration-150 hover:bg-orange-600 lg:inline-flex ${focusRing}`}
          >
            Book a consultation
          </Link>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

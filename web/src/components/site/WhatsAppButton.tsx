"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { site } from "@/content";
import { cn } from "@/lib/utils";

/**
 * `wa.me` pill, fixed bottom-right, mobile only. ≥56px tall, respects the
 * safe-area inset so it clears a home-indicator bar. Any element marked
 * `data-whatsapp-avoid` (the footer, a form's submit button) makes the
 * button fade out and stop accepting taps while that element is on screen,
 * so it never sits on top of something the visitor needs to reach.
 */
export function WhatsAppButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;

    function check() {
      raf = 0;
      const btn = ref.current;
      if (!btn) return;
      const btnRect = btn.getBoundingClientRect();
      const avoiders = document.querySelectorAll("[data-whatsapp-avoid]");
      let overlap = false;
      avoiders.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (
          r.top < btnRect.bottom &&
          r.bottom > btnRect.top &&
          r.left < btnRect.right &&
          r.right > btnRect.left
        ) {
          overlap = true;
        }
      });
      setHidden(overlap);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(check);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const number = site.whatsapp.e164.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(site.whatsapp.prefill)}`;

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Aerotech on WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed right-4 z-40 inline-flex min-h-14 items-center gap-2.5 rounded-full bg-orange-500 px-4.5 py-3.5 font-sans text-sm font-semibold text-white transition-opacity duration-150 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      )}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <MessageCircle size={22} strokeWidth={1.6} aria-hidden="true" />
      WhatsApp
    </a>
  );
}

import { MessageCircle } from "lucide-react";

import { site } from "@/content";

/** `wa.me` pill, fixed bottom-right, mobile only. */
export function WhatsAppButton() {
  const number = site.whatsapp.e164.replace(/[^\d]/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(site.whatsapp.prefill)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Aerotech on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-orange-500 px-4 py-3 font-sans text-sm font-semibold text-white transition-colors duration-150 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
    >
      <MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" />
      WhatsApp
    </a>
  );
}

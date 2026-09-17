import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";

import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Aviation & airport consulting, New Delhi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Matches `--surface`, the sticky header's ground, so the mobile browser
  // chrome reads as an extension of the nav. Was a dark navy when the header
  // sat on a dark palette.
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  // WhatsAppButton pads its safe-area inset (`env(safe-area-inset-bottom)`)
  // so it clears a home-indicator bar; that env() only resolves once the
  // page opts into the inset area with viewport-fit=cover.
  viewportFit: "cover",
};

/**
 * Document shell only — fonts, metadata and `<body>`.
 *
 * The header, footer and organisation JSON-LD live in `(site)/layout.tsx` so
 * that the PIN gate at `/gate` gives nothing away about the site.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SiteFooter,
  SiteHeader,
  SkipLink,
  WhatsAppButton,
} from "@/components/site";
import { organizationGraph } from "@/lib/jsonld";

/**
 * The public site shell.
 *
 * It lives in a route group rather than the root layout so that `/gate` —
 * which sits outside this group — renders on its own. Before a visitor has
 * entered the preview PIN they should see nothing of the site: no navigation,
 * no footer with the address and phone number, no organisation JSON-LD.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={organizationGraph()} />
      <SkipLink />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}

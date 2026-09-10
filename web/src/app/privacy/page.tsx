import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPage } from "@/content";
import { breadcrumbGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor.page("privacy");

export default function PrivacyPage() {
  const page = getPage("privacy");
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: page.title, path: "/privacy" },
        ])}
      />
      <BlockRenderer blocks={page.blocks} />
    </>
  );
}

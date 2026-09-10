import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPage } from "@/content";
import { breadcrumbGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";

export const metadata: Metadata = metaFor.page("compliance");

export default function CompliancePage() {
  const page = getPage("compliance");
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbGraph([
          { name: "Home", path: "/" },
          { name: page.title, path: "/compliance" },
        ])}
      />
      <BlockRenderer
        blocks={page.blocks}
        crumbs={[{ label: "Home", href: "/" }, { label: page.title }]}
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { getService, services } from "@/content";
import { breadcrumbGraph, serviceGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";

import { ServicePage } from "../service-template";

type Params = { slug: string };

/**
 * The service list is static content, so an unknown slug is a real 404 rather
 * than a soft one: without this, the root `loading.tsx` boundary streams a
 * shell first and the response has already committed to a 200.
 */
export const dynamicParams = false;

/** Every service except the Aero Opt tool, which lives at `/tools/aero-opt`. */
export function generateStaticParams(): Params[] {
  return services.filter((s) => !s.isTool).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  return metaFor.service(slug);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.isTool) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceGraph(service),
          breadcrumbGraph([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <ServicePage
        service={service}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />
    </>
  );
}

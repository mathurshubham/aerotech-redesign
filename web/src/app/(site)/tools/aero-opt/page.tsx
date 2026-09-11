import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { getService } from "@/content";
import { breadcrumbGraph, serviceGraph } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";

import { ServicePage } from "../../services/service-template";

export const metadata = metaFor.service("aero-opt");

export default function AeroOptPage() {
  const service = getService("aero-opt");
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={[
          serviceGraph(service),
          breadcrumbGraph([
            { name: "Home", path: "/" },
            { name: service.title, path: "/tools/aero-opt" },
          ]),
        ]}
      />
      <ServicePage
        service={service}
        crumbs={[{ label: "Home", href: "/" }, { label: service.title }]}
        asideEyebrow="Tool"
      />
    </>
  );
}

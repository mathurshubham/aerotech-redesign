import {
  ArrowRight,
  ChartColumn,
  ClipboardCheck,
  Leaf,
  MapPin,
  PlaneTakeoff,
  TowerControl,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import type { Service } from "@/content";
import { cn } from "@/lib/utils";

import { renderText } from "./Placeholder";
import { focusRing } from "./styles";

const ICONS: Record<string, LucideIcon> = {
  orat: TowerControl,
  "audits-compliance": ClipboardCheck,
  "sustainable-aviation": Leaf,
  "aircraft-recovery": PlaneTakeoff,
  "india-market-entry": MapPin,
  "aero-opt": ChartColumn,
};

/** Route for a service — the Aero Opt tool lives under `/tools`. */
export function serviceHref(service: Pick<Service, "slug" | "isTool">): string {
  return service.isTool ? `/tools/${service.slug}` : `/services/${service.slug}`;
}

/**
 * White card: 26px teal lucide icon, h3, 15px body, teal `Name →` link.
 *
 * Every card in the grid keeps the same ground and the same hairline border.
 * `featured` and `tool` used to be drawn on the container — a teal border and
 * a grey fill — which read as interaction state rather than category: one
 * tile looked selected and the other looked disabled. The distinction is a
 * *label*, so it is carried by a pill in the icon row and nothing else.
 */
export function ServiceCard({
  service,
  variant = "default",
}: {
  service: Service;
  variant?: "default" | "featured" | "tool";
}) {
  const Icon = ICONS[service.slug] ?? TowerControl;
  const href = serviceHref(service);
  const isTool = variant === "tool";
  const badge = variant === "featured" ? "New" : isTool ? "Tool" : null;

  return (
    <article
      className="flex h-full flex-col gap-3.5 rounded-lg border border-line bg-surface p-5 lg:px-7 lg:pt-7.5 lg:pb-7"
    >
      <div className="flex items-center justify-between">
        <Icon
          size={26}
          strokeWidth={1.6}
          aria-hidden="true"
          className="text-aqua-500"
        />
        {badge && (
          <span className="rounded-full border border-band-line px-2.5 py-0.5 text-[0.75rem] font-semibold text-aqua-700">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-display text-h3 font-semibold">
        {service.title}
      </h3>
      <p className="text-sm leading-[1.58] lg:text-[0.9375rem]">
        {renderText(service.oneLiner)}
      </p>
      <Link
        href={href}
        className={cn(
          // `mt-auto` pins the link to the card's bottom edge: the grid row
          // already stretches every card to the same height, so without it a
          // card with a shorter one-liner puts its link halfway up and the
          // set stops reading as one row.
          "-my-2.5 mt-auto inline-flex min-h-11 items-center gap-1.5 py-2.5 text-sm font-semibold text-aqua-700 transition-colors duration-150 hover:text-aqua-600",
          focusRing,
        )}
      >
        {isTool ? "The tool" : service.shortTitle}
        <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
      </Link>
    </article>
  );
}

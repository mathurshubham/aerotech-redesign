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
 * White card: 26px orange lucide icon, h3, 15px body, orange `Name →` link.
 * `featured` adds an orange border and a "New" pill; `tool` fills with
 * `surface-2` and drops the icon to navy.
 */
export function ServiceCard({
  service,
  variant = "default",
}: {
  service: Service;
  variant?: "default" | "featured" | "tool";
}) {
  const Icon = ICONS[service.slug] ?? TowerControl;
  const isTool = variant === "tool";
  const href = serviceHref(service);

  return (
    <article
      className={cn(
        "flex flex-col gap-3.5 rounded-lg border p-5 lg:px-7 lg:pt-7.5 lg:pb-7",
        isTool
          ? "border-line bg-surface-2"
          : variant === "featured"
            ? "border-orange-500 bg-surface"
            : "border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between">
        <Icon
          size={26}
          strokeWidth={1.6}
          aria-hidden="true"
          className={isTool ? "text-ink-soft" : "text-orange-500"}
        />
        {variant === "featured" && (
          <span className="rounded-full border border-orange-500 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.1em] text-orange-600 uppercase">
            New
          </span>
        )}
      </div>
      <h3 className="font-display text-lg leading-[1.3] font-semibold lg:text-xl">
        {service.title}
      </h3>
      <p className="text-sm leading-[1.58] lg:text-[0.9375rem]">
        {renderText(service.oneLiner)}
      </p>
      <Link
        href={href}
        className={cn(
          "mt-1 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150",
          isTool
            ? "text-ink-soft hover:text-ink"
            : "text-orange-600 hover:text-orange-500",
          focusRing,
        )}
      >
        {isTool ? "The tool" : service.shortTitle}
        <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
      </Link>
    </article>
  );
}

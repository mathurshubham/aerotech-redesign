import type { MetadataRoute } from "next";

import { getAllRoutes, getInsight, insightSlugs } from "@/content";
import { absoluteUrl } from "@/lib/utils";

/** No request-time data — every input is static content, so this prerenders at build time. */
const today = new Date();

function entryFor(route: string): MetadataRoute.Sitemap[number] {
  const insightSlug = insightSlugs.find((slug) => route === `/insights/${slug}`);
  if (insightSlug) {
    const insight = getInsight(insightSlug);
    return {
      url: absoluteUrl(route),
      lastModified: insight?.date ?? today,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  }

  if (route === "/") {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "weekly", priority: 1 };
  }
  if (route === "/services" || route === "/insights") {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "weekly", priority: 0.8 };
  }
  if (route === "/work" || route === "/about" || route === "/contact") {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "monthly", priority: 0.7 };
  }
  if (route.startsWith("/services/") || route === "/tools/aero-opt") {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "monthly", priority: 0.8 };
  }
  if (route.startsWith("/work/") || route.startsWith("/about/")) {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "yearly", priority: 0.6 };
  }
  if (route === "/privacy") {
    return { url: absoluteUrl(route), lastModified: today, changeFrequency: "yearly", priority: 0.2 };
  }
  // Generic pages (e.g. /compliance).
  return { url: absoluteUrl(route), lastModified: today, changeFrequency: "monthly", priority: 0.5 };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllRoutes().map(entryFor);
}

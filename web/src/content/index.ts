export * from "./schema";
export { site } from "./site";
export { services, getService, serviceSlugs } from "./services";
export { work, getCaseStudy, workSlugs } from "./work";
export { people, getPerson, peopleSlugs } from "./people";
export { insights, getInsight, insightSlugs } from "./insights";
export { pages, getPage, pageSlugs } from "./pages";

import { serviceSlugs } from "./services";
import { workSlugs } from "./work";
import { peopleSlugs } from "./people";
import { insightSlugs } from "./insights";
import { pageSlugs } from "./pages";

/** Every static path this site serves, for sitemap generation. */
export function getAllRoutes(): string[] {
  return [
    "/",
    "/services",
    ...serviceSlugs.map((slug) => (slug === "aero-opt" ? "/tools/aero-opt" : `/services/${slug}`)),
    "/work",
    ...workSlugs.map((slug) => `/work/${slug}`),
    "/about",
    ...peopleSlugs.map((slug) => `/about/${slug}`),
    "/insights",
    ...insightSlugs.map((slug) => `/insights/${slug}`),
    "/contact",
    ...pageSlugs.map((slug) => `/${slug}`),
  ];
}

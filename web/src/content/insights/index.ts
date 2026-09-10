import { InsightMetaSchema, type InsightMeta } from "../schema";
import { meta as whatIsOrat } from "./what-is-orat.mdx";
import { meta as corsia2027 } from "./corsia-2027-india-operators.mdx";
import { meta as dgcaCarMap } from "./dgca-car-map-foreign-oems.mdx";

const insightsData: InsightMeta[] = [whatIsOrat, corsia2027, dgcaCarMap];

export const insights: InsightMeta[] = insightsData.map((i) => InsightMetaSchema.parse(i));

export function getInsight(slug: string): InsightMeta | undefined {
  return insights.find((i) => i.slug === slug);
}

export const insightSlugs: string[] = insights.map((i) => i.slug);

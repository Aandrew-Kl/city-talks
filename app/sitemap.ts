import type { MetadataRoute } from "next";
import { getAllArticleMetas } from "../lib/articles";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://city-talks.gr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticleMetas();
  const staticRoutes = [
    "",
    "/opinions",
    "/lets-talk",
    "/podcasts",
    "/smart-cities",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));

  const articleRoutes = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const feed = {
    url: `${BASE}/feed.xml`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.4,
  };

  return [...staticRoutes, ...articleRoutes, feed];
}

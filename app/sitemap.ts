import type { MetadataRoute } from "next";

import { siteMeta } from "@/app/data";
import { getAllArticleSummaries } from "@/lib/articles";

/**
 * `/sitemap.xml` — generated at build time.
 *
 * Contents:
 *   1. Static top-level routes (homepage + 4 category / mission pages).
 *   2. One entry per article under `/articles/{slug}` with the article's
 *      publication date as `lastModified`.
 *
 * All URLs use `siteMeta.url` as base so the host is driven from the
 * canonical source of truth in `app/data.ts`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteMeta.url;
  const now = new Date();

  // `lastModified` for a stable site that doesn't get daily edits — stamp the
  // static routes with the latest article date so the sitemap stays fresh
  // whenever new content ships.
  const summaries = await getAllArticleSummaries();
  const latestArticleDate =
    summaries.length > 0 ? new Date(summaries[0].date) : now;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/opinions`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/smart-cities`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/lets-talk`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/podcasts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = summaries.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}

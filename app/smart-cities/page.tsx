import type { Metadata } from "next";

import ArticleList from "@/app/components/ArticleList";
import { categories, siteMeta } from "@/app/data";
import { getArticleSummariesByCategorySlug } from "@/lib/articles";

const CATEGORY = categories.find((c) => c.slug === "smart-cities")!;

export const metadata: Metadata = {
  title: `${CATEGORY.label} | ${CATEGORY.greek}`,
  description: CATEGORY.description,
  alternates: { canonical: `${siteMeta.url}/smart-cities` },
  openGraph: {
    type: "website",
    url: `${siteMeta.url}/smart-cities`,
    title: `${CATEGORY.label} — City Talks`,
    description: CATEGORY.description,
  },
};

/**
 * `/smart-cities` — category landing for posts tagged `smart-cities`.
 * Per catalog, 4 posts total.
 */
export default async function SmartCitiesPage() {
  const articles = await getArticleSummariesByCategorySlug("smart-cities");

  return (
    <div className="ct-category-page">
      <section
        className="ct-category-hero relative w-full bg-[color:var(--ct-bg)] py-16 sm:py-24"
        aria-labelledby="smart-cities-heading"
      >
        <div
          className="mx-auto flex flex-col items-center gap-4 px-5 text-center sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
            {CATEGORY.greek}
          </p>
          <h1
            id="smart-cities-heading"
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
          >
            {CATEGORY.label}
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[1.6] text-[color:var(--ct-text)]">
            {CATEGORY.description}
          </p>
        </div>
      </section>

      <section
        className="ct-category-list w-full bg-[color:var(--ct-bg-alt)] pb-20 pt-12 sm:pt-16"
        aria-label={`${CATEGORY.label} articles`}
      >
        <div
          className="mx-auto px-5 sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <ArticleList articles={articles} />
        </div>
      </section>
    </div>
  );
}

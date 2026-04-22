import Link from "next/link";

import ArticleCard from "@/app/components/ArticleCard";
import { siteMeta } from "@/app/data";
import { getAllArticleSummaries } from "@/lib/articles";

export interface ArticlesProps {
  /** Maximum cards rendered on the homepage. Defaults to 6. */
  limit?: number;
  /** Override the section heading. */
  heading?: string;
  /** Override the section eyebrow. */
  eyebrow?: string;
}

/**
 * Featured-articles homepage section.
 *
 * Server Component — fetches summaries directly via `getAllArticleSummaries()`
 * and renders a responsive 3-column grid (1 col mobile → 3 col desktop).
 *
 * The "alternating split" hero rows from the WP reference are simplified here
 * into a card grid to share visual language with the category listings,
 * while keeping `siteMeta.greekTagline` as the section eyebrow.
 */
export default async function Articles({
  limit = 6,
  heading = "Τελευταία άρθρα",
  eyebrow = siteMeta.greekTagline,
}: ArticlesProps) {
  const all = await getAllArticleSummaries();
  const articles = all.slice(0, limit);

  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="articles-heading"
      className="ct-articles-section relative w-full bg-[color:var(--ct-bg-alt)] py-16 sm:py-20"
    >
      <div
        className="mx-auto flex flex-col gap-10 px-5 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
              {eyebrow}
            </p>
            <h2
              id="articles-heading"
              className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            >
              {heading}
            </h2>
          </div>
          <Link
            href="/opinions"
            className="text-[14px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)] hover:text-[color:var(--ct-primary-700)]"
          >
            Δείτε όλα →
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <li key={article.slug} className="h-full">
              <ArticleCard article={article} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

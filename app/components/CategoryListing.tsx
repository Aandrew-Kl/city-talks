import ArticleRow, { type ArticleRowData } from "@/app/components/ArticleRow";
import DecorShape from "@/app/components/DecorShape";
import { type Category, siteMeta } from "@/app/data";

export interface CategoryListingProps {
  category: Category;
  articles: readonly ArticleRowData[];
}

/**
 * Shared subpage shell for /opinions and /smart-cities.
 *
 * Layout, top-to-bottom:
 *   1. Hero band — eyebrow tagline, giant category heading, Greek subtitle,
 *      supporting copy. Decorative circles sit behind the copy echoing the
 *      live WP `shape-1.svg` / `shape-2.svg` accents.
 *   2. Article list — alternating full-width rows (image + text) rather than
 *      card grid, matching the live blog's stacked layout. First row is
 *      marked `priority` for LCP.
 *   3. Empty-state fallback shown only when a category has zero posts.
 */
export default function CategoryListing({
  category,
  articles,
}: CategoryListingProps) {
  return (
    <div className="ct-category-page">
      {/* Hero band */}
      <section
        className="ct-category-hero relative isolate w-full overflow-hidden bg-[color:var(--ct-bg)] py-16 sm:py-24"
        aria-labelledby={`${category.slug}-heading`}
      >
        <DecorShape
          variant="ring"
          className="left-[4%] top-[18%] hidden md:block"
          color="var(--ct-secondary-light)"
          size={120}
        />
        <DecorShape
          variant="circle"
          className="right-[6%] top-[12%] hidden md:block"
          color="var(--ct-accent-warm)"
          size={70}
        />
        <DecorShape
          variant="dots"
          className="bottom-[10%] right-[12%] hidden lg:block"
          color="var(--ct-primary)"
          size={110}
        />

        <div
          className="relative mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-text-subtle)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]"
            />
            {siteMeta.greekTagline}
          </p>

          <h1
            id={`${category.slug}-heading`}
            className="font-[family-name:var(--ct-font-display)] text-[clamp(40px,7vw,78px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[color:var(--ct-ink)]"
          >
            {category.label}
          </h1>

          <p
            className="font-[family-name:var(--ct-font-accent)] text-[clamp(22px,2.6vw,32px)] italic text-[color:var(--ct-primary)]"
            style={{ lineHeight: 1.1 }}
          >
            {category.greek}
          </p>

          <p className="max-w-[640px] text-[17px] leading-[1.65] text-[color:var(--ct-text)]">
            {category.description}
          </p>

          <div className="mt-4 flex items-center gap-3 text-[13px] text-[color:var(--ct-text-muted)]">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--ct-primary)] text-[color:var(--ct-on-primary)] text-[13px] font-bold">
              {articles.length}
            </span>
            <span>
              {articles.length === 1
                ? "άρθρο στην κατηγορία"
                : "άρθρα στην κατηγορία"}
            </span>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section
        className="ct-category-list relative w-full bg-[color:var(--ct-bg-alt)] pb-20 pt-16 sm:pt-20"
        aria-label={`${category.label} articles`}
      >
        <div
          className="mx-auto px-5 sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          {articles.length === 0 ? (
            <p className="py-12 text-center text-[color:var(--ct-text-muted)]">
              Δεν βρέθηκαν άρθρα σε αυτή τη κατηγορία.
            </p>
          ) : (
            <ul className="flex flex-col gap-16 md:gap-24">
              {articles.map((article, index) => (
                <li key={article.slug}>
                  <ArticleRow
                    article={article}
                    reverse={index % 2 === 1}
                    priority={index === 0}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

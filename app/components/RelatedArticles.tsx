import ArticleCard, { type ArticleCardData } from "@/app/components/ArticleCard";

export interface RelatedArticlesProps {
  categoryLabel: string;
  articles: readonly ArticleCardData[];
}

/**
 * Related-articles strip shown at the bottom of `/articles/[slug]`.
 *
 * Reuses <ArticleCard /> for card visuals, wraps them in a labelled section
 * with a category eyebrow so readers can keep exploring the same topic.
 */
export default function RelatedArticles({
  categoryLabel,
  articles,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="ct-related w-full bg-[color:var(--ct-bg-alt)] py-16 sm:py-20"
    >
      <div
        className="mx-auto flex flex-col gap-10 px-5 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <header className="flex flex-col items-start gap-3">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-primary)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent)]"
            />
            Συνεχίστε να διαβάζετε
          </p>
          <h2
            id="related-heading"
            className="font-[family-name:var(--ct-font-display)] text-[clamp(26px,3.5vw,40px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-ink)]"
          >
            Περισσότερα από{" "}
            <span
              className="italic"
              style={{
                fontFamily: "var(--ct-font-accent)",
                color: "var(--ct-primary)",
              }}
            >
              {categoryLabel}.
            </span>
          </h2>
        </header>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug} className="h-full">
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

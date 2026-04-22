import ArticleCard, { type ArticleCardData } from "@/app/components/ArticleCard";

export interface ArticleListProps {
  articles: readonly ArticleCardData[];
  /**
   * If `true`, the first card is rendered with `priority` so its hero image
   * loads eagerly (appropriate for category landings where the grid is LCP).
   */
  priorityFirst?: boolean;
}

/**
 * Responsive 1/2/3-column grid used by category listing pages.
 * Keeps cards equal-height via `grid` + `h-full` on the card root.
 */
export default function ArticleList({ articles, priorityFirst = true }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="text-center text-[color:var(--ct-text-muted)]">
        Δεν βρέθηκαν άρθρα σε αυτή τη κατηγορία.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <li key={article.slug} className="h-full">
          <ArticleCard article={article} priority={priorityFirst && index === 0} />
        </li>
      ))}
    </ul>
  );
}

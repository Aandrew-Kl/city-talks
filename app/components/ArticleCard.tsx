import Image from "next/image";
import Link from "next/link";

import { categories, type CategorySlug } from "@/app/data";
import { formatGreekDate } from "@/lib/articles";

export interface ArticleCardData {
  title: string;
  slug: string;
  category: CategorySlug;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  readingLabel: string;
}

export interface ArticleCardProps {
  article: ArticleCardData;
  /**
   * Hint to the Image component whether this card is above the fold.
   * When `true` we opt into `priority` + eager loading.
   */
  priority?: boolean;
}

function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

/**
 * Responsive card used in:
 *   - homepage `<Articles />` grid,
 *   - `/opinions` + `/smart-cities` listing grids.
 *
 * Renders: featured image 4:3 → category badge → linked H3 title → excerpt (2 lines) → byline.
 */
export default function ArticleCard({ article, priority = false }: ArticleCardProps) {
  const href = `/articles/${article.slug}`;
  return (
    <article className="ct-article-card group flex h-full flex-col overflow-hidden rounded-[var(--ct-radius-md)] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] shadow-[var(--ct-shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--ct-shadow-md)]">
      <Link
        href={href}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[color:var(--ct-bg-alt)]"
        aria-label={article.title}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <Link
          href={`/${article.category}`}
          className="ct-category-pill inline-flex w-fit items-center gap-2 self-start rounded-full bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)] transition-colors hover:bg-[color:var(--ct-primary)] hover:text-[color:var(--ct-on-primary)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          {categoryLabel(article.category)}
        </Link>

        <h3 className="text-[22px] font-black leading-[1.2] tracking-tight text-[color:var(--ct-ink)]">
          <Link href={href} className="transition-colors hover:text-[color:var(--ct-primary)]">
            {article.title}
          </Link>
        </h3>

        <p className="ct-article-excerpt line-clamp-3 text-[15px] leading-[1.55] text-[color:var(--ct-text)]">
          {article.excerpt}
        </p>

        <footer className="mt-auto flex items-center justify-between gap-3 pt-4 text-[12px] text-[color:var(--ct-text-muted)]">
          <span className="truncate">
            <span className="font-medium text-[color:var(--ct-text-subtle)]">{article.author}</span>
            <span aria-hidden="true"> · </span>
            <time dateTime={article.date}>{formatGreekDate(article.date)}</time>
          </span>
          <span className="shrink-0 whitespace-nowrap font-medium">
            {article.readingLabel}
          </span>
        </footer>
      </div>
    </article>
  );
}

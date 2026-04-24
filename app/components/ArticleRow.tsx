import Image from "next/image";
import Link from "next/link";

import { categories, type CategorySlug } from "@/app/data";
import { formatGreekDate } from "@/lib/articles";

export interface ArticleRowData {
  title: string;
  slug: string;
  category: CategorySlug;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  readingLabel: string;
}

export interface ArticleRowProps {
  article: ArticleRowData;
  /** Reverse image/text layout for alternating rows. */
  reverse?: boolean;
  priority?: boolean;
}

function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

/**
 * Wide "listing row" — 50/50 image + text split.
 * Mirrors the stacked-list blog layout on the live WP site where each post
 * is a full-width row (image one side, title + excerpt + meta on the other).
 *
 * Alternating `reverse` swaps the image to the right for visual rhythm on
 * /opinions and /smart-cities.
 */
export default function ArticleRow({
  article,
  reverse = false,
  priority = false,
}: ArticleRowProps) {
  const href = `/articles/${article.slug}`;
  return (
    <article
      className="ct-article-row group relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
      data-reverse={reverse ? "true" : "false"}
    >
      <Link
        href={href}
        aria-label={article.title}
        className={`relative block aspect-[4/3] w-full overflow-hidden rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg-alt)] shadow-[var(--ct-shadow-sm)] md:aspect-[5/4] ${
          reverse ? "md:order-2" : ""
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          priority={priority}
        />
      </Link>

      <div className={`flex flex-col gap-4 ${reverse ? "md:order-1" : ""}`}>
        <Link
          href={`/${article.category}`}
          className="inline-flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-primary)] transition-colors hover:text-[color:var(--ct-primary-700)]"
        >
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent)]"
          />
          {categoryLabel(article.category)}
        </Link>

        <h2 className="font-[family-name:var(--ct-font-display)] text-[clamp(26px,3.5vw,38px)] font-black leading-[1.08] tracking-tight text-[color:var(--ct-ink)]">
          <Link
            href={href}
            className="transition-colors hover:text-[color:var(--ct-primary)]"
          >
            {article.title}
          </Link>
        </h2>

        <p className="max-w-[560px] text-[16px] leading-[1.65] text-[color:var(--ct-text)]">
          {article.excerpt}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="ct-author-pill inline-flex items-center gap-2 rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-secondary)] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.6px] text-[color:var(--ct-on-primary)]">
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="6" cy="4" r="2.2" />
              <path d="M2 10.5c.8-1.8 2.3-2.8 4-2.8s3.2 1 4 2.8" />
            </svg>
            {article.author}
          </span>
          <time
            dateTime={article.date}
            className="text-[13px] text-[color:var(--ct-text-muted)]"
          >
            {formatGreekDate(article.date)}
          </time>
          <span aria-hidden="true" className="text-[color:var(--ct-border)]">
            ·
          </span>
          <span className="text-[13px] text-[color:var(--ct-text-muted)]">
            {article.readingLabel}
          </span>
        </div>

        <Link
          href={href}
          className="mt-2 inline-flex w-fit items-center gap-2 text-[14px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)] transition-all group-hover:gap-3 hover:text-[color:var(--ct-primary-700)]"
        >
          Διαβάστε περισσότερα
          <svg
            aria-hidden="true"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M9 1l4 4-4 4M13 5H0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

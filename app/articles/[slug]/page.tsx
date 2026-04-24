import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import DecorShape from "@/app/components/DecorShape";
import LetsTalk from "@/app/components/LetsTalk";
import RelatedArticles from "@/app/components/RelatedArticles";
import { categories, siteMeta, type CategorySlug } from "@/app/data";
import {
  formatGreekDate,
  getAllArticleSlugs,
  getAllArticleSummaries,
  getArticleBySlug,
} from "@/lib/articles";
import { withBasePath } from "@/lib/basePath";

interface PageParams {
  slug: string;
}

/**
 * Statically generate every article at build time — there are only 12,
 * and all slugs are known from the markdown directory.
 */
export function generateStaticParams(): PageParams[] {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

// If a slug doesn't exist at build time, 404 instead of rendering on-demand.
export const dynamicParams = false;

export async function generateMetadata(
  { params }: { params: Promise<PageParams> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Άρθρο δεν βρέθηκε" };
  }

  const url = `${siteMeta.url}/articles/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "el_GR",
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

function categoryGreek(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.greek ?? slug;
}

/**
 * `/articles/[slug]` — single article page.
 *
 * Layout (matches the live WP single-post template):
 *   1. Hero band: uppercase category eyebrow → big title → teal author pill +
 *      Greek publish date + reading time. Decorative circles behind the copy
 *      echo `shape-1.svg`/`shape-2.svg` on the live site.
 *   2. Featured image — wide 16:9, rounded.
 *   3. Body prose — centered column (`ct-prose`) rendered from markdown.
 *   4. Related articles row (other posts in the same category).
 *   5. Partnership CTA (`<LetsTalk />`).
 */
export default async function ArticlePage(
  { params }: { params: Promise<PageParams> },
) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const categoryHref = `/${article.category}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: [`${siteMeta.url}${article.image}`],
    datePublished: article.date,
    dateModified: article.date,
    author: [{ "@type": "Person", name: article.author }],
    mainEntityOfPage: `${siteMeta.url}/articles/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteMeta.name,
      url: siteMeta.url,
    },
  };

  // Pull up to 3 other articles in the same category for the related strip.
  const allSummaries = await getAllArticleSummaries();
  const related = allSummaries
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article
      className="ct-article"
      itemScope
      itemType="https://schema.org/Article"
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD is generated server-side from our own trusted frontmatter
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* === Hero band === */}
      <header className="ct-article-hero relative isolate w-full overflow-hidden bg-[color:var(--ct-bg)] py-14 sm:py-20">
        <DecorShape
          variant="ring"
          className="left-[4%] top-[14%] hidden md:block"
          color="var(--ct-secondary-light)"
          size={110}
        />
        <DecorShape
          variant="circle"
          className="right-[8%] top-[10%] hidden md:block"
          color="var(--ct-accent-warm)"
          size={70}
        />
        <DecorShape
          variant="scribble"
          className="bottom-[12%] left-[8%] hidden lg:block"
          color="var(--ct-accent)"
          size={130}
        />
        <DecorShape
          variant="dots"
          className="bottom-[14%] right-[10%] hidden lg:block"
          color="var(--ct-primary)"
          size={100}
        />

        <div
          className="relative mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "860px" }}
        >
          <nav
            aria-label="Article category"
            className="text-[11px] font-semibold uppercase tracking-[1.6px]"
          >
            <Link
              href={categoryHref}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[color:var(--ct-primary)] transition-colors hover:bg-[color:var(--ct-primary)] hover:text-[color:var(--ct-on-primary)]"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-current"
              />
              {categoryLabel(article.category)}
            </Link>
          </nav>

          <h1
            className="font-[family-name:var(--ct-font-display)] text-[clamp(32px,5vw,55px)] font-black leading-[1.05] tracking-[-0.015em] text-[color:var(--ct-ink)]"
            itemProp="headline"
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="ct-author-pill inline-flex items-center gap-2 rounded-[var(--ct-radius-pill)] bg-[color:var(--ct-secondary)] px-4 py-1.5 text-[13px] font-semibold text-[color:var(--ct-on-primary)]"
              itemProp="author"
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="7" cy="5" r="2.6" />
                <path d="M2 12.5c.9-2.1 2.7-3.3 5-3.3s4.1 1.2 5 3.3" />
              </svg>
              {article.author}
            </span>
            <time
              dateTime={article.date}
              itemProp="datePublished"
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
        </div>
      </header>

      {/* === Featured image === */}
      <figure
        className="ct-article-figure mx-auto w-full px-5 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg-alt)] shadow-[var(--ct-shadow-md)]">
          <Image
            src={withBasePath(article.image)}
            alt={article.title}
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            priority
            className="object-cover"
            itemProp="image"
          />
        </div>
        <figcaption className="sr-only">{article.title}</figcaption>
      </figure>

      {/* === Body prose === */}
      <section
        className="ct-article-body relative w-full bg-[color:var(--ct-bg)] px-5 py-14 sm:px-8 sm:py-20"
        aria-label={`${article.title} — body`}
      >
        <div
          className="mx-auto grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] md:items-start"
          style={{ maxWidth: "980px" }}
        >
          <aside className="ct-article-sidebar hidden md:block md:sticky md:top-[calc(var(--ct-header-h)+24px)] md:self-start">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-current"
              />
              {categoryGreek(article.category)}
            </p>
            <dl className="mt-6 flex flex-col gap-5 text-[13px]">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                  Συγγραφέας
                </dt>
                <dd className="mt-1 font-semibold text-[color:var(--ct-ink)]">
                  {article.author}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                  Δημοσιεύτηκε
                </dt>
                <dd className="mt-1 text-[color:var(--ct-text)]">
                  {formatGreekDate(article.date)}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                  Χρόνος ανάγνωσης
                </dt>
                <dd className="mt-1 text-[color:var(--ct-text)]">
                  {article.readingLabel}
                </dd>
              </div>
            </dl>
          </aside>

          <div
            className="ct-prose text-[17px] leading-[1.75] text-[color:var(--ct-text)]"
            itemProp="articleBody"
            // eslint-disable-next-line react/no-danger -- markdown is author-controlled and rendered via remark
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </section>

      {/* === Related articles === */}
      {related.length > 0 && (
        <RelatedArticles
          categoryLabel={categoryLabel(article.category)}
          articles={related}
        />
      )}

      {/* === Partnership CTA === */}
      <LetsTalk
        heading="We'd love to partner up."
        description={siteMeta.footer.invitation}
        ctaLabel="Send message"
        ctaHref="/lets-talk#contact"
      />
    </article>
  );
}

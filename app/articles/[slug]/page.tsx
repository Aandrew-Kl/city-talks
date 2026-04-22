import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { categories, siteMeta, type CategorySlug } from "@/app/data";
import {
  formatGreekDate,
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/lib/articles";

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
 * Layout (matches `/tmp/ct-wp/post.html` / C3 in the brief):
 *   1. Hero band: category breadcrumb → H1 title → reading time.
 *   2. Featured image.
 *   3. Body prose (.ct-prose wrapper), rendered from markdown → HTML.
 *   4. Partnership CTA card (self-contained — `/lets-talk` is owned by Agent C,
 *      we just link to it here).
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

  return (
    <article className="ct-article" itemScope itemType="https://schema.org/Article">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD is generated server-side from our own trusted frontmatter
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* === Hero band === */}
      <header className="ct-article-hero relative w-full bg-[color:var(--ct-bg)] py-14 sm:py-20">
        <div
          className="mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "860px" }}
        >
          <nav aria-label="Article category" className="text-[11px] font-semibold uppercase tracking-[1.4px] text-[color:var(--ct-text-muted)]">
            <span>Published in:&nbsp;</span>
            <Link
              href={categoryHref}
              className="text-[color:var(--ct-primary)] hover:text-[color:var(--ct-primary-700)]"
            >
              {categoryLabel(article.category)}
            </Link>
          </nav>

          <h1
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            itemProp="headline"
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[13px] text-[color:var(--ct-text-muted)]">
            <span className="font-medium text-[color:var(--ct-text-subtle)]" itemProp="author">
              {article.author}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date} itemProp="datePublished">
              {formatGreekDate(article.date)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.readingLabel}</span>
          </div>
        </div>
      </header>

      {/* === Featured image === */}
      <figure className="ct-article-figure mx-auto w-full px-5 sm:px-8" style={{ maxWidth: "var(--ct-container)" }}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg-alt)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            priority
            className="object-cover"
            itemProp="image"
          />
        </div>
      </figure>

      {/* === Body prose === */}
      <section
        className="ct-article-body w-full px-5 py-12 sm:px-8 sm:py-16"
        aria-label={`${article.title} — body`}
      >
        <div
          className="mx-auto flex flex-col gap-10 md:grid md:grid-cols-[220px_1fr] md:items-start"
          style={{ maxWidth: "960px" }}
        >
          <aside className="ct-article-sidebar hidden md:block md:sticky md:top-28 md:self-start">
            <p className="ct-category-pill inline-flex w-fit items-center gap-2 rounded-full bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {categoryGreek(article.category)}
            </p>
            <p className="mt-5 text-[13px] text-[color:var(--ct-text-muted)]">
              {article.readingLabel}
            </p>
            <p className="mt-2 text-[13px] text-[color:var(--ct-text-subtle)]">
              {article.author}
            </p>
          </aside>

          <div
            className="ct-prose text-[17px] leading-[1.7] text-[color:var(--ct-text)]"
            itemProp="articleBody"
            // eslint-disable-next-line react/no-danger -- markdown is author-controlled and rendered via remark
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />
        </div>
      </section>

      {/* === Partnership CTA (inline fallback while Agent C's LetsTalk lives on /lets-talk) === */}
      <aside
        className="ct-article-cta w-full bg-[color:var(--ct-bg-alt)] py-14"
        aria-label="Partnership CTA"
      >
        <div
          className="mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "760px" }}
        >
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-primary)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
            {siteMeta.greekTagline}
          </p>
          <h2 className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]">
            We&apos;d love to partner up
          </h2>
          <p className="text-[16px] leading-[1.6] text-[color:var(--ct-text)]">
            {siteMeta.footer.invitation}
          </p>
          <Link
            href="/lets-talk#contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--ct-primary)] px-6 text-[15px] font-semibold text-[color:var(--ct-on-primary)] transition-colors hover:bg-[color:var(--ct-primary-700)]"
          >
            Send message
          </Link>
        </div>
      </aside>
    </article>
  );
}

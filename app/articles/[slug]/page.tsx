import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Newsletter } from "../../components/Newsletter";
import {
  getAllArticleMetas,
  getArticle,
  formatDate,
} from "../../../lib/articles";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://city-talks.gr";
const SITE_NAME = "City Talks";

export async function generateStaticParams() {
  const metas = await getAllArticleMetas();
  return metas.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: `Άρθρο | ${SITE_NAME}` };

  const url = `${BASE}/articles/${article.slug}`;
  const title = `${article.title} | ${SITE_NAME}`;
  // Per-article dynamic OG — Next will hit /articles/<slug>/opengraph-image
  // if present; otherwise it falls back to the root OG handler.
  const image = `${BASE}/articles/${article.slug}/opengraph-image`;

  return {
    title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "el_GR",
      url,
      siteName: SITE_NAME,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      section: article.category,
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const url = `${BASE}/articles/${article.slug}`;
  const image = `${BASE}/articles/${article.slug}/opengraph-image`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: article.title,
    description: article.excerpt,
    image: [image],
    datePublished: article.date,
    dateModified: article.date,
    author: [{ "@type": "Person", name: article.author }],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/icon` },
    },
    articleSection: article.category,
    inLanguage: "el-GR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero banner */}
        <div className={`bg-${article.accent} py-20 text-white`}>
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/80">
              <Link
                href={`/${article.categorySlug}`}
                className="underline-offset-4 hover:underline"
              >
                {article.category}
              </Link>
              <span>•</span>
              <time>{formatDate(article.date)}</time>
              <span>•</span>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {article.title}
            </h1>
            {article.subtitle ? (
              <p className="mt-4 text-xl font-medium text-white/90">
                {article.subtitle}
              </p>
            ) : null}
            <p className="mt-8 text-lg font-semibold">
              από τον/την {article.author}
            </p>
          </div>
        </div>

        {/* Article body */}
        <article className="mx-auto max-w-3xl px-6 py-16">
          <div
            className="prose prose-lg prose-neutral max-w-none
              prose-headings:font-extrabold prose-headings:tracking-tight
              prose-h2:mt-10 prose-h2:text-3xl
              prose-p:leading-relaxed prose-p:text-neutral-700
              prose-strong:text-neutral-900
              prose-a:text-brand-purple prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <div className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-8">
            <Link
              href="/opinions"
              className="text-sm font-semibold text-brand-purple hover:underline"
            >
              ← Όλες οι Απόψεις
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Αρχική →
            </Link>
          </div>
        </article>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

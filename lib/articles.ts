/**
 * Article data layer.
 *
 * Reads `content/articles/*.md`, parses YAML frontmatter via gray-matter,
 * renders the markdown body to HTML via remark + remark-html, and
 * computes reading time via `reading-time`.
 *
 * All I/O happens at build time on the server — these helpers are consumed
 * exclusively by Server Components and `generateStaticParams`.
 *
 * The loader is evaluated once per process: `readArticlesOnce()` is memoised
 * in module scope so repeated calls during a build don't reparse 12 files.
 */
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import html from "remark-html";

import { categories, type CategorySlug } from "@/app/data";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

/** Shape expected in `content/articles/*.md` frontmatter. */
interface ArticleFrontmatter {
  title: string;
  date: string;
  category: CategorySlug;
  excerpt: string;
  image: string;
  slug: string;
  author: string;
}

/** Fully-hydrated article (frontmatter + rendered HTML + reading-time). */
export interface Article extends ArticleFrontmatter {
  /** Rendered HTML of the markdown body. Safe to inject via `dangerouslySetInnerHTML`. */
  contentHtml: string;
  /** Rough reading time in minutes, rounded up. Never less than 1. */
  readingMinutes: number;
  /** Reading-time display string in Greek: "X′ ανάγνωσης". */
  readingLabel: string;
}

/** A slimmer projection — everything a card needs without the rendered body. */
export type ArticleSummary = Omit<Article, "contentHtml">;

const VALID_CATEGORIES: ReadonlySet<CategorySlug> = new Set(
  categories.map((c) => c.slug),
);

function isCategorySlug(value: unknown): value is CategorySlug {
  return typeof value === "string" && VALID_CATEGORIES.has(value as CategorySlug);
}

function assertFrontmatter(
  data: Record<string, unknown>,
  file: string,
): ArticleFrontmatter {
  const { title, date, category, excerpt, image, slug, author } = data;

  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`[articles] missing "title" in ${file}`);
  }
  if (typeof date !== "string" || Number.isNaN(Date.parse(date))) {
    throw new Error(`[articles] invalid "date" in ${file}: ${String(date)}`);
  }
  if (!isCategorySlug(category)) {
    throw new Error(
      `[articles] invalid "category" in ${file}: ${String(category)} (expected one of: ${[...VALID_CATEGORIES].join(", ")})`,
    );
  }
  if (typeof excerpt !== "string" || excerpt.length === 0) {
    throw new Error(`[articles] missing "excerpt" in ${file}`);
  }
  if (typeof image !== "string" || image.length === 0) {
    throw new Error(`[articles] missing "image" in ${file}`);
  }
  if (typeof slug !== "string" || slug.length === 0) {
    throw new Error(`[articles] missing "slug" in ${file}`);
  }
  if (typeof author !== "string" || author.length === 0) {
    throw new Error(`[articles] missing "author" in ${file}`);
  }

  return { title, date, category, excerpt, image, slug, author };
}

async function renderMarkdown(body: string): Promise<string> {
  const processed = await remark().use(html, { sanitize: false }).process(body);
  return processed.toString();
}

async function loadArticle(file: string): Promise<Article> {
  const abs = path.join(ARTICLES_DIR, file);
  const raw = fs.readFileSync(abs, "utf8");
  const { data, content } = matter(raw);
  const front = assertFrontmatter(data, file);

  const contentHtml = await renderMarkdown(content);
  const stats = readingTime(content);
  const readingMinutes = Math.max(1, Math.ceil(stats.minutes));

  return {
    ...front,
    contentHtml,
    readingMinutes,
    readingLabel: `${readingMinutes}′ ανάγνωσης`,
  };
}

let cache: Article[] | null = null;

async function readArticlesOnce(): Promise<Article[]> {
  if (cache) return cache;

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"));

  const articles = await Promise.all(files.map(loadArticle));

  // Sort most-recent first so every consumer (homepage, listings, sitemap)
  // shares the same ordering.
  articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  cache = articles;
  return cache;
}

/** All articles (full, rendered), sorted by date descending. */
export async function getAllArticles(): Promise<Article[]> {
  return readArticlesOnce();
}

/** Summaries only — cheaper projection for listing grids. */
export async function getAllArticleSummaries(): Promise<ArticleSummary[]> {
  const all = await readArticlesOnce();
  return all.map(toSummary);
}

/** Single article by slug, or `null` if no file matches. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await readArticlesOnce();
  return all.find((a) => a.slug === slug) ?? null;
}

/** Articles in a single category, sorted by date desc. */
export async function getArticlesByCategorySlug(
  category: CategorySlug,
): Promise<Article[]> {
  const all = await readArticlesOnce();
  return all.filter((a) => a.category === category);
}

/** Summaries in a single category. */
export async function getArticleSummariesByCategorySlug(
  category: CategorySlug,
): Promise<ArticleSummary[]> {
  const list = await getArticlesByCategorySlug(category);
  return list.map(toSummary);
}

/**
 * All slugs — drives `generateStaticParams` on `/articles/[slug]`.
 * Synchronous and fs-only so it can run without touching the markdown renderer.
 */
export function getAllArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

/** Format an ISO date string as Greek long form: "10 Δεκεμβρίου 2025". */
export function formatGreekDate(date: string): string {
  return new Date(date).toLocaleDateString("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Alias: other modules refer to this as `getAllArticleMetas`. */
export const getAllArticleMetas = getAllArticleSummaries;

/** Alias: other modules refer to this as `getArticle`. */
export const getArticle = getArticleBySlug;

function toSummary(article: Article): ArticleSummary {
  const {
    title,
    date,
    category,
    excerpt,
    image,
    slug,
    author,
    readingMinutes,
    readingLabel,
  } = article;
  return {
    title,
    date,
    category,
    excerpt,
    image,
    slug,
    author,
    readingMinutes,
    readingLabel,
  };
}

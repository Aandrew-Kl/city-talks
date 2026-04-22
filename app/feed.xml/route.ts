/**
 * RSS 2.0 feed at `/feed.xml`.
 *
 * Mirrors the WordPress `/feed/` endpoint users and readers (Feedly, NetNewsWire,
 * etc.) may already be subscribed to. Feeds are regenerated per revalidation
 * window — the body is cached via `Cache-Control` headers.
 */
import { getAllArticleSummaries } from "@/lib/articles";
import { siteMeta } from "@/app/data";

// Escape XML text nodes / attribute values.
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// RFC-822 date string, e.g. "Wed, 10 Dec 2025 00:00:00 GMT".
function rfc822(dateIso: string): string {
  return new Date(`${dateIso}T00:00:00.000Z`).toUTCString();
}

export async function GET(): Promise<Response> {
  const articles = await getAllArticleSummaries();
  const latestDate = articles[0]?.date ?? new Date().toISOString().slice(0, 10);
  const feedUrl = `${siteMeta.url}/feed.xml`;

  const items = articles
    .map((a) => {
      const link = `${siteMeta.url}/articles/${a.slug}`;
      return [
        "    <item>",
        `      <title>${xmlEscape(a.title)}</title>`,
        `      <link>${xmlEscape(link)}</link>`,
        `      <guid isPermaLink="true">${xmlEscape(link)}</guid>`,
        `      <pubDate>${rfc822(a.date)}</pubDate>`,
        `      <description>${xmlEscape(a.excerpt)}</description>`,
        `      <category>${xmlEscape(a.category)}</category>`,
        a.author ? `      <author>noreply@city-talks.gr (${xmlEscape(a.author)})</author>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(siteMeta.name)}</title>
    <link>${xmlEscape(siteMeta.url)}</link>
    <description>${xmlEscape(siteMeta.description)}</description>
    <language>el-GR</language>
    <generator>Next.js</generator>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${rfc822(latestDate)}</pubDate>
    <atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

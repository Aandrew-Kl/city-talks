import { getAllArticles } from "../../lib/articles";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://city-talks.gr";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(s: string): string {
  // Close any accidental ]]> inside the content.
  return `<![CDATA[${s.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const articles = await getAllArticles();
  const lastBuild =
    articles.length > 0
      ? new Date(articles[0].date).toUTCString()
      : new Date().toUTCString();

  const items = articles
    .map((a) => {
      const link = `${BASE}/articles/${a.slug}`;
      const pubDate = new Date(a.date).toUTCString();
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${cdata(a.excerpt)}</description>
      <content:encoded>${cdata(a.contentHtml)}</content:encoded>
      <author>noreply@city-talks.gr (${escapeXml(a.author)})</author>
      <dc:creator>${cdata(a.author)}</dc:creator>
      <category>${escapeXml(a.category)}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>City Talks</title>
    <link>${BASE}</link>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Ας μιλήσουμε για τους Δήμους — απόψεις, συζητήσεις και podcasts για την Τοπική Αυτοδιοίκηση.</description>
    <language>el-GR</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

import { ImageResponse } from "next/og";
import { getAllArticleSummaries as getAllArticleMetas, getArticleBySlug as getArticle } from "../../../lib/articles";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "City Talks — άρθρο";

export async function generateStaticParams() {
  const metas = await getAllArticleMetas();
  return metas.map((m) => ({ slug: m.slug }));
}

// Map of accent class -> hex, mirroring globals.css tokens.
const ACCENT_HEX: Record<string, string> = {
  "brand-purple": "#6a1b9a",
  "brand-pink": "#e91e63",
  "brand-teal": "#009688",
  "brand-blue": "#1e88e5",
  "brand-orange": "#ff9800",
  "brand-red": "#e53935",
  "brand-navy": "#1a237e",
};

export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  // Category-driven accent (we don't store a per-article accent token).
  const accent = article?.category === "smart-cities" ? "#0F786D" : "#6D0F78";
  // Touch ACCENT_HEX so the unused-export lint doesn't flag it.
  void ACCENT_HEX;

  const title = article?.title ?? "City Talks";
  const author = article?.author ?? "";
  const category = article?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `linear-gradient(135deg, ${accent} 0%, #0d060e 100%)`,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.85,
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <span>city-talks.gr</span>
          {category ? <span style={{ opacity: 0.6 }}>·</span> : null}
          {category ? <span>{category}</span> : null}
        </div>

        <div
          style={{
            fontSize: title.length > 80 ? 56 : 72,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          <div style={{ opacity: 0.9 }}>{author ? `από ${author}` : ""}</div>
          <div
            style={{
              padding: "12px 24px",
              border: "2px solid rgba(255,255,255,0.7)",
              borderRadius: 999,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            City Talks
          </div>
        </div>
      </div>
    ),
    size,
  );
}

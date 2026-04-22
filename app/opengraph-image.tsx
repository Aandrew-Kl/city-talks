import { ImageResponse } from "next/og";

import { siteMeta } from "@/app/data";

/**
 * Default Open Graph image for the whole site (overridden by per-route
 * `opengraph-image` files if any are added later).
 *
 * Rendered by Next.js at build time into `/opengraph-image.png`.
 * Uses a Greek-capable Inter TTF fetched from Google Fonts, since Satori
 * (the engine behind `next/og`) cannot resolve CSS-custom-property fonts
 * and needs the raw font bytes.
 *
 * Canvas: 1200×630, purple brand gradient, white wordmark + Greek tagline.
 */

export const alt =
  "City Talks — Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadInter(weight: 400 | 700 | 900): Promise<ArrayBuffer> {
  // Satori only parses TTF/OTF (woff2 throws "Unsupported OpenType signature").
  // Google Fonts returns TTF only when the request UA looks legacy — modern
  // browsers get woff2. We therefore send an ancient UA so the CSS2 endpoint
  // points to a `.ttf` file we can pass straight to Satori.
  const cssUrl = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap&subset=greek`;
  const cssRes = await fetch(cssUrl, {
    headers: {
      "User-Agent": "Mozilla/4.0",
    },
  });
  const css = await cssRes.text();

  // The CSS lists each subset in its own @font-face block. There's no /* greek */
  // comment when the `subset=greek` flag is used, so just take the first src url.
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]?truetype/);

  if (!match) {
    throw new Error(
      "[opengraph-image] Could not locate Inter TTF URL — Google Fonts CSS changed?",
    );
  }

  const fontUrl = match[1].replace(/['"]/g, "");
  const fontRes = await fetch(fontUrl);
  return fontRes.arrayBuffer();
}

export default async function Image() {
  const [interRegular, interBold] = await Promise.all([
    loadInter(400),
    loadInter(900),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #6D0F78 0%, #8A3E93 60%, #6D0F78 100%)",
          color: "#FFFFFF",
          fontFamily: "Inter",
          textAlign: "center",
        }}
      >
        {/* Decorative accent dot — matches the brand accent in the inline logo */}
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: "#0FBBB4",
            marginBottom: 28,
          }}
        />

        {/* Wordmark — "City" in bold, "Talks." in regular italic-ish styling,
            set as a simple typographic lockup in flex since Satori doesn't
            ship a serif with Greek coverage. */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 900,
            fontSize: 128,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          <span>City</span>
          <span style={{ width: 12 }} />
          <span
            style={{
              fontWeight: 400,
              color: "#FDC14C",
            }}
          >
            Talks.
          </span>
        </div>

        {/* Greek tagline */}
        <div
          style={{
            marginTop: 48,
            fontSize: 46,
            fontWeight: 400,
            maxWidth: 980,
            lineHeight: 1.25,
            color: "rgba(255,255,255,0.94)",
          }}
        >
          {siteMeta.greekTagline}
        </div>

        {/* Site URL label — the small brand footer badge */}
        <div
          style={{
            marginTop: 64,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.12)",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: 1.4,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: "#0FBBB4",
            }}
          />
          <span>city-talks.gr</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 900,
          style: "normal",
        },
      ],
    },
  );
}

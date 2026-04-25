
"use client";

import Link from "next/link";
import { useState } from "react";

import { withBasePath } from "@/lib/basePath";

/**
 * Hero — has two visual modes:
 *
 *   (a) Homepage: brick-wall + speech-bubble photo filling the whole hero,
 *       split visually into 4 vertical sections by white dividers. Hovering a
 *       section swaps the photo to that category's image (Opinions / Let's
 *       Talk / Podcasts / Smart Cities) and the white "City Talks." +
 *       subtitle overlay swaps in sync.
 *   (b) Secondary pages (`/lets-talk` etc.): compact headline + intro
 *       paragraphs on plain background. Triggered by `compact` prop.
 */

export interface HeroProps {
  /** Render the compact headline/intro variant (used on /lets-talk). */
  compact?: boolean;
  headline?: string;
  intro?: string[];
}

export default function Hero(props: HeroProps = {}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (props.compact) {
    return <CompactHero headline={props.headline} intro={props.intro} />;
  }

  return (
    <section
      aria-label="City Talks"
      className="ct-hero relative isolate w-full overflow-hidden"
    >
      <div
        className="relative mx-auto w-full overflow-hidden"
        style={{
          minHeight: "clamp(480px, 78vh, 760px)",
          backgroundImage: `url(${withBasePath(DEFAULT_HERO_IMAGE)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Column-specific photos stacked on top of the CSS background. Only
            the hovered column's image has opacity 1; others stay at 0. */}
        {HERO_COLUMNS.map((col, i) => (
          <img
            key={col.href}
            src={withBasePath(col.image)}
            alt={col.label}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out"
            style={{ opacity: hoveredIdx === i ? 1 : 0 }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* 4 hover/click columns + vertical dividers. Next.js <Link> auto-
            prefixes the basePath (`/city-talks` on GH Pages) so clicks
            land at /city-talks/opinions/ etc. instead of 404'ing. */}
        <div className="absolute inset-0 z-10 grid grid-cols-4">
          {HERO_COLUMNS.map((col, i) => (
            <Link
              key={col.href}
              href={col.href}
              aria-label={col.label}
              onMouseEnter={() => setHoveredIdx(i)}
              onFocus={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onBlur={() => setHoveredIdx(null)}
              className="relative block h-full"
              style={{
                borderRight:
                  i < HERO_COLUMNS.length - 1
                    ? "1px solid rgba(255,255,255,0.9)"
                    : undefined,
              }}
            >
              {/* Per-column label at bottom, rotated vertical */}
              <span
                className="absolute bottom-5 left-5"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "lowercase",
                  color: "#ffffff",
                  textShadow: "0 1px 3px rgba(0,0,0,0.55)",
                  whiteSpace: "nowrap",
                }}
              >
                — {col.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Hero overlay: "City Talks." + "Your Opinion Matters!" in white,
            top-left across the whole grid, on top of all columns. Swaps with
            hoveredIdx so each column reveals its own title/subtitle. */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex"
          style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
        >
          <div
            className="w-full px-8 pt-20 sm:px-16 sm:pt-24 lg:px-24"
            style={{ maxWidth: "var(--ct-container)" }}
          >
            <h1
              className="ct-hero-headline font-[family-name:var(--ct-font-display)] transition-opacity duration-300 ease-out"
              style={{
                fontSize: "clamp(48px, 7vw, 110px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontWeight: 700,
                color: "#ffffff",
                textShadow:
                  "0 6px 24px rgba(13,6,14,0.55), 0 2px 6px rgba(13,6,14,0.4)",
              }}
            >
              {hoveredIdx !== null ? HERO_COLUMNS[hoveredIdx].title : "City Talks."}
            </h1>
            <p
              className="mt-4 max-w-xl transition-opacity duration-300 ease-out"
              style={{
                fontSize: "clamp(17px, 1.5vw, 22px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.96)",
                textShadow: "0 3px 14px rgba(13,6,14,0.55)",
              }}
            >
              {hoveredIdx !== null
                ? HERO_COLUMNS[hoveredIdx].subtitle
                : "Your Opinion Matters!"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEFAULT_HERO_IMAGE = "/logo/hero-your-opinion.jpg";

// Per-column images + title/subtitle pairs exactly as the live WP site
// swaps them on hover. Images come from /public/hero/ (2024/03 uploads);
// titles/subtitles were scraped from live DOM.
const HERO_COLUMNS: Array<{
  label: string;
  href: string;
  image: string;
  title: string;
  subtitle: string;
}> = [
  {
    label: "Opinions",
    href: "/opinions",
    image: "/hero/city-talks-001.jpg",
    title: "City Talks.",
    subtitle: "Your Opinion Matters!",
  },
  {
    label: "Let's Talk",
    href: "/lets-talk",
    image: "/logo/hero-your-opinion.jpg",
    title: "City Talks.",
    subtitle: "Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!",
  },
  {
    label: "Podcasts",
    href: "/podcasts",
    image: "/hero/city-talks-03-podcast.jpg",
    title: "Podcast City Talks.",
    subtitle: "Ακολουθήστε τα Podcast του City Talks!",
  },
  {
    label: "Smart Cities",
    href: "/smart-cities",
    image: "/hero/city-talks-04-urban-smart-cities.jpg",
    title: "Smart Cities.",
    subtitle: "Έξυπνες πόλεις - Έξυπνες Ιδέες - Έξυπνοι Διάλογοι.",
  },
];

/**
 * Compact variant — used on /lets-talk and similar secondary pages.
 * Plain white background, H1 + intro paragraphs, no brick, no bubbles.
 */
function CompactHero({
  headline,
  intro,
}: {
  headline?: string;
  intro?: string[];
}) {
  return (
    <section
      aria-label={headline}
      className="relative w-full bg-[color:var(--ct-bg)]"
    >
      <div
        className="mx-auto flex flex-col gap-6 px-5 pb-8 pt-20 sm:px-8 sm:pt-28"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        {headline && (
          <h1
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
          >
            {headline}
          </h1>
        )}
        {intro && intro.length > 0 && (
          <div className="flex max-w-[760px] flex-col gap-4 text-[18px] leading-[1.7] text-[color:var(--ct-text)]">
            {intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

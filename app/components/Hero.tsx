
import Image from "next/image";

import { withBasePath } from "@/lib/basePath";

/**
 * Hero — has two visual modes:
 *
 *   (a) Homepage: authentic brick-wall-with-speech-bubbles image from the
 *       live WP site (`/logo/hero-your-opinion.jpg`), with "City Talks."
 *       headline + "Your Opinion Matters!" subtitle overlaid.
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
  if (props.compact) {
    return <CompactHero headline={props.headline} intro={props.intro} />;
  }

  return (
    <section
      aria-label="City Talks"
      className="ct-hero relative isolate w-full overflow-hidden"
    >
      <div
        className="relative mx-auto grid w-full grid-cols-1 overflow-hidden md:grid-cols-4"
        style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
      >
        {HERO_COLUMNS.map((col) => (
          <a
            key={col.href}
            href={col.href}
            aria-label={col.label}
            className="relative block overflow-hidden border-white/90 md:border-r md:last:border-r-0"
          >
            <Image
              src={withBasePath(col.image)}
              alt={col.label}
              fill
              priority
              sizes="(min-width: 900px) 25vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
            {/* Soft wash so the label reads on any photo */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            {/* Vertical section label at bottom */}
            <span
              className="absolute bottom-5 left-5 z-10"
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
          </a>
        ))}

        {/* Hero overlay: "City Talks." + "Your Opinion Matters!" in white,
            positioned top-left across the whole grid, on top of all columns. */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex"
          style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
        >
          <div
            className="w-full px-8 pt-20 sm:px-16 sm:pt-24 lg:px-24"
            style={{ maxWidth: "var(--ct-container)" }}
          >
            <h1
              className="ct-hero-headline font-[family-name:var(--ct-font-display)]"
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
              City Talks.
            </h1>
            <p
              className="mt-4 max-w-xl"
              style={{
                fontSize: "clamp(17px, 1.5vw, 22px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.96)",
                textShadow: "0 3px 14px rgba(13,6,14,0.55)",
              }}
            >
              Your Opinion Matters!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Per-column images downloaded from the live WP site (2024/03 uploads)
// and stored under /public/hero/.
const HERO_COLUMNS: Array<{ label: string; href: string; image: string }> = [
  {
    label: "Opinions",
    href: "/opinions",
    image: "/hero/city-talks-001.jpg",
  },
  {
    label: "Let's Talk",
    href: "/lets-talk",
    image: "/logo/hero-your-opinion.jpg",
  },
  {
    label: "Podcasts",
    href: "/podcasts",
    image: "/hero/city-talks-03-podcast.jpg",
  },
  {
    label: "Smart Cities",
    href: "/smart-cities",
    image: "/hero/city-talks-04-urban-smart-cities.jpg",
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

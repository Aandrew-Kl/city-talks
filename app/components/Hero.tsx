
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
        className="relative mx-auto w-full overflow-hidden"
        style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
      >
        {/* Authentic hero background — brick wall + speech-bubble cluster
            exported from the live WP site as one baked image. */}
        <Image
          src={withBasePath("/logo/hero-your-opinion.jpg")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Hero overlay: "City Talks." + "Your Opinion Matters!" in white.
            Sits above the bubbles image, mirroring the live-site layout. */}
        <div
          className="relative z-10 flex h-full w-full items-center"
          style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
        >
          <div
            className="mx-auto w-full px-8 sm:px-16 lg:px-24"
            style={{ maxWidth: "var(--ct-container)" }}
          >
            <h1
              className="ct-hero-headline font-[family-name:var(--ct-font-display)]"
              style={{
                fontSize: "clamp(64px, 10vw, 140px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                color: "#ffffff",
                textShadow:
                  "0 6px 24px rgba(13,6,14,0.55), 0 2px 6px rgba(13,6,14,0.4)",
              }}
            >
              City Talks.
            </h1>
            <p
              className="mt-6 max-w-xl"
              style={{
                fontSize: "clamp(18px, 1.6vw, 24px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.96)",
                textShadow: "0 3px 14px rgba(13,6,14,0.55)",
              }}
            >
              Your Opinion Matters!
            </p>
          </div>
        </div>

        {/* Bottom section labels — rotated vertical text like the live hero.
            Readable Greek ink on the painted-wall backdrop thanks to
            a soft white text-shadow. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 hidden items-end justify-between px-10 md:flex">
          {["— Opinions", "Let's Talk", "Podcasts", "Smart Cities"].map(
            (label) => (
              <span
                key={label}
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "lowercase",
                  color: "rgba(13,6,14,0.7)",
                  textShadow: "0 1px 2px rgba(255,255,255,0.7)",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

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

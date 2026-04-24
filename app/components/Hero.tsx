
/**
 * Hero — has two visual modes:
 *
 *   (a) Homepage: white-painted brick wall + giant CityTalks mic logo +
 *       animated multi-color speech-bubble cluster. Triggered with no props.
 *   (b) Secondary pages (`/lets-talk` etc.): compact headline + intro
 *       paragraphs on plain background. Triggered by `compact` prop.
 *
 * All animations are pure CSS (see globals.css). Each bubble gets a unique
 * duration / delay / tail rotation so the cluster drifts organically
 * instead of bobbing in lock-step.
 */

export interface HeroProps {
  /** Render the compact headline/intro variant (used on /lets-talk). */
  compact?: boolean;
  headline?: string;
  intro?: string[];
}

interface HeroBubble {
  top: string;
  left?: string;
  right?: string;
  w: number;
  h: number;
  color: string;
  delay: number;
  /** animation duration in seconds */
  dur: number;
  /** speech-bubble tail rotation in degrees */
  tail: number;
}

// Ordered back-to-front so later bubbles stack on top.
const BUBBLES: HeroBubble[] = [
  { top: "8%",  left: "6%",  w: 240, h: 220, color: "#1E88E5", delay: 0.0, dur: 15, tail: -30 },
  { top: "4%",  left: "22%", w: 340, h: 280, color: "#0F786D", delay: 0.8, dur: 17, tail: -18 },
  { top: "20%", left: "35%", w: 300, h: 260, color: "#1A237E", delay: 1.5, dur: 14, tail: -40 },
  { top: "34%", left: "24%", w: 260, h: 220, color: "#E91E63", delay: 2.2, dur: 18, tail: -12 },
  { top: "24%", left: "50%", w: 280, h: 240, color: "#E53935", delay: 2.8, dur: 16, tail: -26 },
  { top: "6%",  left: "60%", w: 360, h: 300, color: "#FDC14C", delay: 3.4, dur: 19, tail: -20 },
  { top: "40%", right: "8%", w: 220, h: 200, color: "#0FBBB4", delay: 4.0, dur: 13, tail: -34 },
];

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
        className="ct-brick-bg relative mx-auto w-full overflow-hidden"
        style={{ minHeight: "clamp(480px, 78vh, 760px)" }}
      >
        {/* Speech-bubble cluster — floats behind the central mic logo */}
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="ct-bubble"
            style={{
              top: b.top,
              left: b.left,
              right: b.right,
              width: `clamp(${Math.round(b.w * 0.5)}px, ${b.w / 12}vw, ${b.w}px)`,
              height: `clamp(${Math.round(b.h * 0.5)}px, ${b.h / 12}vw, ${b.h}px)`,
              background: b.color,
              // CSS custom properties consumed by .ct-bubble in globals.css
              ["--ct-bubble-delay" as string]: `${b.delay}s`,
              ["--ct-bubble-dur" as string]: `${b.dur}s`,
              ["--ct-bubble-tail" as string]: `${b.tail}deg`,
            }}
          />
        ))}

        {/* Soft edge vignette — pushes brick texture to the background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 40%, rgba(246,241,233,0.55) 85%)",
          }}
        />

        {/* Hero overlay: "City Talks." + "Your Opinion Matters!" in white.
            Mirrors the live-site hero typography. */}
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
                textShadow: "0 6px 24px rgba(13,6,14,0.55), 0 2px 6px rgba(13,6,14,0.4)",
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

        {/* Bottom vertical section labels — mirror the live hero.
            Live uses upright horizontal labels along the bottom inside the
            hero band, not rotated text. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden items-center justify-between px-12 pb-6 md:flex">
          {["— Opinions", "Let's Talk", "Podcasts", "Smart Cities"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(13,6,14,0.72)",
                textShadow: "0 1px 2px rgba(255,255,255,0.6)",
              }}
            >
              {label}
            </span>
          ))}
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

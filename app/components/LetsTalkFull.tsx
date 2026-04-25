import { Fragment } from "react";

import Reveal from "@/app/components/Reveal";
import { marqueeItems, principles, upcomingEpisodes } from "@/app/data";

/**
 * Full-width Let's Talk section with:
 *   - Filled + outlined stroke marquee rows
 *   - Countdown timer placeholder + #staytuned
 *   - Upcoming episode cards
 *   - "let's talk!" centered heading
 *   - 3 numbered principles
 *
 * Entirely server-rendered; marquee + fades are CSS. Countdown target is
 * set client-side via useCountdown() to avoid hydration drift — 0:0:0:0 by
 * default matches the live site (expired/evergreen display).
 */
export default function LetsTalkFull() {
  return (
    <section
      aria-labelledby="letstalk-full-heading"
      className="relative w-full overflow-hidden bg-[color:var(--ct-bg)] py-24"
    >
      <h2 id="letstalk-full-heading" className="sr-only">
        Let&apos;s Talk
      </h2>

      {/* Eyebrow label — mirrors live's "— LET'S TALK" above the marquee */}
      <div
        className="mx-auto px-5 pb-4 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <p
          className="inline-flex items-center gap-2"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ct-ink-2)",
          }}
        >
          — Let&apos;s Talk
        </p>
      </div>

      {/* Marquee row 1 — filled */}
      <div className="ct-marquee-wrap py-4">
        <div className="ct-marquee-track">
          {[...marqueeItems.row1, ...marqueeItems.row1].map((item, i) => (
            <span key={`r1-${i}`} className="ct-marquee-text">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — outlined stroke (SVG so Greek glyphs render with
          a single clean stroke, not the webkit-text-stroke double-edge). */}
      <div className="ct-marquee-wrap py-4">
        <div className="ct-marquee-track" data-reverse="true">
          {[...marqueeItems.row2, ...marqueeItems.row2].map((item, i) => (
            <OutlineMarqueeItem key={`r2-${i}`} text={item} />
          ))}
        </div>
      </div>

      {/* Countdown */}
      <div
        className="mx-auto px-5 pt-20 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <Reveal className="flex flex-col items-center gap-10">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-secondary)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-secondary)]" />
            #STAYTUNED
          </p>
          <div className="ct-countdown w-full" aria-label="Launch countdown: 0 days, 0 hours, 0 minutes, 0 seconds">
            {[
              { n: 0, label: "DAYS" },
              { n: 0, label: "HOURS" },
              { n: 0, label: "MINUTES" },
              { n: 0, label: "SECONDS" },
            ].map((item, i) => (
              <Fragment key={item.label}>
                <div className="ct-countdown-col">
                  <div className="ct-countdown-num">{item.n}</div>
                  <div className="ct-countdown-label">{item.label}</div>
                </div>
                {i < 3 && (
                  <span aria-hidden="true" className="ct-countdown-sep">
                    :
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>

        {/* Upcoming episodes */}
        <Reveal className="mt-16 flex flex-wrap justify-center gap-6">
          {upcomingEpisodes.map((ep) => (
            <div
              key={ep.date}
              className="flex flex-col items-start gap-2 rounded-[20px] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg)] px-7 py-5 shadow-[var(--ct-shadow-sm)]"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-text-muted)]">
                Coming Next
              </span>
              <span className="font-[family-name:var(--ct-font-display)] text-[20px] font-black tracking-tight text-[color:var(--ct-ink)]">
                {ep.date}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      {/* "let's talk!" heading */}
      <div
        className="mx-auto mt-24 px-5 text-center sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <Reveal>
          <h3
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            style={{
              fontSize: "clamp(64px, 11vw, 160px)",
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            let&apos;s talk!
          </h3>
        </Reveal>
      </div>

      {/* (See OutlineMarqueeItem at bottom of file) */}

      {/* Principles grid */}
      <div
        className="mx-auto mt-24 grid gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 120} className="relative flex flex-col gap-4">
            <span aria-hidden="true" className="ct-principle-num">{p.n}</span>
            <h3
              className="max-w-[340px] font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
              style={{
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              {p.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[color:var(--ct-text)]">
              {p.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/**
 * Single hollow-letter marquee item rendered as an SVG `<text>` with a
 * stroke attribute and `fill="none"`. SVG strokes follow the glyph's
 * outer contour exactly (one path per letter), so Greek characters like
 * θ, η, α stay readable instead of getting the double-edge artifacts
 * that `-webkit-text-stroke` produces on bold latin/Greek glyphs.
 *
 * The viewBox is sized lazily — we estimate a width based on character
 * count so the SVG occupies roughly the right horizontal slice in the
 * marquee track. The 1em letter-spacing inside SVG approximates what
 * the text node would naturally take.
 */
function OutlineMarqueeItem({ text }: { text: string }) {
  // Estimate visual width — Greek average advance ≈ 0.55em at this weight.
  const widthEm = Math.max(text.length * 0.58, 4);
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${widthEm * 100} 100`}
      style={{
        height: "1em",
        width: `${widthEm}em`,
        fontSize: "clamp(72px, 13vw, 180px)",
        padding: "0 0.4em",
        flex: "none",
        display: "block",
      }}
    >
      <text
        x="0"
        y="80"
        fill="none"
        stroke="var(--ct-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{
          fontFamily: "var(--ct-font-display)",
          fontSize: "100px",
          fontWeight: 500,
          letterSpacing: "-2px",
        }}
      >
        {text}
      </text>
    </svg>
  );
}

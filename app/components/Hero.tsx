import { siteMeta } from "@/app/data";

export interface HeroProps {
  /** Override the default homepage headline. Defaults to siteMeta.heroHeadline. */
  headline?: string;
  /** Override intro paragraphs. Defaults to siteMeta.heroIntro. */
  intro?: readonly string[];
  /**
   * Compact variant renders a shorter hero band — used by non-homepage pages
   * (e.g. /lets-talk, /podcasts) that want the same visual language but less weight.
   */
  compact?: boolean;
}

/**
 * Homepage hero. Centered white band with:
 *   H1 "Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!"
 *   + 2 paragraphs of intro copy
 *   + decorative teal + yellow particles (pure CSS, absolutely positioned).
 *
 * Server component — no interactivity needed.
 */
export default function Hero({
  headline = siteMeta.heroHeadline,
  intro = siteMeta.heroIntro,
  compact = false,
}: HeroProps) {
  return (
    <section
      className="ct-hero relative isolate w-full overflow-hidden bg-[color:var(--ct-bg)]"
      aria-labelledby="hero-heading"
      data-variant={compact ? "compact" : "default"}
    >
      {/* Decorative particles — teal + coral + yellow, scattered behind content */}
      <span aria-hidden="true" className="ct-hero-particle ct-hero-particle--teal" />
      <span aria-hidden="true" className="ct-hero-particle ct-hero-particle--yellow" />
      <span aria-hidden="true" className="ct-hero-particle ct-hero-particle--coral" />

      <div
        className="relative mx-auto flex flex-col items-center gap-6 px-5 text-center sm:px-8"
        style={{
          maxWidth: "var(--ct-container)",
          paddingTop: compact ? "72px" : "clamp(72px, 10vw, 140px)",
          paddingBottom: compact ? "48px" : "clamp(56px, 8vw, 96px)",
        }}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
          {siteMeta.greekTagline}
        </p>

        <h1
          id="hero-heading"
          className="mx-auto max-w-[960px] font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
        >
          {headline}
        </h1>

        {intro.length > 0 && (
          <div className="mx-auto flex max-w-[780px] flex-col gap-4 text-[17px] leading-[1.7] text-[color:var(--ct-text)]">
            {intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

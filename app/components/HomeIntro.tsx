import { siteMeta } from "@/app/data";
import IconBoxGrid from "@/app/components/IconBoxGrid";
import Reveal from "@/app/components/Reveal";

/**
 * Intro section directly under the brick-wall hero.
 * Shows:
 *   - Eyebrow pill
 *   - Big display headline "Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!"
 *   - Two intro paragraphs
 *   - 4-card IconBoxGrid (Opinions / Let's Talk / Podcasts / Smart Cities)
 */
export default function HomeIntro() {
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="relative w-full bg-[color:var(--ct-bg)]"
    >
      <div
        className="mx-auto flex flex-col gap-8 px-5 pt-16 pb-4 sm:px-8 sm:pt-24"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <Reveal className="flex max-w-[960px] flex-col gap-8">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]" />
            {siteMeta.greekTagline}
          </p>

          <h1
            id="home-intro-heading"
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            style={{
              fontSize: "clamp(36px, 6.5vw, 78px)",
              lineHeight: "1.04",
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
          >
            {siteMeta.heroHeadline}
          </h1>

          <div className="flex max-w-[780px] flex-col gap-5 text-[18px] leading-[1.7] text-[color:var(--ct-text)]">
            {siteMeta.heroIntro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>
      </div>

      <IconBoxGrid />
    </section>
  );
}

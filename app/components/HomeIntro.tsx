import { siteMeta } from "@/app/data";
import IconBoxGrid from "@/app/components/IconBoxGrid";
import Reveal from "@/app/components/Reveal";

/**
 * Intro section directly under the brick-wall hero.
 * Live keeps headline + body in column 1 only (left half) — no eyebrow pill.
 * The 4-card IconBoxGrid sits below in 4 columns spanning the full width.
 */
export default function HomeIntro() {
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="relative w-full bg-[color:var(--ct-bg)]"
    >
      <div
        className="mx-auto px-5 pt-16 pb-4 sm:px-8 sm:pt-24"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <Reveal className="flex max-w-[560px] flex-col gap-6">
          <h1
            id="home-intro-heading"
            className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            style={{
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: "1.1",
              letterSpacing: "-0.01em",
              fontWeight: 700,
            }}
          >
            {siteMeta.heroHeadline}
          </h1>

          <div className="flex flex-col gap-4 text-[15px] leading-[1.7] text-[color:var(--ct-text)]">
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

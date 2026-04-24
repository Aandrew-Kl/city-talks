import Image from "next/image";
import Link from "next/link";

import Reveal from "@/app/components/Reveal";
import { categories, type CategorySlug } from "@/app/data";
import { getAllArticleSummaries } from "@/lib/articles";

export interface AlternatingArticlesProps {
  limit?: number;
}

function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label.toUpperCase() ?? slug;
}

/**
 * Articles section rendered as alternating left/right big blocks — matches
 * the live WP layout. Each row has: featured image in rounded rectangle,
 * green author pill, decorative circle + dotted pattern, and on the opposite
 * side: category eyebrow, huge title, excerpt, "Διαβάστε Περισσότερα" CTA.
 */
export default async function AlternatingArticles({
  limit = 6,
}: AlternatingArticlesProps) {
  const all = await getAllArticleSummaries();
  const articles = all.slice(0, limit);
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="articles-heading"
      className="relative w-full bg-[color:var(--ct-bg)]"
    >
      {/* Section eyebrow + heading */}
      <div
        className="mx-auto flex flex-col gap-6 px-5 pt-20 pb-8 sm:px-8 sm:pt-28"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        <Reveal className="relative">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.4px] text-[color:var(--ct-secondary)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-secondary)]" />
            CITY TALKS
          </p>
          <h2
            id="articles-heading"
            className="mt-4 max-w-[720px] font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
          >
            Ας μιλήσουμε για τους Δήμους
          </h2>
          <p className="mt-6 max-w-[600px] font-semibold text-[17px] text-[color:var(--ct-ink-2)]">
            Ο λόγος σε ανθρώπους με{" "}
            <span className="text-[color:var(--ct-primary)]">
              αποδεδειγμένη γνώση στη διοίκηση δήμων
            </span>
          </p>
          <p className="mt-4 max-w-[600px] text-[15px] leading-[1.7] text-[color:var(--ct-text)]">
            Πολλά θέματα της καθημερινότητας και της ποιότητας ζωής μας σχετίζονται
            με το Δήμο στον οποίο κατοικούμε ή δουλεύουμε.
          </p>
          {/* Big decorative outline circle */}
          <span
            aria-hidden="true"
            className="ct-decor-circle"
            style={{
              right: "5%",
              top: "-10%",
              width: "clamp(260px, 38vw, 440px)",
              height: "clamp(260px, 38vw, 440px)",
            }}
          />
        </Reveal>
      </div>

      {/* Alternating article blocks */}
      <div
        className="mx-auto px-5 sm:px-8"
        style={{ maxWidth: "var(--ct-container)" }}
      >
        {articles.map((a, idx) => {
          const flip = idx % 2 === 1;
          const href = `/articles/${a.slug}`;
          const accentColor =
            a.category === "smart-cities"
              ? "var(--ct-secondary)"
              : "var(--ct-accent)";
          return (
            <Reveal
              key={a.slug}
              className="ct-article-row"
              as="article"
              delay={Math.min(idx * 80, 240)}
              data-flip={flip ? "true" : "false"}
            >
              <div className="ct-article-row-media">
                {/* Dotted decoration — mimics live shape-1.svg */}
                <span
                  aria-hidden="true"
                  className="ct-decor-dots"
                  style={{
                    top: flip ? "auto" : "-36px",
                    bottom: flip ? "-36px" : "auto",
                    left: flip ? "auto" : "-44px",
                    right: flip ? "-44px" : "auto",
                  }}
                />
                <Link
                  href={href}
                  aria-label={a.title}
                  className="relative block h-full w-full overflow-hidden rounded-[28px] bg-[color:var(--ct-bg-alt)] shadow-[var(--ct-shadow-md)]"
                >
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 900px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    priority={idx < 2}
                  />
                </Link>
                <span className="ct-author-pill">{a.author}</span>
                {/* Decorative dashed ring around the image */}
                <span
                  aria-hidden="true"
                  className="ct-decor-circle"
                  style={{
                    width: "108%",
                    height: "108%",
                    top: "-4%",
                    left: "-4%",
                    opacity: 0.5,
                  }}
                />
                {/* Slow-rotating double ellipse — matches live shape-2.svg */}
                <span
                  aria-hidden="true"
                  className="ct-decor-ring"
                  style={{
                    width: "94%",
                    height: "94%",
                    top: "3%",
                    left: "3%",
                    opacity: 0.45,
                  }}
                >
                  <svg viewBox="0 0 310 322" fill="none" aria-hidden="true">
                    <g stroke="#f3e3ee" strokeMiterlimit="10">
                      <path d="m246.72 56.07c24.35 18.93 38.88 49.2 49.53 80.74 10.65 31.48 17.47 64.3 10.23 94.74s-28.59 58.57-56.35 73.85c-27.81 15.28-62.03 17.71-94.27 15.1-32.18-2.66-62.45-10.42-87.27-26.68-24.88-16.2-44.32-40.8-56.1-69.45-11.84-28.59-15.97-61.12-7.48-90.69s29.6-56.2 56.58-74.37c26.92-18.17 59.58-27.84 93.08-28.88 33.44-.99 67.65 6.65 92.06 25.64z" />
                      <path d="m63.27 295.83c-24.35-18.93-38.88-49.2-49.53-80.73-10.65-31.49-17.47-64.3-10.23-94.74s28.59-58.57 56.35-73.85c27.81-15.28 62.03-17.71 94.27-15.1 32.18 2.66 62.45 10.42 87.27 26.68 24.88 16.2 44.32 40.8 56.1 69.45 11.84 28.59 15.97 61.12 7.48 90.69s-29.6 56.2-56.58 74.37c-26.92 18.17-59.58 27.84-93.08 28.88-33.44.99-67.65-6.65-92.06-25.64z" />
                    </g>
                  </svg>
                </span>
              </div>

              <div className="ct-article-row-body flex flex-col gap-5">
                <p
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.4px]"
                  style={{ color: accentColor }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: accentColor }}
                  />
                  {categoryLabel(a.category)}
                </p>
                <h3
                  className="font-[family-name:var(--ct-font-display)] text-[color:var(--ct-ink)]"
                  style={{
                    fontSize: "clamp(32px, 5vw, 64px)",
                    lineHeight: 1.05,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  <Link href={href} className="hover:text-[color:var(--ct-primary)]">
                    {a.title}
                  </Link>
                </h3>
                <p className="max-w-[500px] text-[15px] leading-[1.7] text-[color:var(--ct-text)]">
                  {a.excerpt}
                </p>
                <Link
                  href={href}
                  className="group mt-2 inline-flex items-center gap-3 text-[15px] font-semibold text-[color:var(--ct-primary)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--ct-primary)]/30 text-[color:var(--ct-primary)] transition-colors group-hover:bg-[color:var(--ct-primary)] group-hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0" />
                      <path d="M12 17v4" />
                      <path d="M8 21h8" />
                    </svg>
                  </span>
                  <span className="border-b border-[color:var(--ct-primary)]/30 pb-0.5 transition-colors group-hover:border-[color:var(--ct-primary)]">
                    Διαβάστε Περισσότερα
                  </span>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

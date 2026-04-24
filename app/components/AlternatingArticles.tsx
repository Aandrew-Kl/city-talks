import ArticleHoverRow from "@/app/components/ArticleHoverRow";
import Reveal from "@/app/components/Reveal";
import { categories, type CategorySlug } from "@/app/data";
import { AUTHOR_PORTRAITS, FEATURED_IMAGES } from "@/lib/articleAssets";
import { getAllArticleSummaries } from "@/lib/articles";

export interface AlternatingArticlesProps {
  limit?: number;
}

// Eyebrow label inside article rows — live shows 'LOCAL ADMINISTRATION'
// for opinions-slug pieces and 'SMART CITIES' for smart-cities-slug.
function categoryLabel(slug: CategorySlug): string {
  if (slug === "opinions") return "LOCAL ADMINISTRATION";
  if (slug === "smart-cities") return "SMART CITIES";
  // Fall back to the data-driven label so unknown slugs still render.
  return categories.find((c) => c.slug === slug)?.label.toUpperCase() ?? slug;
}

/**
 * Articles section rendered as alternating left/right big blocks — matches
 * the live WP layout. Each row has: featured image in rounded rectangle,
 * green author pill, decorative circle + dotted pattern, and on the opposite
 * side: category eyebrow, huge title, excerpt, "Διαβάστε Περισσότερα" CTA.
 */
// Live city-talks.gr home shows exactly these 6 featured articles in this
// order. We hard-code the list so the homepage is always deterministic and
// doesn't surface editorial/WP-admin articles that happen to be newer.
const HOMEPAGE_SLUGS = [
  "diaxeirisi-nerou",
  "poleodomia-kai-dimoi",
  "eksypnoi-dimoi-psifiaki-dimosia-ygeia",
  "to-leksilogio-enos-aftodioikitikoy",
  "telos-stin-tafi-aporrimmatwn",
  "proslipseis-mono-sta-xartia",
];

export default async function AlternatingArticles({
  limit = 6,
}: AlternatingArticlesProps) {
  const all = await getAllArticleSummaries();
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const articles = HOMEPAGE_SLUGS
    .map((s) => bySlug.get(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, limit);
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
              delay={Math.min(idx * 80, 240)}
            >
              <ArticleHoverRow
                flip={flip}
                href={href}
                categoryLabel={categoryLabel(a.category)}
                accentColor={accentColor}
                title={a.title}
                excerpt={a.excerpt}
                author={a.author}
                featuredImage={FEATURED_IMAGES[a.slug] ?? a.image}
                authorPortrait={AUTHOR_PORTRAITS[a.author]}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

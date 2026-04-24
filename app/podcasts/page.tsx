import type { Metadata } from "next";

import DecorShape from "@/app/components/DecorShape";
import LetsTalk from "@/app/components/LetsTalk";
import Newsletter from "@/app/components/Newsletter";
import { siteMeta } from "@/app/data";

export const metadata: Metadata = {
  title: `Podcasts — ${siteMeta.name}`,
  description:
    "Ηχογραφημένοι διάλογοι και μονόλογοι με έμφαση στα θέματα της Τοπικής Αυτοδιοίκησης. Σύντομα κοντά σας.",
  alternates: { canonical: "/podcasts" },
  openGraph: {
    title: `Podcasts — ${siteMeta.name}`,
    description:
      "Ηχογραφημένοι διάλογοι και μονόλογοι με έμφαση στα θέματα της Τοπικής Αυτοδιοίκησης.",
    url: `${siteMeta.url}/podcasts`,
    type: "website",
  },
};

/** Placeholder upcoming-episode topics — teases what's coming without
 * promising a specific drop date. Keeps the page looking populated instead
 * of a bare "coming soon" banner. */
const UPCOMING_TOPICS: readonly {
  number: string;
  title: string;
  summary: string;
  color: string;
}[] = [
  {
    number: "01",
    title: "Η καθημερινότητα ενός Δημάρχου",
    summary:
      "Συζητάμε με αιρετούς για το τι πραγματικά σημαίνει διοίκηση Δήμου στην Ελλάδα του σήμερα.",
    color: "var(--ct-primary)",
  },
  {
    number: "02",
    title: "Έξυπνες Πόλεις, ρεαλιστικά",
    summary:
      "Ποιες τεχνολογίες δουλεύουν, πού χρειάζεται πολιτική θέληση, και πώς μετρούν οι πόλεις την πρόοδο.",
    color: "var(--ct-secondary)",
  },
  {
    number: "03",
    title: "Χρηματοδοτήσεις & αναπτυξιακά",
    summary:
      "Πώς ένας Δήμος διεκδικεί και αξιοποιεί ευρωπαϊκούς πόρους. Πρακτικές, παγίδες και case studies.",
    color: "var(--ct-accent)",
  },
];

/**
 * /podcasts — "coming soon" listing.
 *
 * WP had zero real podcast episodes; this route ships as an upcoming-episodes
 * teaser so the IA feels complete. Listeners can subscribe to the newsletter
 * to be notified when episodes drop.
 */
export default function PodcastsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="ct-podcasts-hero relative isolate w-full overflow-hidden bg-[color:var(--ct-bg)] py-20 sm:py-24"
        aria-labelledby="podcasts-hero-heading"
      >
        <DecorShape
          variant="ring"
          className="left-[6%] top-[16%] hidden md:block"
          color="var(--ct-secondary-light)"
          size={110}
        />
        <DecorShape
          variant="circle"
          className="right-[8%] top-[20%] hidden md:block"
          color="var(--ct-accent)"
          size={80}
        />
        <DecorShape
          variant="dots"
          className="bottom-[12%] left-[12%] hidden lg:block"
          color="var(--ct-primary)"
          size={110}
        />

        <div
          className="relative mx-auto flex flex-col items-center gap-5 px-5 text-center sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-text-subtle)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent)] animate-pulse"
            />
            Σύντομα κοντά σας
          </p>

          <h1
            id="podcasts-hero-heading"
            className="mx-auto max-w-[860px] font-[family-name:var(--ct-font-display)] text-[clamp(44px,8vw,80px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[color:var(--ct-ink)]"
          >
            Podcasts
          </h1>

          <p className="max-w-[640px] text-[17px] leading-[1.7] text-[color:var(--ct-text)]">
            Ηχογραφημένοι διάλογοι και μονόλογοι με έμφαση στα θέματα της
            Τοπικής Αυτοδιοίκησης. Συνομιλίες με αιρετούς, στελέχη και
            εμπειρογνώμονες — δομημένα, χωρίς φλυαρίες.
          </p>
        </div>
      </section>

      {/* Upcoming episodes */}
      <section
        aria-labelledby="upcoming-heading"
        className="ct-upcoming w-full bg-[color:var(--ct-bg-alt)] py-16 sm:py-20"
      >
        <div
          className="mx-auto flex flex-col gap-10 px-5 sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <header className="flex flex-col items-start gap-3">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.6px] text-[color:var(--ct-primary)]">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-primary)]"
              />
              Τι ετοιμάζουμε
            </p>
            <h2
              id="upcoming-heading"
              className="font-[family-name:var(--ct-font-display)] text-[clamp(30px,4.5vw,50px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-ink)]"
            >
              Τρεις θεματικές για να ξεκινήσουμε.
            </h2>
            <p className="max-w-[640px] text-[16px] leading-[1.65] text-[color:var(--ct-text)]">
              Αυτή είναι η αρχική μας λίστα — θα εξελιχθεί καθώς προκύπτουν
              ερωτήματα και αναγνώστες ζητούν νέα θέματα.
            </p>
          </header>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {UPCOMING_TOPICS.map((topic) => (
              <li key={topic.number}>
                <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[var(--ct-radius-md)] bg-[color:var(--ct-bg)] p-7 shadow-[var(--ct-shadow-sm)] transition-shadow hover:shadow-[var(--ct-shadow-md)]">
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 transition-opacity group-hover:opacity-20"
                    style={{ background: topic.color }}
                  />
                  <p
                    className="font-[family-name:var(--ct-font-display)] text-[40px] font-black leading-none tracking-tight"
                    style={{ color: topic.color }}
                  >
                    {topic.number}
                  </p>
                  <h3 className="text-[20px] font-black leading-[1.25] tracking-tight text-[color:var(--ct-ink)]">
                    {topic.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[color:var(--ct-text)]">
                    {topic.summary}
                  </p>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-[var(--ct-radius-pill)] border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                    >
                      <circle cx="5" cy="5" r="4" />
                    </svg>
                    Upcoming
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter notify */}
      <section
        aria-labelledby="podcast-notify"
        className="w-full bg-[color:var(--ct-bg)] py-16 sm:py-20"
      >
        <div
          className="mx-auto flex flex-col items-center gap-6 px-5 text-center sm:px-8"
          style={{ maxWidth: "780px" }}
        >
          <h2
            id="podcast-notify"
            className="font-[family-name:var(--ct-font-display)] text-[clamp(28px,4vw,40px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-ink)]"
          >
            Θέλετε να μάθετε πρώτοι;
          </h2>
          <p className="max-w-[580px] text-[16px] leading-[1.7] text-[color:var(--ct-text)]">
            Αφήστε μας το email σας και θα σας ειδοποιήσουμε μόλις ανεβάσουμε
            το πρώτο επεισόδιο.
          </p>
          <div className="w-full">
            <Newsletter
              heading="Μείνετε ενημερωμένοι."
              description="Κανένα spam — μόνο ενημερώσεις για νέα επεισόδια και άρθρα."
              submitLabel="Εγγραφή"
            />
          </div>
        </div>
      </section>

      <LetsTalk
        heading="Έχετε ιδέα για επεισόδιο;"
        description="Ψάχνουμε συνομιλητές και θέματα. Αν θέλετε να προτείνετε κάτι ή να συμμετάσχετε σε επεισόδιο, στείλτε μας μήνυμα."
        ctaLabel="Send a message"
        ctaHref="/lets-talk#contact"
      />
    </>
  );
}

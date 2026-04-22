import type { Metadata } from "next";

import Hero from "@/app/components/Hero";
import Newsletter from "@/app/components/Newsletter";
import LetsTalk from "@/app/components/LetsTalk";
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

/**
 * /podcasts — placeholder page.
 *
 * WP had zero real podcast episodes; this route ships as a "coming soon" with
 * a <Newsletter /> capture so we can notify listeners once episodes drop.
 */
export default function PodcastsPage() {
  return (
    <>
      <Hero
        compact
        headline="Podcasts"
        intro={[
          "Ηχογραφημένοι διάλογοι και μονόλογοι με έμφαση στα θέματα της Τοπικής Αυτοδιοίκησης.",
        ]}
      />

      <section
        aria-labelledby="podcasts-coming-soon"
        className="relative w-full bg-[color:var(--ct-bg)] py-16 sm:py-20 lg:py-24"
      >
        <div
          className="mx-auto flex flex-col items-center gap-8 px-5 text-center sm:px-8"
          style={{ maxWidth: "780px" }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ct-border)] bg-[color:var(--ct-bg-alt)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] text-[color:var(--ct-text-subtle)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--ct-accent)]" />
            Σύντομα κοντά σας
          </p>

          <h2
            id="podcasts-coming-soon"
            className="font-[family-name:var(--ct-font-display)] text-[clamp(32px,5vw,50px)] font-medium leading-[1.05] tracking-tight text-[color:var(--ct-ink)]"
          >
            Ετοιμάζουμε τα πρώτα επεισόδια.
          </h2>

          <p className="max-w-[640px] text-[17px] leading-[1.7] text-[color:var(--ct-text)]">
            Συνομιλίες με αιρετούς, στελέχη και εμπειρογνώμονες. Δομημένοι
            διάλογοι για τη διοίκηση δήμων, τις έξυπνες πόλεις και τις
            προκλήσεις της Τοπικής Αυτοδιοίκησης στην Ελλάδα.
          </p>

          <div className="w-full">
            <Newsletter
              heading="Μείνετε ενημερωμένοι."
              description="Αφήστε μας το email σας και θα σας ειδοποιήσουμε όταν ξεκινήσουμε."
              submitLabel="Εγγραφή"
            />
          </div>
        </div>
      </section>

      <LetsTalk
        heading="Έχετε ιδέα για επεισόδιο;"
        description="Ψάχνουμε συνομιλητές και θέματα. Αν θέλετε να προτείνετε κάτι ή να συμμετάσχετε σε επεισόδιο, στείλτε μας μήνυμα."
        ctaLabel="Send a message"
        ctaHref="/lets-talk"
      />
    </>
  );
}

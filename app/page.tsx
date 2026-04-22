import Articles from "@/app/components/Articles";
import Hero from "@/app/components/Hero";
import IconBoxGrid from "@/app/components/IconBoxGrid";
import LetsTalk from "@/app/components/LetsTalk";
import Newsletter from "@/app/components/Newsletter";

/**
 * City Talks homepage.
 *
 * Section order (matches WP home):
 *   1. Hero
 *   2. 4-card IconBoxGrid IA row (Opinions / Let's Talk / Podcasts / Smart Cities)
 *   3. Featured articles (Agent B — imports <Articles limit={6} /> once it lands)
 *   4. Lets Talk partnership CTA (Agent C)
 *   5. Footer (in layout.tsx)
 *
 * Agent A owns 1 + 2 + the shell; Agents B/C drop their components into the
 * marked slots in follow-up commits.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IconBoxGrid />

      <Articles limit={6} />


      <LetsTalk />

      <section
        aria-label="Newsletter signup"
        className="relative w-full bg-[color:var(--ct-bg)] pb-20 sm:pb-24"
      >
        <div
          className="mx-auto px-5 sm:px-8"
          style={{ maxWidth: "var(--ct-container)" }}
        >
          <Newsletter
            heading="Μείνετε ενημερωμένοι."
            description="Εγγραφείτε στο newsletter μας για νέα άρθρα, επεισόδια και ειδήσεις από τον κόσμο των Δήμων."
          />
        </div>
      </section>
    </>
  );
}

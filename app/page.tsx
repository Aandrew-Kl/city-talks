import AlternatingArticles from "@/app/components/AlternatingArticles";
import BrickLogoBanner from "@/app/components/BrickLogoBanner";
import Hero from "@/app/components/Hero";
import HomeIntro from "@/app/components/HomeIntro";
import LetsTalkFull from "@/app/components/LetsTalkFull";
import Newsletter from "@/app/components/Newsletter";

/**
 * City Talks homepage — structure matches https://city-talks.gr exactly:
 *   1. Brick hero with mic logo + animated speech bubbles
 *   2. Intro (headline + 2 paragraphs + 4-card IconBoxGrid)
 *   3. Articles eyebrow + 6 alternating L/R blocks
 *   4. Let's Talk: marquee(×2) + countdown + episodes + "let's talk!" + principles
 *   5. Brick banner with mic logo (repeat)
 *   6. Newsletter strip
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <AlternatingArticles limit={6} />
      <LetsTalkFull />
      <BrickLogoBanner />

      <section
        aria-label="Newsletter signup"
        className="relative w-full bg-[color:var(--ct-bg)] py-20"
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

import AlternatingArticles from "@/app/components/AlternatingArticles";
import BrickLogoBanner from "@/app/components/BrickLogoBanner";
import Hero from "@/app/components/Hero";
import HomeIntro from "@/app/components/HomeIntro";
import LetsTalkFull from "@/app/components/LetsTalkFull";

/**
 * City Talks homepage — structure matches https://city-talks.gr exactly:
 *   1. Brick hero with "City Talks." headline + animated speech bubbles
 *   2. Intro (headline + 2 paragraphs + 4-card IconBoxGrid)
 *   3. Articles eyebrow + 6 alternating L/R blocks
 *   4. Let's Talk: marquee(×2) + countdown + episodes + "let's talk!" + principles
 *   5. Brick banner with mic logo (repeat) → purple footer follows
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <AlternatingArticles limit={6} />
      <LetsTalkFull />
      <BrickLogoBanner />
    </>
  );
}

import type { Metadata } from "next";

import CategoryListing from "@/app/components/CategoryListing";
import LetsTalk from "@/app/components/LetsTalk";
import { categories, siteMeta } from "@/app/data";
import { getArticleSummariesByCategorySlug } from "@/lib/articles";

const CATEGORY = categories.find((c) => c.slug === "opinions")!;

export const metadata: Metadata = {
  title: `${CATEGORY.label} | ${CATEGORY.greek}`,
  description: CATEGORY.description,
  alternates: { canonical: `${siteMeta.url}/opinions` },
  openGraph: {
    type: "website",
    url: `${siteMeta.url}/opinions`,
    title: `${CATEGORY.label} — City Talks`,
    description: CATEGORY.description,
  },
};

/**
 * `/opinions` — category landing for posts tagged `opinions`.
 * Per WP mapping, this bucket merges local-administration, politics,
 * programs, city-talks, and uncategorized.
 *
 * Shares the `<CategoryListing>` shell with `/smart-cities` for layout
 * parity; the only axis of difference is the category metadata passed in.
 */
export default async function OpinionsPage() {
  const articles = await getArticleSummariesByCategorySlug("opinions");

  return (
    <>
      <CategoryListing category={CATEGORY} articles={articles} />
      <LetsTalk
        heading="Έχετε άποψη να μοιραστείτε;"
        description="Φιλοξενούμε απόψεις με έμφαση στη διοίκηση των Δήμων. Αν έχετε γνώση και εμπειρία — είστε ευπρόσδεκτοι να γράψετε μαζί μας."
        ctaLabel="Send a message"
        ctaHref="/lets-talk#contact"
      />
    </>
  );
}

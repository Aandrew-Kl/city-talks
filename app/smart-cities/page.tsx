import type { Metadata } from "next";

import CategoryListing from "@/app/components/CategoryListing";
import LetsTalk from "@/app/components/LetsTalk";
import { categories, siteMeta } from "@/app/data";
import { getArticleSummariesByCategorySlug } from "@/lib/articles";

const CATEGORY = categories.find((c) => c.slug === "smart-cities")!;

export const metadata: Metadata = {
  title: `${CATEGORY.label} | ${CATEGORY.greek}`,
  description: CATEGORY.description,
  alternates: { canonical: `${siteMeta.url}/smart-cities` },
  openGraph: {
    type: "website",
    url: `${siteMeta.url}/smart-cities`,
    title: `${CATEGORY.label} — City Talks`,
    description: CATEGORY.description,
  },
};

/**
 * `/smart-cities` — category landing for posts tagged `smart-cities`.
 * Shares the `<CategoryListing>` shell with `/opinions` for layout parity.
 */
export default async function SmartCitiesPage() {
  const articles = await getArticleSummariesByCategorySlug("smart-cities");

  return (
    <>
      <CategoryListing category={CATEGORY} articles={articles} />
      <LetsTalk
        heading="Έχετε μια ιδέα για έξυπνες πόλεις;"
        description="Ψάχνουμε συνεργάτες και θέματα που κινούνται μπροστά — τεχνολογία, βιωσιμότητα, πολιτικές. Γράψτε μας."
        ctaLabel="Send a message"
        ctaHref="/lets-talk#contact"
      />
    </>
  );
}

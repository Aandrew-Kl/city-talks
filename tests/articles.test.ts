import { describe, it, expect } from "vitest";

import {
  formatGreekDate,
  getAllArticleSlugs,
  getAllArticleSummaries,
  getArticleBySlug,
  getArticleSummariesByCategorySlug,
} from "@/lib/articles";

describe("getAllArticleSlugs", () => {
  it("returns 12 unique strings", () => {
    const slugs = getAllArticleSlugs();
    expect(slugs).toHaveLength(12);
    expect(slugs.every((s) => typeof s === "string")).toBe(true);
    expect(new Set(slugs).size).toBe(12);
  });
});

describe("getAllArticleSummaries", () => {
  it("returns 12 items sorted by date descending", async () => {
    const summaries = await getAllArticleSummaries();
    expect(summaries).toHaveLength(12);
    for (let i = 1; i < summaries.length; i += 1) {
      const prev = summaries[i - 1].date;
      const curr = summaries[i].date;
      expect(prev >= curr).toBe(true);
    }
  });
});

describe("getArticleBySlug", () => {
  it("returns the harmonia article with expected fields", async () => {
    const article = await getArticleBySlug("harmonia");
    expect(article).not.toBeNull();
    expect(article?.title).toContain("HARMONIA");
    expect(article?.category).toBe("smart-cities");
    expect(article?.image.startsWith("/article-images/")).toBe(true);
  });

  it("returns null for unknown slug", async () => {
    const article = await getArticleBySlug("does-not-exist");
    expect(article).toBeNull();
  });
});

describe("getArticleSummariesByCategorySlug", () => {
  it("returns 8 opinions", async () => {
    const summaries = await getArticleSummariesByCategorySlug("opinions");
    expect(summaries).toHaveLength(8);
  });

  it("returns 4 smart-cities", async () => {
    const summaries = await getArticleSummariesByCategorySlug("smart-cities");
    expect(summaries).toHaveLength(4);
  });
});

describe("formatGreekDate", () => {
  it("formats 2025-12-10 with Greek month and year", () => {
    const formatted = formatGreekDate("2025-12-10");
    expect(formatted).toContain("Δεκεμβρίου");
    expect(formatted).toContain("2025");
  });
});

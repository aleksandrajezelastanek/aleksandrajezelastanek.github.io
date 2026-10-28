import { describe, expect, it } from "vitest";
import type { Publication, Reviewable } from "@/data/types";
import {
  getFeaturedPublications,
  getPublications,
  getResearchAreas,
  isPublishable,
  publicationUrl,
  publishable,
  sortPublications,
  t,
} from "@/lib/content";
import { reviewQueue, validateContent } from "../../scripts/content-rules";

const item = (status: Reviewable["review"]["status"]): Reviewable => ({ review: { status } });

describe("publication gate", () => {
  it("always publishes verified items", () => {
    expect(isPublishable(item("verified"), false)).toBe(true);
    expect(isPublishable(item("verified"), true)).toBe(true);
  });

  it("shows requiresReview only in preview builds", () => {
    expect(isPublishable(item("requiresReview"), false)).toBe(false);
    expect(isPublishable(item("requiresReview"), true)).toBe(true);
  });

  it("never publishes drafts", () => {
    expect(isPublishable(item("draft"), true)).toBe(false);
    expect(publishable([item("draft"), item("verified")], true)).toHaveLength(1);
  });
});

describe("localisation", () => {
  it("falls back to Polish when English is missing", () => {
    expect(t({ pl: "Pulmogenetyka" }, "en")).toBe("Pulmogenetyka");
    expect(t({ pl: "Pulmogenetyka", en: "Pulmogenetics" }, "en")).toBe("Pulmogenetics");
    expect(t({ pl: "Pulmogenetyka", en: "Pulmogenetics" }, "pl")).toBe("Pulmogenetyka");
  });
});

describe("publications", () => {
  const base: Omit<Publication, "id" | "title" | "year"> = {
    authors: ["A"],
    venue: "V",
    type: "article",
    categories: ["rareDiseases"],
    review: { status: "verified" },
  };

  it("sorts newest first, then by date", () => {
    const list = [
      { ...base, id: "a", title: "A", year: 2020 },
      { ...base, id: "b", title: "B", year: 2024, date: "2024-01-01" },
      { ...base, id: "c", title: "C", year: 2024, date: "2024-06-01" },
    ] satisfies Publication[];
    expect(sortPublications(list).map((p) => p.id)).toEqual(["c", "b", "a"]);
  });

  it("links DOI first, then PubMed", () => {
    expect(publicationUrl({ ...base, id: "x", title: "x", year: 2020, doi: "10.1/x", pmid: "123456" })).toBe("https://doi.org/10.1/x");
    expect(publicationUrl({ ...base, id: "x", title: "x", year: 2020, pmid: "123456" })).toBe("https://pubmed.ncbi.nlm.nih.gov/123456/");
  });

  it("renders only verified publications, each with a persistent identifier", () => {
    const pubs = getPublications();
    expect(pubs.length).toBeGreaterThan(0);
    for (const p of pubs) {
      expect(p.review.status).toBe("verified");
      expect(p.doi ?? p.pmid ?? p.isbn).toBeTruthy();
    }
  });

  it("features at most six publications on the homepage", () => {
    expect(getFeaturedPublications().length).toBeLessThanOrEqual(6);
  });
});

describe("research areas", () => {
  it("give pulmogenetics the featured position", () => {
    const featured = getResearchAreas().find((a) => a.featured);
    expect(featured?.slug).toBe("pulmogenetyka");
  });
});

describe("content rules", () => {
  it("report no errors for the current data", () => {
    const errors = validateContent().filter((f) => f.level === "error");
    expect(errors).toEqual([]);
  });

  it("list unverified items in the review queue", () => {
    for (const entry of reviewQueue()) expect(entry.status).not.toBe("verified");
  });
});

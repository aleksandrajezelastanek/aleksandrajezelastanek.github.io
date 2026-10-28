import { afterEach, describe, expect, it, vi } from "vitest";
import { getPublications } from "@/lib/content";
import { personJsonLd, scholarlyArticleJsonLd, serializeJsonLd } from "@/lib/seo";
import { GET as robots } from "@/app/robots.txt/route";
import { GET as llms } from "@/app/llms.txt/route";
import { crawlerGroups } from "@/lib/crawlers";

describe("structured data", () => {
  it("describes the professor with verified profiles only", () => {
    const person = personJsonLd("pl");
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Aleksandra Jezela-Stanek");
    expect(person.honorificPrefix).toBe("Prof. dr hab. n. med.");
    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        "https://scholar.google.com/citations?user=u0pbC3AAAAAJ&hl=pl",
        "https://pubmed.ncbi.nlm.nih.gov/?term=Jezela-Stanek+A",
      ]),
    );
    expect(person.knowsAbout).toEqual(expect.arrayContaining(["Pulmogenetics", "Rare diseases", "Clinical genetics"]));
    // No fabricated awards, ratings or alma mater.
    expect(person).not.toHaveProperty("award");
    expect(person).not.toHaveProperty("aggregateRating");
    expect(person).not.toHaveProperty("alumniOf");
  });

  it("emits ScholarlyArticle with DOI and PMID identifiers", () => {
    const article = scholarlyArticleJsonLd(getPublications()[0]);
    expect(article["@type"]).toBe("ScholarlyArticle");
    expect(JSON.stringify(article.identifier)).toMatch(/"DOI"/);
  });

  it("escapes < in serialised JSON-LD", () => {
    expect(serializeJsonLd({ a: "</script>" })).not.toContain("</script>");
  });
});

describe("robots.txt", () => {
  it("allows every documented crawler", async () => {
    const text = await robots().text();
    for (const agent of crawlerGroups.flatMap((g) => g.agents)) {
      expect(text).toContain(`User-agent: ${agent}\nAllow: /`);
    }
    expect(text).not.toMatch(/Disallow/);
  });

  describe("Sitemap line", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
      vi.resetModules();
    });

    async function robotsWith(siteUrl: string) {
      vi.resetModules();
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", siteUrl);
      vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
      const { GET } = await import("@/app/robots.txt/route");
      return GET().text();
    }

    it("is omitted when no production origin is configured", async () => {
      const text = await robotsWith("");
      expect(text).not.toContain("Sitemap:");
      expect(text).not.toContain("YOUR_PRODUCTION_DOMAIN");
    });

    it("uses the configured origin", async () => {
      expect(await robotsWith("https://jezela-stanek.example")).toContain("Sitemap: https://jezela-stanek.example/sitemap.xml");
    });
  });
});

describe("llms.txt", () => {
  it("lists sections and scholarly profiles", async () => {
    const text = await llms().text();
    expect(text).toMatch(/^# Prof\. dr hab\. n\. med\. Aleksandra Jezela-Stanek/);
    expect(text).toContain("## Main sections");
    expect(text).toContain("https://scholar.google.com/citations?user=u0pbC3AAAAAJ");
  });
});

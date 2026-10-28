/**
 * Verifies the static export in ./out. Run after a production build, e.g.:
 *   NEXT_PUBLIC_SITE_URL=https://example.org npm run build && npm run test:build
 * Set EXPECT_SITE_URL to the origin used for the build (default: the
 * NEXT_PUBLIC_SITE_URL of this process).
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const OUT = join(import.meta.dirname, "..", "..", "out");
const SITE = (process.env.EXPECT_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const read = (p: string) => readFileSync(join(OUT, p), "utf8");

function htmlFiles(dir = OUT): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name.startsWith("_") ? [] : htmlFiles(full);
    return name.endsWith(".html") ? [relative(OUT, full)] : [];
  });
}

const PAGES = [
  "index.html",
  "o-mnie/index.html",
  "zakres-dzialalnosci/index.html",
  "nauka-i-projekty/index.html",
  "nauka-i-projekty/pulmogenetyka/index.html",
  "nauka-i-projekty/choroby-rzadkie/index.html",
  "nauka-i-projekty/onkogenetyka/index.html",
  "nauka-i-projekty/farmakogenetyka/index.html",
  "nauka-i-projekty/diagnostyka-molekularna/index.html",
  "publikacje/index.html",
  "wspolpraca-i-kontakt/index.html",
  "polityka-prywatnosci/index.html",
];

describe.skipIf(!existsSync(OUT))("static export", () => {
  it("contains every public page and a 404 page", () => {
    for (const page of PAGES) expect(existsSync(join(OUT, page)), page).toBe(true);
    expect(existsSync(join(OUT, "404.html"))).toBe(true);
  });

  it("does not ship English pages unless enabled", () => {
    if (process.env.NEXT_PUBLIC_ENABLE_EN !== "1") expect(existsSync(join(OUT, "en"))).toBe(false);
  });

  describe("robots.txt", () => {
    const robots = () => read("robots.txt");
    it("allows search engines and AI crawlers", () => {
      for (const agent of [
        "*",
        "GPTBot",
        "OAI-SearchBot",
        "ChatGPT-User",
        "ClaudeBot",
        "Claude-SearchBot",
        "Claude-User",
        "Googlebot",
        "Google-Extended",
        "PerplexityBot",
        "Perplexity-User",
        "Bingbot",
        "CCBot",
      ]) {
        expect(robots()).toContain(`User-agent: ${agent}\nAllow: /`);
      }
      expect(robots()).not.toMatch(/Disallow:\s*\//);
    });
    it("points to the sitemap on the configured domain", () => {
      if (!SITE) return;
      expect(robots()).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    });
  });

  it("sitemap lists every canonical page with absolute URLs", () => {
    const xml = read("sitemap.xml");
    expect(xml).toMatch(/^<\?xml/);
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs.length).toBe(PAGES.length);
    for (const loc of locs) expect(loc).toMatch(/^https?:\/\/.+\/$/);
    if (SITE) expect(locs).toContain(`${SITE}/nauka-i-projekty/pulmogenetyka/`);
    expect(xml).not.toContain("lastmod");
  });

  it("llms.txt exists and links to the scholarly profiles", () => {
    const txt = read("llms.txt");
    expect(txt).toContain("# Prof. dr hab. n. med. Aleksandra Jezela-Stanek");
    expect(txt).toContain("https://pubmed.ncbi.nlm.nih.gov/?term=Jezela-Stanek+A");
  });

  describe.each(PAGES)("%s", (page) => {
    const html = () => read(page);

    it("is Polish, indexable and has unique metadata", () => {
      expect(html()).toMatch(/<html lang="pl"/);
      expect(html()).not.toMatch(/<meta name="robots" content="[^"]*noindex/);
      expect(html()).toMatch(/<title>[^<]+<\/title>/);
      expect(html()).toMatch(/<meta name="description" content="[^"]{50,}"/);
      expect(html()).toMatch(/<meta property="og:image" content="[^"]+\/og\.png"/);
      if (SITE) expect(html()).toMatch(new RegExp(`<link rel="canonical" href="${SITE.replace(/[.]/g, "\\.")}/[^"]*"`));
    });

    it("has exactly one h1 and a main landmark", () => {
      expect(html().match(/<h1[\s>]/g)?.length).toBe(1);
      expect(html()).toContain('<main id="main"');
    });

    it("has valid JSON-LD", () => {
      const blocks = [...html().matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
      expect(blocks.length).toBeGreaterThan(0);
      for (const block of blocks) expect(() => JSON.parse(block)).not.toThrow();
    });

    it("opens external links safely", () => {
      for (const [tag] of html().matchAll(/<a [^>]*target="_blank"[^>]*>/g)) {
        expect(tag).toContain('rel="noopener noreferrer"');
      }
    });
  });

  it("titles are unique across pages", () => {
    const titles = PAGES.map((p) => read(p).match(/<title>([^<]+)<\/title>/)?.[1]);
    expect(new Set(titles).size).toBe(PAGES.length);
  });

  it("renders scientific content into the HTML (no JavaScript needed)", () => {
    const home = read("index.html");
    expect(home).toContain("Aleksandra");
    expect(home).toContain("Genetyka w diagnostyce, profilaktyce i leczeniu");
    expect(home).toContain("Pulmogenetyka");
    expect(home).toContain("https://scholar.google.com/citations?user=u0pbC3AAAAAJ&amp;hl=pl");
    expect(home).toContain("https://pubmed.ncbi.nlm.nih.gov/?term=Jezela-Stanek+A");
    expect(home).toContain("mailto:badania@fundacja-p4p.com");
    const pulmo = read("nauka-i-projekty/pulmogenetyka/index.html");
    expect(pulmo).toContain("SERPINA1");
    expect(pulmo).toContain("10.3390/ijms262411846");
    expect(read("publikacje/index.html")).toContain('"@type":"ScholarlyArticle"');
  });

  it("publishes the privacy notice and links to it from every page", () => {
    const privacy = read("polityka-prywatnosci/index.html");
    expect(privacy).toContain("nie używa plików cookie");
    expect(privacy).toContain("art. 13");
    expect(privacy).toContain("Prezesa Urzędu Ochrony Danych Osobowych");
    for (const page of PAGES) expect(read(page), page).toContain('href="/polityka-prywatnosci/"');
  });

  it("collects no data: no forms, file inputs or third-party scripts", () => {
    for (const page of htmlFiles()) {
      const html = read(page);
      expect(html, page).not.toMatch(/<form[\s>]/);
      expect(html, page).not.toMatch(/type="file"/);
      for (const [, src] of html.matchAll(/<script[^>]+src="([^"]+)"/g)) {
        expect(src, page).not.toMatch(/^https?:\/\//);
      }
      expect(html, page).not.toMatch(/fonts\.googleapis|googletagmanager|google-analytics/);
    }
  });

  it("publishes no placeholders or unverified items", () => {
    for (const page of htmlFiles()) {
      const html = read(page);
      expect(html, page).not.toMatch(/YOUR_PRODUCTION_DOMAIN|lorem ipsum|\bTODO\b/i);
      expect(html, page).not.toContain("Do weryfikacji");
      // The ORCID-derived timeline (2001–2017) is still awaiting review.
      expect(html, page).not.toContain("2001–2017");
      expect(html, page).not.toContain("Przebieg pracy");
    }
    if (SITE && !SITE.includes("localhost")) {
      for (const file of ["robots.txt", "sitemap.xml", "llms.txt"]) expect(read(file), file).not.toContain("localhost");
    }
  });
});

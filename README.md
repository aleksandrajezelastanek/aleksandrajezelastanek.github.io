# Prof. Aleksandra Jezela-Stanek — academic website

Personal academic website of **Prof. dr hab. n. med. Aleksandra Jezela-Stanek**: clinical geneticist and medical researcher. It presents research areas (with pulmogenetics as the lead area), professional scope, a curated bibliography, scientific collaborations and email contact.

It is a content-first static site. There is no backend, database, form, upload or tracking: every page is pre-rendered HTML that any static host can serve.

---

## Contents

- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Architecture](#architecture)
- [Content model and verification](#content-model-and-verification)
- [Common edits](#common-edits) — portrait, publications, research projects, partner logos
- [Localisation (PL / EN)](#localisation-pl--en)
- [SEO, structured data and AI crawlers](#seo-structured-data-and-ai-crawlers)
- [Deployment](#deployment) — GitHub Pages, Vercel, custom domain
- [Quality checks](#quality-checks)
- [Privacy and security](#privacy-and-security)

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), static export (`output: "export"`) |
| Language | TypeScript, strict mode |
| Styling | Tailwind CSS 4 with design tokens in `src/styles/globals.css` |
| Fonts | Cormorant Garamond (headings) and Source Sans 3 (text), self-hosted by `next/font` with Polish glyphs (`latin-ext`) |
| Icons | `lucide-react`, used sparingly |
| Graphics | Original SVG compositions generated at build time (`src/components/graphics/svg-builders.ts`) |
| Tests | Vitest (unit, component, post-build checks of `./out`) |

Runtime dependencies: `next`, `react`, `react-dom` and `lucide-react`. Nothing else.

## Quick start

Requires Node.js ≥ 22.18.

```bash
npm install
npm run dev             # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run dev:preview` | Development server that also shows content marked `requiresReview` |
| `npm run dev:en` | Development server with the English routes enabled |
| `npm run build` | Static export into `./out` |
| `npm run serve` | Serve `./out` like a static host (gzip, 404 page, base path) on port 4173 |
| `npm run typecheck` / `npm run lint` | TypeScript and ESLint |
| `npm run check:content` | Validate `src/data` and print the review queue |
| `npm test` | Unit and component tests |
| `npm run test:build` | Checks against the built `./out` (robots, sitemap, metadata, JSON-LD…) |
| `npm run verify` | Everything above, in order |
| `npm run format` | Prettier |

## Architecture

```
src/
  app/
    (pl)/                     Polish routes; root layout with <html lang="pl">
      page.tsx                /
      o-mnie/                 /o-mnie/
      zakres-dzialalnosci/    /zakres-dzialalnosci/
      nauka-i-projekty/       /nauka-i-projekty/  and  /nauka-i-projekty/[slug]/
      publikacje/             /publikacje/
      wspolpraca-i-kontakt/   /wspolpraca-i-kontakt/
    (en)/                     English routes (*.en.tsx), built only when enabled
    robots.txt/route.ts       /robots.txt   (static)
    sitemap.ts                /sitemap.xml  (static)
    llms.txt/route.ts         /llms.txt     (static)
    graphics/[file]/route.ts  /graphics/*.svg, the decorative graphics
    global-not-found.tsx      404 page
  components/
    layout/      Header, MobileNav, Footer, PageHeader, RootDocument
    sections/    Homepage sections (Hero, ScientificIntro, FeaturedResearch, …)
    pages/       Page bodies shared by both languages
    research/    Research and project cards
    publications/  Bibliography entry, profile links, filters
    graphics/    SVG builders and the <Graphic> image component
    ui/          Small primitives (Container, Section, buttons, links)
  content/       UI copy per language (pl/ui.ts, en/ui.ts)
  data/          Typed content records: profile, research, publications, partners, expertise
  lib/           Content queries, routes, SEO helpers, site settings
scripts/         Content checks, static server, OG image generator
tests/           unit/ and build/ test suites
```

Key decisions:

- **Static export everywhere.** The same `./out` folder deploys to GitHub Pages, Vercel or any CDN. Dynamic routes use `generateStaticParams` with `dynamicParams = false`.
- **Text lives outside the components.** Paragraphs, labels and facts sit in `src/data` and `src/content`, so content changes rarely touch React code.
- **Server Components by default.** Only five small client components exist: the mobile menu, the active nav link, the language switcher, the publication filter and the copy-email button. All primary content is in the HTML without JavaScript.
- **Decorative graphics are cached images.** They are generated once per build as `/graphics/<name>-<tone>.svg` and embedded with `<img alt="">`. This keeps the HTML small (≈25 KB gzipped for the homepage) and lazy-loads graphics below the fold.
- **Motion is CSS-only and optional.** Entrances use scroll-driven animations inside `@media (prefers-reduced-motion: no-preference)` and `@supports`. With reduced motion, or where unsupported, everything is simply visible.
- **Two root layouts.** `(pl)` and `(en)` each render the correct `<html lang>`. A single `global-not-found.tsx` serves the 404 page.

## Content model and verification

Every record that states a fact has a `review` block:

```ts
review: { status: "verified" | "requiresReview" | "draft", source?: string, checkedAt?: string, note?: string }
```

| Status | Production build | Preview build (`NEXT_PUBLIC_CONTENT_PREVIEW=1`) |
| --- | --- | --- |
| `verified` | shown | shown |
| `requiresReview` | **hidden** | shown with a "Do weryfikacji" badge |
| `draft` | hidden | hidden |

Sections with nothing to show are not rendered at all, so no empty headings or placeholders appear.

`npm run check:content` validates the data and lists the review queue. It checks for duplicate ids, malformed DOIs and PMIDs, unknown categories, missing logo files or permissions, placeholder text, and (when English is enabled) missing translations. Before every publication, go through the [content verification checklist](docs/CONTENT-REVIEW.md).

## Common edits

### Replace the portrait

1. Put the authorised photograph in `public/images/`, e.g. `public/images/portrait.jpg`. Recommended: 4:5 ratio, at least 1200 × 1500 px, JPEG or WebP under 300 KB.
2. In `src/data/profile.ts` set:
   ```ts
   export const portrait: Portrait = {
     src: "/images/portrait.jpg",
     width: 1200,
     height: 1500,
     alt: { pl: "Prof. Aleksandra Jezela-Stanek", en: "Prof. Aleksandra Jezela-Stanek" },
   };
   ```
   While `src` is `null`, the hero shows an abstract composition. Never use a generated likeness.

### Add a publication

Edit `src/data/publications.ts`. Copy metadata from PubMed, doi.org or the publisher rather than typing it from memory:

```ts
{
  id: "pmid:12345678",                 // or "doi:10.xxxx/…" / "isbn:…"
  title: "Exact title as published.",
  authors: ["Kowalski J", "Jezela-Stanek A"],
  year: 2026,
  date: "2026-05-14",                  // optional, ISO
  venue: "Journal Name",
  volume: "12", issue: "3", pages: "101–110",
  doi: "10.xxxx/xxxxx",
  pmid: "12345678",
  type: "article",                     // article | review | caseReport | monograph | chapter | expert | preprint
  categories: ["pulmogenetics"],       // pulmogenetics | rareDiseases | oncogenetics | pharmacogenetics | molecularDiagnostics
  featured: true,                      // optional: show on the homepage (newest 6)
  review: { status: "verified", source: "PubMed", checkedAt: "2026-05-20" },
}
```

For long author lists, give the first three authors, set `authorCount` and, if the professor is the last author, `lastAuthor: "Jezela-Stanek A"`.

Monographs and chapters (`type: "monograph" | "chapter"`) get their own section on `/publikacje/` automatically once at least one is verified. There is an example record in the file header.

### Add a research project

Research **areas** (fields of interest) and research **projects** (confirmed, concrete undertakings) are separate on purpose. Add projects to `researchProjects` in `src/data/research.ts`; a commented template is in the file. Fill in only confirmed facts. Optional fields (objective, institutions, role, funding, years, publications) are left out of the page when absent. Projects appear on the homepage, on `/nauka-i-projekty/` and on the related area page.

### Add or change a research area

Edit `researchAreas` in `src/data/research.ts`. Each area gets a page at `/nauka-i-projekty/<slug>/` with its body text, topics, graphic and the publications whose `categories` match `publicationCategories`. `featured: true` gives the large card on the homepage (currently pulmogenetics).

### Partner logos

Partners are listed typographically by default. Add a logo only after the organisation has agreed:

1. Put the file in `public/logos/` (SVG preferred).
2. In `src/data/partners.ts`, set `logo: { src: "/logos/name.svg", width: 160, height: 40, permission: "Agreed by … on 2026-…" }`.

`check:content` fails if the file is missing or no permission is recorded. Logos render small and in greyscale so the site stays independently branded.

### Contact address and texts

- Email: `contact.email` in `src/data/profile.ts`.
- Biography: `biography.short` (homepage) and `biography.long` (`/o-mnie/`) in the same file.
- Section texts and labels: `src/content/pl/ui.ts`.

### Social sharing image

`public/og.png` (1200 × 630) is generated from the site's fonts. After changing the name or title, run:

```bash
npm run build && python3 scripts/generate-og.py
```

This needs Pillow (`pip install pillow`).

## Localisation (PL / EN)

Polish is primary and served from the root (`/o-mnie/`). English lives under `/en/` (`/en/about/`, `/en/research/…`).

- Localised data fields are `{ pl: string; en?: string }`. UI copy is in `src/content/{pl,en}/ui.ts`; the English dictionary is type-checked against the Polish one.
- English route files are named `*.en.tsx`. `next.config.ts` treats them as routes **only** when `NEXT_PUBLIC_ENABLE_EN=1`. Until then, no English page, sitemap entry or hreflang link is generated.
- The English texts in the repository are **drafts for review**. Specialist terminology must be approved by the professor before English is enabled.
- With English enabled, `check:content` fails on any missing translation. Pages get `hreflang` alternates (`pl`, `en`, `x-default`), the sitemap lists both languages, and a language switcher appears in the header.

To enable English, set `NEXT_PUBLIC_ENABLE_EN=1` (the `ENABLE_EN` repository variable on GitHub, or an environment variable on Vercel).

## SEO, structured data and AI crawlers

- **Metadata.** Each page has a unique title and description, a canonical URL, Open Graph tags and an OG image (`buildMetadata` in `src/lib/seo.ts`). Domain-dependent values come from `NEXT_PUBLIC_SITE_URL`; nothing is hard-coded.
- **JSON-LD.**
  - `Person` on the homepage and `/o-mnie/`: name, honorific prefix, job title, current affiliation, `knowsAbout`, and `sameAs` links to Google Scholar, PubMed and ORCID.
  - `WebSite` on the homepage.
  - `BreadcrumbList` on subpages.
  - `ScholarlyArticle` on `/publikacje/`, verified records only.

  Nothing else is claimed: no `alumniOf` (education not yet confirmed), awards, ratings or citation counts.
- **`/sitemap.xml`** lists all public, canonical pages. There is no `lastmod`, because reliable per-page dates do not exist and invented ones would mislead.
- **`/robots.txt`** allows everything. It names each crawler from the brief explicitly, with tokens checked against official documentation on 2026-10-23: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI); `ClaudeBot`, `Claude-SearchBot`, `Claude-User` (Anthropic); `Googlebot`, `Google-Extended`; `PerplexityBot`, `Perplexity-User`; `Bingbot`; `CCBot` (Common Crawl). The list lives in `src/lib/crawlers.ts`; change `Allow` to `Disallow` there to restrict one later. The `Sitemap:` line is written only when a real origin is configured, so no placeholder domain is ever published.
- **`/llms.txt`** is an experimental Markdown guide for language models, built from published content only. Not every provider reads it.
- **Crawlable content.** All research, biography and publication text is in the static HTML. `npm run test:build` checks this.

> **robots.txt on GitHub project sites.** Crawlers only read `robots.txt` at the root of a host. On `https://<user>.github.io/<repo>/` the file sits at `/<repo>/robots.txt` and is ignored, so the default "allow all" applies. The explicit policy takes effect with a custom domain or a `<user>.github.io` user site.

## Deployment

The build reads three environment variables (see `.env.example`):

| Variable | Meaning |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://jezela-stanek.pl`. **Required for production.** |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for GitHub project pages, e.g. `/jezela-stanek`. Empty otherwise. |
| `NEXT_PUBLIC_ENABLE_EN` | `1` publishes the English version. |

### GitHub Pages

No purchased domain is needed: the site works at `https://<user>.github.io/<repo>/`.

1. Push the repository to GitHub (default branch `main`).
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually). `.github/workflows/deploy-pages.yml` then:
   - runs the type check, lint, content check and tests;
   - builds with the correct base path and site URL (taken automatically from `actions/configure-pages`);
   - verifies `./out`;
   - publishes it.

`public/.nojekyll` makes sure the `_next/` folder is served.

### Vercel

1. Import the repository in Vercel; the framework is detected as Next.js.
2. Optional: set `NEXT_PUBLIC_SITE_URL` to the production domain. Without it, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used automatically.
3. Leave `NEXT_PUBLIC_BASE_PATH` empty.

Vercel serves the static export directly; no serverless functions are created.

### Custom domain

- **GitHub Pages:** add the domain under Settings → Pages → Custom domain, and create the DNS records GitHub shows (`CNAME` to `<user>.github.io` for a subdomain, or the `A`/`AAAA` records for an apex domain). Set the repository variable `SITE_URL=https://your-domain`; the workflow then builds without a base path. Enable "Enforce HTTPS".
- **Vercel:** add the domain under Project → Settings → Domains, follow the DNS instructions, and set `NEXT_PUBLIC_SITE_URL`.

After switching domains, confirm `https://your-domain/robots.txt` and `/sitemap.xml` show the new origin, and submit the sitemap in Google Search Console and Bing Webmaster Tools.

### Local check of a production build

```bash
NEXT_PUBLIC_SITE_URL=https://example.org npm run build
NEXT_PUBLIC_SITE_URL=https://example.org npm run test:build
npm run serve       # http://localhost:4173
```

## Quality checks

`npm run verify` runs everything below.

- **Unit tests** (`tests/unit`):
  - publication gate, localisation fallback, sorting and links;
  - route mapping;
  - structured data contents;
  - robots.txt and llms.txt output;
  - mobile menu accessibility: `aria-expanded`, focus moving into the panel, Escape closing it and restoring focus, scroll lock, `aria-current`.
- **Build tests** (`tests/build`):
  - every page exists and is indexable with `lang="pl"`;
  - unique titles, meta descriptions, canonical URLs, OG image;
  - exactly one `h1` and a `main` landmark per page;
  - valid JSON-LD;
  - safe external links;
  - all crawler groups present in robots.txt; sitemap completeness;
  - scientific text present in the HTML;
  - no forms, file inputs or third-party scripts;
  - no placeholder or unverified content.
- **Lighthouse** (static build, 2026-10-23):

  | | Performance | Accessibility | Best practices | SEO |
  | --- | --- | --- | --- | --- |
  | Mobile | 90–91 | 100 | 100 | 100 |
  | Desktop | 100 | 100 | 100 | 100 |

## Privacy and security

- No cookies, analytics, tracking pixels, chat widgets or external embeds. Fonts are served from the site itself.
- No forms, uploads or accounts. Contact is a `mailto:` link, with an explicit notice not to send medical records by ordinary email.
- External links open with `rel="noopener noreferrer"`.
- `/polityka-prywatnosci/` holds the privacy notice and the GDPR (RODO) Art. 13 clause for email contact. Its text lives in `src/data/privacy.ts` and is linked from the footer and the contact section. It states that the site stores no cookies or visitor data, and that GitHub Pages logs visitor IP addresses for security (per GitHub's documentation). **Update it first** if you move hosting (e.g. to Vercel) or add analytics, embeds or forms. The named data controller (the professor) still needs confirmation; it may be the People4People Foundation if the Foundation administers the mailbox.

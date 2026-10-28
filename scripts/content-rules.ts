/**
 * Content validation rules — shared by `npm run check:content` and the test
 * suite. Imports use relative paths with .ts extensions so the file also runs
 * directly under Node's TypeScript support.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { affiliations, identity, portrait, scholarlyProfiles, timeline, biography } from "../src/data/profile.ts";
import { publications } from "../src/data/publications.ts";
import { researchAreas, researchProjects } from "../src/data/research.ts";
import { partners } from "../src/data/partners.ts";
import { expertise, expertiseNotice } from "../src/data/expertise.ts";
import { gdprClause, privacyChanges, privacyLead, privacySections } from "../src/data/privacy.ts";
import type { L10n, PublicationCategory, Reviewable } from "../src/data/types.ts";

export interface Finding {
  level: "error" | "warning";
  where: string;
  message: string;
}

const ROOT = join(import.meta.dirname, "..");
const STATUSES = new Set(["verified", "requiresReview", "draft"]);
const CATEGORIES = new Set<PublicationCategory>([
  "pulmogenetics",
  "rareDiseases",
  "oncogenetics",
  "pharmacogenetics",
  "molecularDiagnostics",
]);
/** Text that must never reach a page. */
const PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX|lorem ipsum)\b|YOUR_PRODUCTION_DOMAIN|\{\{|\}\}/i;

function isL10n(value: unknown): value is L10n {
  return typeof value === "object" && value !== null && "pl" in value && typeof (value as L10n).pl === "string";
}

/** Walk any record and yield every localised text with its path. */
function* texts(value: unknown, path: string): Generator<[string, L10n]> {
  if (isL10n(value)) {
    yield [path, value];
    return;
  }
  if (Array.isArray(value)) {
    for (const [i, v] of value.entries()) yield* texts(v, `${path}[${i}]`);
  } else if (typeof value === "object" && value !== null) {
    for (const [k, v] of Object.entries(value)) {
      if (k === "review") continue;
      yield* texts(v, `${path}.${k}`);
    }
  }
}

export function validateContent({ requireEnglish = false } = {}): Finding[] {
  const findings: Finding[] = [];
  const error = (where: string, message: string) => findings.push({ level: "error", where, message });
  const warn = (where: string, message: string) => findings.push({ level: "warning", where, message });

  const reviewables: [string, Reviewable[]][] = [
    ["profile.scholarlyProfiles", scholarlyProfiles],
    ["profile.affiliations", affiliations],
    ["profile.timeline", timeline],
    ["research.researchAreas", researchAreas],
    ["research.researchProjects", researchProjects],
    ["publications", publications],
    ["partners", partners],
    ["expertise", expertise],
  ];

  for (const [name, list] of reviewables) {
    list.forEach((item, i) => {
      if (!item.review || !STATUSES.has(item.review.status)) error(`${name}[${i}]`, "missing or invalid review.status");
      if (item.review?.status === "verified" && !item.review.source) warn(`${name}[${i}]`, "verified item without review.source");
    });
  }

  // Unique identifiers
  const unique = (name: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) error(name, `duplicate id "${id}"`);
      seen.add(id);
    }
  };
  unique(
    "publications",
    publications.map((p) => p.id),
  );
  unique(
    "research.researchAreas",
    researchAreas.map((a) => a.slug),
  );
  unique(
    "research.researchProjects",
    researchProjects.map((p) => p.slug),
  );
  unique(
    "partners",
    partners.map((p) => p.id),
  );
  unique(
    "expertise",
    expertise.map((e) => e.id),
  );

  // Research areas
  const areaSlugs = new Set(researchAreas.map((a) => a.slug));
  researchAreas.forEach((a) => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) error(`research/${a.slug}`, "slug must be lowercase ASCII with hyphens");
    a.publicationCategories.forEach((c) => CATEGORIES.has(c) || error(`research/${a.slug}`, `unknown category ${c}`));
    if (a.body.length === 0) error(`research/${a.slug}`, "body is empty");
  });
  if (!researchAreas.some((a) => a.featured && a.review.status === "verified")) warn("research", "no verified featured area");
  researchProjects.forEach((p) => {
    if (!areaSlugs.has(p.area)) error(`project/${p.slug}`, `unknown area "${p.area}"`);
    if (p.startYear && p.endYear && p.endYear < p.startYear) error(`project/${p.slug}`, "endYear before startYear");
    p.publicationIds?.forEach((id) => publications.some((x) => x.id === id) || error(`project/${p.slug}`, `unknown publication ${id}`));
  });

  // Publications
  const thisYear = new Date().getFullYear();
  publications.forEach((p) => {
    const where = `publication ${p.id}`;
    if (!p.title.trim()) error(where, "missing title");
    if (p.authors.length === 0) error(where, "missing authors");
    if (!p.venue.trim()) error(where, "missing journal/publisher");
    if (p.year < 1950 || p.year > thisYear + 1) error(where, `implausible year ${p.year}`);
    if (p.doi && !/^10\.\d{4,9}\/\S+$/.test(p.doi)) error(where, `malformed DOI ${p.doi}`);
    if (p.pmid && !/^\d{5,9}$/.test(p.pmid)) error(where, `malformed PMID ${p.pmid}`);
    if (p.id.startsWith("pmid:") && p.pmid !== p.id.slice(5)) error(where, "id does not match pmid");
    if (!p.doi && !p.pmid && !p.isbn && !p.url) warn(where, "no persistent identifier or URL");
    if (p.authorCount !== undefined && p.authorCount < p.authors.length) error(where, "authorCount smaller than listed authors");
    if (p.categories.length === 0) error(where, "no research category");
    p.categories.forEach((c) => CATEGORIES.has(c) || error(where, `unknown category ${c}`));
  });
  const featured = publications.filter((p) => p.featured && p.review.status === "verified");
  if (featured.length > 6) warn("publications", `${featured.length} featured publications — the homepage shows the newest 6`);

  // Partners
  partners.forEach((p) => {
    if (p.logo) {
      if (!p.logo.permission.trim()) error(`partner ${p.id}`, "logo without recorded permission");
      if (!existsSync(join(ROOT, "public", p.logo.src))) error(`partner ${p.id}`, `logo file missing: public${p.logo.src}`);
    }
    if (p.url && !p.url.startsWith("https://")) warn(`partner ${p.id}`, "URL is not https");
  });

  // Portrait
  if (portrait.src && !existsSync(join(ROOT, "public", portrait.src))) error("portrait", `file missing: public${portrait.src}`);
  if (!portrait.src) warn("portrait", "no authorised portrait yet — the hero shows an abstract composition");

  // Placeholder text and English coverage across all localised strings
  const sources: [string, unknown][] = [
    ["identity", identity],
    ["biography", biography],
    ["affiliations", affiliations],
    ["scholarlyProfiles", scholarlyProfiles],
    ["researchAreas", researchAreas],
    ["researchProjects", researchProjects],
    ["partners", partners],
    ["expertise", expertise],
    ["expertiseNotice", expertiseNotice],
    ["privacy", { privacyLead, privacySections, gdprClause, privacyChanges }],
  ];
  for (const [name, value] of sources) {
    for (const [path, text] of texts(value, name)) {
      if (!text.pl.trim()) error(path, "empty Polish text");
      if (PLACEHOLDER.test(text.pl) || (text.en && PLACEHOLDER.test(text.en))) error(path, "placeholder text");
      if (requireEnglish && !text.en?.trim()) error(path, "missing English translation (English version is enabled)");
    }
  }
  for (const p of publications) if (PLACEHOLDER.test(p.title)) error(`publication ${p.id}`, "placeholder title");

  return findings;
}

/** Items waiting for sign-off — printed as a review queue. */
export function reviewQueue(): { where: string; status: string; note?: string }[] {
  const all: [string, (Reviewable & Record<string, unknown>)[]][] = [
    ["profile", [...scholarlyProfiles, ...affiliations, ...timeline] as never],
    ["research", [...researchAreas, ...researchProjects] as never],
    ["publications", publications as never],
    ["partners", partners as never],
    ["expertise", expertise as never],
  ];
  return all.flatMap(([group, list]) =>
    list
      .filter((item) => item.review.status !== "verified")
      .map((item) => ({
        where: `${group}: ${String(item.id ?? item.slug ?? (item.title as L10n | undefined)?.pl ?? (item.name as L10n | undefined)?.pl ?? "?")}`,
        status: item.review.status,
        note: item.review.note,
      })),
  );
}

import type { L10n, Locale, Publication, PublicationCategory, Reviewable } from "@/data/types";
import { publications } from "@/data/publications";
import { researchAreas, researchProjects } from "@/data/research";
import { contentPreview } from "./site";

/**
 * Publication gate. `verified` always renders; `requiresReview` renders only
 * in preview builds; `draft` never renders.
 */
export function isPublishable(item: Reviewable, preview: boolean = contentPreview): boolean {
  if (item.review.status === "verified") return true;
  if (item.review.status === "requiresReview") return preview;
  return false;
}

export function publishable<T extends Reviewable>(items: readonly T[], preview: boolean = contentPreview): T[] {
  return items.filter((item) => isPublishable(item, preview));
}

/** Resolve localised text. English falls back to Polish (see check-content). */
export function t(text: L10n, locale: Locale): string {
  return (locale === "en" ? text.en : undefined) ?? text.pl;
}

/* ───── Queries used by pages ───── */

export function getResearchAreas() {
  return publishable(researchAreas);
}

export function getResearchArea(slug: string) {
  return getResearchAreas().find((area) => area.slug === slug);
}

export function getResearchProjects(area?: string) {
  const projects = publishable(researchProjects);
  return area ? projects.filter((project) => project.area === area) : projects;
}

/** Newest first; ties broken by date, then title. */
export function sortPublications(list: readonly Publication[]): Publication[] {
  return [...list].sort((a, b) => b.year - a.year || (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
}

export function getPublications() {
  return sortPublications(publishable(publications));
}

export function getFeaturedPublications(limit = 6) {
  return getPublications()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getPublicationsByCategory(categories: PublicationCategory[]) {
  return getPublications().filter((p) => p.categories.some((c) => categories.includes(c)));
}

export function getPublicationsByIds(ids: string[]) {
  const all = getPublications();
  return ids.map((id) => all.find((p) => p.id === id)).filter((p): p is Publication => Boolean(p));
}

export function publicationUrl(p: Publication): string | undefined {
  if (p.doi) return `https://doi.org/${p.doi}`;
  if (p.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`;
  return p.url;
}

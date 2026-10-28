/**
 * Typed content model for the whole site.
 *
 * Every record that states a fact carries a `review` block. Only records with
 * `status: "verified"` are rendered in a normal build; `requiresReview` items
 * appear only in content-preview builds (NEXT_PUBLIC_CONTENT_PREVIEW=1) with a
 * visible badge, and `draft` items never render. See src/lib/content.ts.
 */

export type Locale = "pl" | "en";

/**
 * Localised text. Polish is required; English is optional and is only used
 * when the English version of the site is enabled and approved.
 */
export interface L10n {
  pl: string;
  en?: string;
}

export type ReviewStatus = "verified" | "requiresReview" | "draft";

export interface Review {
  status: ReviewStatus;
  /** Where the fact comes from: "Prof. (brief)", "PubMed", "ORCID"… */
  source?: string;
  /** ISO date of the last check against the source. */
  checkedAt?: string;
  /** Internal note for editors — never rendered. */
  note?: string;
}

export interface Reviewable {
  review: Review;
}

/* ───────────────────────────── Profile ───────────────────────────── */

export type AffiliationKind = "current" | "collaboration" | "previous";

export interface Affiliation extends Reviewable {
  id: string;
  name: L10n;
  /** Unit within the institution, when confirmed. */
  unit?: L10n;
  city: L10n;
  kind: AffiliationKind;
  url?: string;
  /** Only confirmed years. Leave undefined rather than guessing. */
  from?: number;
  to?: number;
}

export interface ScholarlyProfile extends Reviewable {
  id: "google-scholar" | "pubmed" | "orcid" | (string & {});
  label: string;
  url: string;
  /** Short description shown under the link. */
  description: L10n;
}

export interface TimelineEntry extends Reviewable {
  year: number;
  endYear?: number;
  title: L10n;
  detail?: L10n;
}

export interface Portrait {
  /** Path inside /public, e.g. "/images/portrait.jpg". `null` → abstract panel. */
  src: string | null;
  width: number;
  height: number;
  alt: L10n;
}

/* ───────────────────────────── Research ──────────────────────────── */

export type ResearchGraphic = "branching" | "lattice" | "pedigree" | "cells" | "tracks" | "network";

/**
 * A research area = a field of scientific interest. It is NOT a funded or
 * active project; projects are modelled separately below.
 */
export interface ResearchArea extends Reviewable {
  slug: string;
  title: L10n;
  /** One sentence for cards. */
  summary: L10n;
  /** Paragraphs for the detail page. */
  body: L10n[];
  /** Questions or topics the area covers — rendered as a list. */
  topics: L10n[];
  tags: L10n[];
  graphic: ResearchGraphic;
  /** Featured areas get the large card on the homepage. */
  featured?: boolean;
  /** Publication categories to list on the detail page. */
  publicationCategories: PublicationCategory[];
  /** English term for structured data (`knowsAbout`). */
  schemaTerm: string;
}

export type ProjectStatus = "planned" | "ongoing" | "completed";

/**
 * A confirmed research project. Add records only with confirmed facts.
 * Optional fields are simply omitted from the page when absent.
 */
export interface ResearchProject extends Reviewable {
  slug: string;
  title: L10n;
  status: ProjectStatus;
  /** Slug of the related ResearchArea. */
  area: string;
  description: L10n;
  objective?: L10n;
  /** Leading institution and partners, by name. */
  institutions?: L10n[];
  /** e.g. "Kierownik projektu", "Wykonawca" — only when confirmed. */
  role?: L10n;
  funding?: L10n;
  startYear?: number;
  endYear?: number;
  /** PubMed IDs or DOIs of related publications in publications.ts. */
  publicationIds?: string[];
  url?: string;
}

/* ─────────────────────────── Publications ────────────────────────── */

export type PublicationType = "article" | "review" | "caseReport" | "monograph" | "chapter" | "expert" | "preprint";

export type PublicationCategory = "pulmogenetics" | "rareDiseases" | "oncogenetics" | "pharmacogenetics" | "molecularDiagnostics";

export interface Publication extends Reviewable {
  /** Stable id — use "pmid:<n>", "doi:<doi>" or "isbn:<n>". */
  id: string;
  title: string;
  /** Title language when not English, e.g. "pl". */
  language?: "pl" | "en";
  /** Authors as printed (Vancouver style). Use `authorsTruncated` for long lists. */
  authors: string[];
  /** Total author count when `authors` is truncated. */
  authorCount?: number;
  /** Last author, shown after the ellipsis of a truncated list. */
  lastAuthor?: string;
  year: number;
  /** ISO date of publication when known. */
  date?: string;
  /** Journal (articles) or publisher (books). */
  venue: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  isbn?: string;
  url?: string;
  type: PublicationType;
  categories: PublicationCategory[];
  featured?: boolean;
}

/* ───────────────────────────── Partners ──────────────────────────── */

export type PartnerRelation = "affiliation" | "academic" | "scientific" | "diagnostic" | "previous";

export interface Partner extends Reviewable {
  id: string;
  name: string;
  /** Short qualifier shown under the name, e.g. city or country. */
  location?: L10n;
  relation: PartnerRelation;
  description: L10n;
  url?: string;
  /**
   * Logo in /public/logos. Set only when the organisation has approved use;
   * otherwise the card shows the name typographically.
   */
  logo?: { src: string; width: number; height: number; permission: string };
  from?: number;
  to?: number;
}

/* ───────────────────────────── Expertise ─────────────────────────── */

export interface ExpertiseItem extends Reviewable {
  id: string;
  title: L10n;
  description: L10n;
}

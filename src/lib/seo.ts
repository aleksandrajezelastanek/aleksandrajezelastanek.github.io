import type { Metadata } from "next";
import type { Locale, Publication } from "@/data/types";
import { getDictionary } from "@/content";
import { affiliations, contact, identity, scholarlyProfiles } from "@/data/profile";
import { AUTHOR_NAME } from "@/data/publications";
import { getResearchAreas, publishable, t } from "./content";
import { translatePath } from "./routes";
import { absoluteUrl, englishEnabled, siteUrl } from "./site";

/* ───────────────────────────── Metadata ───────────────────────────── */

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const dict = getDictionary(locale);
  const url = absoluteUrl(path);
  const languages: Record<string, string> | undefined = englishEnabled
    ? {
        pl: absoluteUrl(locale === "pl" ? path : translatePath(path, "pl")),
        en: absoluteUrl(locale === "en" ? path : translatePath(path, "en")),
        "x-default": absoluteUrl(locale === "pl" ? path : translatePath(path, "pl")),
      }
    : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: path === "/" || path === "/en/" ? "profile" : "website",
      url,
      siteName: dict.meta.siteName,
      title: absoluteTitle ? title : `${title} — ${dict.meta.siteName}`,
      description,
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: dict.meta.siteName }],
    },
    twitter: { card: "summary_large_image" },
  };
}

/* ─────────────────────────── Structured data ─────────────────────────── */

type JsonLdObject = Record<string, unknown>;

export const personId = () => absoluteUrl("/#person");

/** schema.org Person — only verified facts. */
export function personJsonLd(locale: Locale): JsonLdObject {
  const current = publishable(affiliations).filter((a) => a.kind === "current");
  const knowsAbout = [
    "Clinical genetics",
    "Medical genetics",
    ...getResearchAreas().map((a) => a.schemaTerm),
    "Genetic counseling",
    "Genomic sequencing",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(),
    name: identity.fullName,
    givenName: identity.givenName,
    familyName: identity.familyName,
    honorificPrefix: identity.honorificPrefix,
    jobTitle: t(identity.title, locale),
    description: t(identity.description, locale),
    url: absoluteUrl(locale === "pl" ? "/" : "/en/"),
    email: `mailto:${contact.email}`,
    affiliation: current.map((a) => ({
      "@type": "Organization",
      name: t(a.name, "pl"),
      ...(a.unit ? { department: { "@type": "Organization", name: t(a.unit, "pl") } } : {}),
      ...(a.url ? { url: a.url } : {}),
      address: { "@type": "PostalAddress", addressLocality: t(a.city, "pl"), addressCountry: "PL" },
    })),
    knowsAbout: [...new Set(knowsAbout)],
    sameAs: publishable(scholarlyProfiles).map((p) => p.url),
  };
}

export function websiteJsonLd(locale: Locale): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: `${siteUrl}/`,
    name: getDictionary(locale).meta.siteName,
    inLanguage: englishEnabled ? ["pl", "en"] : "pl",
    about: { "@id": personId() },
    author: { "@id": personId() },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** schema.org ScholarlyArticle — emitted only for verified records. */
export function scholarlyArticleJsonLd(p: Publication): JsonLdObject {
  const identifiers = [
    p.doi && { "@type": "PropertyValue", propertyID: "DOI", value: p.doi },
    p.pmid && { "@type": "PropertyValue", propertyID: "PMID", value: p.pmid },
  ].filter(Boolean);
  const authors = [...p.authors, ...(p.lastAuthor ? [p.lastAuthor] : [])].map((name) =>
    name === AUTHOR_NAME ? { "@id": personId() } : { "@type": "Person", name },
  );
  return {
    "@context": "https://schema.org",
    "@type": p.type === "monograph" ? "Book" : "ScholarlyArticle",
    headline: p.title,
    name: p.title,
    author: authors,
    datePublished: p.date ?? String(p.year),
    inLanguage: p.language ?? "en",
    identifier: identifiers,
    ...(p.doi ? { url: `https://doi.org/${p.doi}`, sameAs: `https://doi.org/${p.doi}` } : {}),
    isPartOf: { "@type": "Periodical", name: p.venue },
  };
}

/** Serialise safely for an inline <script type="application/ld+json">. */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

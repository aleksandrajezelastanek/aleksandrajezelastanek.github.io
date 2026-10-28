import type { Partner, PartnerRelation } from "./types";

/**
 * Institutions and organisations the professor works or has worked with.
 *
 * Partners play a secondary visual role: they are listed by name, without
 * logos, unless an organisation has approved use of its logo. To add a logo:
 *   1. Put the file in /public/logos (SVG preferred).
 *   2. Set `logo: { src: "/logos/name.svg", width, height, permission: "…" }`,
 *      recording who granted permission and when.
 *
 * Descriptions state only the nature of the relationship given in the brief.
 * Do not add dates, roles or project names until they are confirmed.
 */

const BRIEF = { status: "verified", source: "Brief od Prof. Jezeli-Stanek (2026)", checkedAt: "2026-10-23" } as const;

export const partners: Partner[] = [
  {
    id: "igichp",
    name: "Instytut Gruźlicy i Chorób Płuc",
    location: { pl: "Warszawa", en: "Warsaw, Poland" },
    relation: "affiliation",
    description: { pl: "Obecne miejsce pracy", en: "Current institution" },
    url: "https://www.igichp.edu.pl/",
    review: BRIEF,
  },
  {
    id: "umed-lodz",
    name: "Uniwersytet Medyczny w Łodzi",
    location: { pl: "Łódź", en: "Łódź, Poland" },
    relation: "academic",
    description: { pl: "Współpraca akademicka", en: "Academic collaboration" },
    url: "https://umed.pl/",
    review: BRIEF,
  },
  {
    id: "akademia-slaska",
    name: "Akademia Śląska",
    location: { pl: "Katowice", en: "Katowice, Poland" },
    relation: "academic",
    description: { pl: "Współpraca akademicka", en: "Academic collaboration" },
    url: "https://akademiaslaska.pl/",
    review: BRIEF,
  },
  {
    id: "people4people",
    name: "Fundacja People4People",
    location: { pl: "Katowice", en: "Katowice, Poland" },
    relation: "scientific",
    description: { pl: "Współpraca naukowa", en: "Scientific collaboration" },
    url: "https://fundacja-p4p.com/",
    review: BRIEF,
  },
  {
    id: "geneaware",
    name: "GeneAware",
    location: { pl: "Dubaj, Zjednoczone Emiraty Arabskie", en: "Dubai, United Arab Emirates" },
    relation: "diagnostic",
    description: { pl: "Współpraca w obszarze genetyki", en: "Collaboration in genetics" },
    url: "https://geneaware.net/",
    review: { ...BRIEF, note: "URL zweryfikowany 2026-10-23 (geneaware.net, działalność w ZEA). Potwierdzić z Prof." },
  },
  {
    id: "3billion",
    name: "3billion",
    relation: "diagnostic",
    description: { pl: "Współpraca w obszarze diagnostyki genomowej", en: "Collaboration in genomic diagnostics" },
    url: "https://3billion.io/",
    review: BRIEF,
  },
  {
    id: "centogene",
    name: "CENTOGENE",
    relation: "diagnostic",
    description: { pl: "Współpraca w obszarze diagnostyki chorób rzadkich", en: "Collaboration in rare-disease diagnostics" },
    url: "https://www.centogene.com/",
    review: BRIEF,
  },
  {
    id: "ipczd",
    name: "Instytut „Pomnik – Centrum Zdrowia Dziecka”",
    location: { pl: "Warszawa", en: "Warsaw, Poland" },
    relation: "previous",
    description: { pl: "Wieloletnie doświadczenie zawodowe", en: "Many years of professional experience" },
    url: "https://czd.pl/",
    review: BRIEF,
  },
];

/** Display order and headings for partner groups. */
export const partnerGroups: { relations: PartnerRelation[]; title: { pl: string; en: string } }[] = [
  { relations: ["affiliation", "academic"], title: { pl: "Ośrodki akademickie i badawcze", en: "Academic and research institutions" } },
  {
    relations: ["scientific", "diagnostic"],
    title: { pl: "Współpraca naukowa i diagnostyczna", en: "Scientific and diagnostic collaboration" },
  },
  { relations: ["previous"], title: { pl: "Wcześniejsze doświadczenie", en: "Previous experience" } },
];

import type { Publication, PublicationCategory, PublicationType } from "./types";

/**
 * Curated bibliography.
 *
 * Every record below was copied from PubMed (E-utilities `esummary`) on the
 * date in `review.checkedAt`. Do not type bibliographic details from memory —
 * copy them from PubMed, the DOI record or the publisher.
 *
 * HOW TO ADD A PUBLICATION
 *  1. Find the record on PubMed or doi.org.
 *  2. Copy one of the objects below and fill in the fields.
 *       id        "pmid:<PMID>" — or "doi:<DOI>" / "isbn:<ISBN>" for books
 *       authors   Vancouver style ("Jezela-Stanek A"). For long author lists
 *                 give the first three, set `authorCount` and, if the
 *                 professor is the last author, `lastAuthor`.
 *       type      "article" | "review" | "caseReport" | "monograph" |
 *                 "chapter" | "expert" | "preprint"
 *       categories one or more research categories (see below)
 *       featured  true → shown on the homepage (keep it to ~6 items)
 *  3. Set review.status to "verified" once the metadata has been checked.
 *
 * Monograph example:
 * {
 *   id: "isbn:9788300000000",
 *   title: "Tytuł monografii",
 *   language: "pl",
 *   authors: ["Jezela-Stanek A"],
 *   year: 2027,
 *   venue: "Wydawnictwo Lekarskie PZWL",
 *   isbn: "978-83-00-00000-0",
 *   type: "monograph",
 *   categories: ["rareDiseases"],
 *   review: { status: "requiresReview", source: "Prof. — dane od wydawcy" },
 * }
 */

/** The author string that is highlighted in author lists. */
export const AUTHOR_NAME = "Jezela-Stanek A";

const PUBMED = { status: "verified", source: "PubMed", checkedAt: "2026-10-23" } as const;

export const publications: Publication[] = [
  {
    id: "pmid:42801449",
    title: "Ambroxol in Gaucher disease and GBA1-related Parkinson disease: an updated systematic review.",
    authors: ["Lipiński P", "Jezela-Stanek A", "Tylki-Szymańska A"],
    year: 2026,
    date: "2026-09-27",
    venue: "Acta Neurologica Belgica",
    doi: "10.1007/s13760-026-03202-w",
    pmid: "42801449",
    type: "review",
    categories: ["rareDiseases"],
    review: PUBMED,
  },
  {
    id: "pmid:42670321",
    title: "Protein Fragments: From Biomarkers to Therapeutic Targets — A Focus on α1-Antitrypsin-Derived Peptides.",
    authors: ["Börner F", "Iwanicki T", "Held J", "Chorostowska-Wynimko J", "Jezela-Stanek A", "Janciauskiene S"],
    year: 2026,
    venue: "Mediators of Inflammation",
    volume: "2026",
    issue: "1",
    pages: "e6516930",
    doi: "10.1155/mi/6516930",
    pmid: "42670321",
    type: "review",
    categories: ["pulmogenetics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:41465275",
    title: "Genetic Determinants of Progressive Pulmonary Fibrosis: A Comprehensive Review.",
    authors: ["Zhumagaliyeva A", "Chorostowska-Wynimko J", "Jezela-Stanek A"],
    year: 2025,
    date: "2025-12-08",
    venue: "International Journal of Molecular Sciences",
    volume: "26",
    issue: "24",
    doi: "10.3390/ijms262411846",
    pmid: "41465275",
    type: "review",
    categories: ["pulmogenetics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:39953909",
    title: "AUTS2-related syndrome: Insights from a large European cohort.",
    authors: ["Loberti L", "Adamo L", "Antolini E"],
    authorCount: 75,
    year: 2025,
    date: "2025-06-01",
    venue: "Genetics in Medicine",
    volume: "27",
    issue: "6",
    pages: "101375",
    doi: "10.1016/j.gim.2025.101375",
    pmid: "39953909",
    type: "article",
    categories: ["rareDiseases"],
    review: PUBMED,
  },
  {
    id: "pmid:39772320",
    title: "Mutations and their consequences in the development of pancreatic cancer.",
    language: "pl",
    authors: ["Panek P", "Rachuna J", "Madej Ł", "Tomasiuk R", "Jezela-Stanek A"],
    year: 2024,
    date: "2024-12-02",
    venue: "Postępy Biochemii",
    volume: "70",
    issue: "4",
    pages: "490–496",
    doi: "10.18388/pb.2021_576",
    pmid: "39772320",
    type: "review",
    categories: ["oncogenetics"],
    review: PUBMED,
  },
  {
    id: "pmid:38540399",
    title: "Computational Tools to Assist in Analyzing Effects of the SERPINA1 Gene Variation on Alpha-1 Antitrypsin (AAT).",
    authors: ["Mróz J", "Pelc M", "Mitusińska K", "Chorostowska-Wynimko J", "Jezela-Stanek A"],
    year: 2024,
    date: "2024-03-06",
    venue: "Genes",
    volume: "15",
    issue: "3",
    doi: "10.3390/genes15030340",
    pmid: "38540399",
    type: "review",
    categories: ["pulmogenetics", "molecularDiagnostics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:39012700",
    title: "Genetic and molecular backgrounds of the development of glioblastoma.",
    language: "pl",
    authors: ["Panek P", "Jezela-Stanek A"],
    year: 2024,
    date: "2024-01-30",
    venue: "Postępy Biochemii",
    volume: "69",
    issue: "4",
    pages: "254–263",
    doi: "10.18388/pb.2021_495",
    pmid: "39012700",
    type: "review",
    categories: ["oncogenetics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:37372388",
    title:
      "Characteristics of Neuroimaging and Behavioural Phenotype in Polish Patients with PIGV-CDG — An Observational Study and Literature Review.",
    authors: ["Hutny M", "Lipinski P", "Jezela-Stanek A"],
    year: 2023,
    date: "2023-05-31",
    venue: "Genes",
    volume: "14",
    issue: "6",
    doi: "10.3390/genes14061208",
    pmid: "37372388",
    type: "article",
    categories: ["rareDiseases"],
    review: PUBMED,
  },
  {
    id: "pmid:37298411",
    title:
      "The Epidermal Transcriptome Analysis of a Novel c.639_642dup LORICRIN Variant — Delineation of the Loricrin Keratoderma Pathology.",
    authors: ["Wertheim-Tysarowska K", "Osipowicz K", "Gielniewski B"],
    authorCount: 15,
    lastAuthor: "Jezela-Stanek A",
    year: 2023,
    date: "2023-05-29",
    venue: "International Journal of Molecular Sciences",
    volume: "24",
    issue: "11",
    doi: "10.3390/ijms24119459",
    pmid: "37298411",
    type: "article",
    categories: ["rareDiseases", "molecularDiagnostics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:36902496",
    title: "SERPINA1 and More? A Putative Genetic Contributor to Pulmonary Dysfunction in Alpha-1 Antitrypsin Deficiency.",
    authors: ["Jezela-Stanek A", "Chorostowska-Wynimko J"],
    year: 2023,
    date: "2023-02-21",
    venue: "Journal of Clinical Medicine",
    volume: "12",
    issue: "5",
    pages: "1708",
    doi: "10.3390/jcm12051708",
    pmid: "36902496",
    type: "review",
    categories: ["pulmogenetics"],
    featured: true,
    review: PUBMED,
  },
  {
    id: "pmid:33066491",
    title: "Proteins Structure Models in the Evaluation of Novel Variant (C.472_477del) in the MOCS2 Gene.",
    authors: ["Jezela-Stanek A", "Blaz W", "Gora A", "Bochenska M", "Kusmierska K", "Sykut-Cegielska J"],
    year: 2020,
    date: "2020-10-14",
    venue: "Diagnostics",
    volume: "10",
    issue: "10",
    doi: "10.3390/diagnostics10100821",
    pmid: "33066491",
    type: "article",
    categories: ["rareDiseases", "molecularDiagnostics"],
    review: PUBMED,
  },
];

export const publicationTypeLabels: Record<PublicationType, { pl: string; en: string }> = {
  article: { pl: "Artykuł oryginalny", en: "Original article" },
  review: { pl: "Artykuł przeglądowy", en: "Review" },
  caseReport: { pl: "Opis przypadku", en: "Case report" },
  monograph: { pl: "Monografia", en: "Monograph" },
  chapter: { pl: "Rozdział w monografii", en: "Book chapter" },
  expert: { pl: "Publikacja ekspercka", en: "Expert publication" },
  preprint: { pl: "Preprint", en: "Preprint" },
};

export const publicationCategoryLabels: Record<PublicationCategory, { pl: string; en: string }> = {
  pulmogenetics: { pl: "Pulmogenetyka", en: "Pulmogenetics" },
  rareDiseases: { pl: "Choroby rzadkie", en: "Rare diseases" },
  oncogenetics: { pl: "Onkogenetyka", en: "Oncogenetics" },
  pharmacogenetics: { pl: "Farmakogenetyka", en: "Pharmacogenetics" },
  molecularDiagnostics: { pl: "Diagnostyka molekularna", en: "Molecular diagnostics" },
};

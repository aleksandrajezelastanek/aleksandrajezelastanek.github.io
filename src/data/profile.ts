import type { Affiliation, L10n, Portrait, ScholarlyProfile, TimelineEntry } from "./types";

/**
 * Identity and biography of the professor.
 *
 * Editing rules:
 *  - Keep names and titles exactly as approved by the professor.
 *  - Never add dates, roles or appointments that have not been confirmed.
 *  - New facts start as `requiresReview` and become `verified` after sign-off.
 */

const BRIEF = "Brief od Prof. Jezeli-Stanek (2026)";
const CHECKED = "2026-10-23";

export const identity = {
  honorificPrefix: "Prof. dr hab. n. med.",
  givenName: "Aleksandra",
  familyName: "Jezela-Stanek",
  fullName: "Aleksandra Jezela-Stanek",
  /** Short form used in the header wordmark. */
  shortName: "A. Jezela-Stanek",
  title: {
    pl: "Specjalista genetyki klinicznej, MBA w ochronie zdrowia z badaniami klinicznymi",
    en: "Specialist in clinical genetics, MBA in healthcare with clinical research",
  } satisfies L10n,
  /** Main message of the site. */
  headline: {
    pl: "Genetyka w diagnostyce, profilaktyce i leczeniu",
    en: "Genetics in diagnosis, prevention and treatment",
  } satisfies L10n,
  /** Categories shown under the headline in the hero. */
  heroCategories: [
    { pl: "Onkogenetyka", en: "Oncogenetics" },
    { pl: "Choroby rzadkie", en: "Rare diseases" },
    { pl: "Farmakogenetyka", en: "Pharmacogenetics" },
    { pl: "Projekty naukowe", en: "Research projects" },
  ] satisfies L10n[],
  /** Proposed editorial wording from the brief — easy to revise here. */
  intro: {
    pl: "Łączę doświadczenie kliniczne z działalnością naukową, wykorzystując wiedzę genetyczną w diagnostyce, profilaktyce i poszukiwaniu indywidualnych rozwiązań medycznych.",
    en: "I combine clinical experience with scientific work, applying genetic knowledge to diagnosis, prevention and the search for individualised medical solutions.",
  } satisfies L10n,
  /** Used for <meta name="description"> and structured data. */
  description: {
    pl: "Prof. dr hab. n. med. Aleksandra Jezela-Stanek — specjalista genetyki klinicznej. Pulmogenetyka, choroby rzadkie, onkogenetyka, farmakogenetyka i diagnostyka molekularna: działalność naukowa, publikacje i współpraca.",
    en: "Prof. Aleksandra Jezela-Stanek, MD, PhD — specialist in clinical genetics. Pulmogenetics, rare diseases, oncogenetics, pharmacogenetics and molecular diagnostics: research, publications and collaboration.",
  } satisfies L10n,
};

/**
 * Portrait. Put an authorised photograph in /public/images and set `src`
 * (recommended: 1200 × 1500 px, 4:5, JPEG/WebP). With `src: null` the hero
 * shows an abstract composition instead — never a generated likeness.
 */
export const portrait: Portrait = {
  src: null,
  width: 1200,
  height: 1500,
  alt: {
    pl: "Prof. Aleksandra Jezela-Stanek",
    en: "Prof. Aleksandra Jezela-Stanek",
  },
};

export const contact = {
  email: "badania@fundacja-p4p.com",
  /** The address uses the foundation's domain at the professor's request. */
  emailDomainOwner: "Fundacja People4People",
};

export const scholarlyProfiles: ScholarlyProfile[] = [
  {
    id: "google-scholar",
    label: "Google Scholar",
    url: "https://scholar.google.com/citations?user=u0pbC3AAAAAJ&hl=pl",
    description: {
      pl: "Profil autorski z pełną listą prac i cytowań",
      en: "Author profile with the full list of works and citations",
    },
    review: { status: "verified", source: BRIEF, checkedAt: CHECKED },
  },
  {
    id: "pubmed",
    label: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/?term=Jezela-Stanek+A",
    description: {
      pl: "Publikacje indeksowane w bazie National Library of Medicine",
      en: "Publications indexed by the US National Library of Medicine",
    },
    review: { status: "verified", source: BRIEF, checkedAt: CHECKED },
  },
  {
    id: "orcid",
    label: "ORCID",
    url: "https://orcid.org/0000-0001-9814-0324",
    description: {
      pl: "Trwały identyfikator naukowca 0000-0001-9814-0324",
      en: "Persistent researcher identifier 0000-0001-9814-0324",
    },
    review: {
      status: "verified",
      source: "Publiczny rekord ORCID (afiliacje: IGiChP, IP-CZD)",
      checkedAt: CHECKED,
      note: "Identyfikator odnaleziony w rejestrze ORCID; nazwisko i afiliacje zgodne. Do potwierdzenia przez Prof.",
    },
  },
];

/** Biography paragraphs — first person, as in the hero introduction. */
export const biography: { short: L10n[]; long: L10n[] } = {
  short: [
    {
      pl: "Jestem lekarzem specjalistą w dziedzinie genetyki klinicznej. W swojej pracy łączę działalność kliniczną z badaniami naukowymi — od diagnostyki molekularnej chorób rzadkich, przez genetyczne podłoże chorób płuc, po wykorzystanie wiedzy genetycznej w profilaktyce i leczeniu.",
      en: "I am a physician specialising in clinical genetics. My work brings together clinical practice and research — from the molecular diagnosis of rare diseases and the genetic basis of lung disease to the use of genetic knowledge in prevention and treatment.",
    },
    {
      pl: "Koncentruję się na chorobach ultrarzadkich i złożonych problemach diagnostycznych, w których dotychczasowe badania nie przyniosły jednoznacznego rozpoznania. Łączę ocenę kliniczną z analizą danych genomowych i aktualną wiedzą naukową, poszukując przyczyn choroby oraz możliwości przełożenia ustaleń na dalszą diagnostykę czy propozycje terapii.",
      en: "I focus on ultra-rare diseases and complex diagnostic problems where previous testing has not led to a clear diagnosis. I combine clinical assessment with genomic data analysis and current scientific knowledge, searching for the cause of the disease and for ways to translate the findings into further diagnostics or treatment proposals.",
    },
    {
      pl: "Obecnie pracuję w Instytucie Gruźlicy i Chorób Płuc w Warszawie oraz współpracuję z Uniwersytetem Medycznym w Łodzi i Akademią Śląską w Katowicach. Wcześniej przez wiele lat byłam związana z Instytutem „Pomnik – Centrum Zdrowia Dziecka”.",
      en: "I currently work at the National Institute of Tuberculosis and Lung Diseases in Warsaw and collaborate with the Medical University of Lodz and the Silesian Academy in Katowice. For many years before that, I worked at The Children's Memorial Health Institute.",
    },
  ],
  long: [
    {
      pl: "Jestem lekarzem specjalistą w dziedzinie genetyki klinicznej. W swojej pracy łączę działalność kliniczną z badaniami naukowymi: zajmuję się diagnostyką molekularną chorób rzadkich, genetycznym podłożem chorób płuc, onkogenetyką i farmakogenetyką, a przede wszystkim przekładaniem wyników badań genetycznych na praktyczne zalecenia dla pacjentów i lekarzy.",
      en: "I am a physician specialising in clinical genetics. My work combines clinical practice with research: the molecular diagnosis of rare diseases, the genetic basis of lung disease, oncogenetics and pharmacogenetics — and, above all, translating genetic findings into practical recommendations for patients and physicians.",
    },
    {
      pl: "Koncentruję się na chorobach ultrarzadkich i złożonych problemach diagnostycznych, w których dotychczasowe badania nie przyniosły jednoznacznego rozpoznania. Łączę ocenę kliniczną z analizą danych genomowych i aktualną wiedzą naukową, poszukując przyczyn choroby oraz możliwości przełożenia ustaleń na dalszą diagnostykę czy propozycje terapii.",
      en: "I focus on ultra-rare diseases and complex diagnostic problems where previous testing has not led to a clear diagnosis. I combine clinical assessment with genomic data analysis and current scientific knowledge, searching for the cause of the disease and for ways to translate the findings into further diagnostics or treatment proposals.",
    },
    {
      pl: "Obecnie pracuję w Instytucie Gruźlicy i Chorób Płuc w Warszawie, w Zakładzie Genetyki i Immunologii Klinicznej, gdzie szczególne miejsce zajmuje pulmogenetyka — genetyczne uwarunkowania chorób płuc, w tym chorób rzadkich. Współpracuję naukowo z Uniwersytetem Medycznym w Łodzi oraz z Akademią Śląską w Katowicach.",
      en: "I currently work at the Department of Genetics and Clinical Immunology of the National Institute of Tuberculosis and Lung Diseases in Warsaw, where pulmogenetics — the genetic basis of lung disease, including rare disorders — holds a special place. I collaborate with the Medical University of Lodz and the Silesian Academy in Katowice.",
    },
    {
      pl: "Wcześniej przez wiele lat pracowałam w Instytucie „Pomnik – Centrum Zdrowia Dziecka” w Warszawie. Doświadczenie zdobyte w instytucjach klinicznych i badawczych stanowi podstawę mojej pracy w diagnostyce molekularnej i w obszarze chorób rzadkich.",
      en: "For many years before that, I worked at The Children's Memorial Health Institute in Warsaw. Experience gained in clinical and research institutions underpins my work in molecular diagnostics and rare diseases.",
    },
    {
      pl: "Uczestniczę we współpracy naukowej w kraju i za granicą — z ośrodkami akademickimi, klinicznymi i badawczymi. Ukończyłam studia MBA w ochronie zdrowia z badaniami klinicznymi, które poszerzyły moją perspektywę o organizację badań klinicznych i funkcjonowanie systemu ochrony zdrowia.",
      en: "I take part in national and international scientific collaboration with academic, clinical and research centres. I completed an MBA in healthcare with clinical research, which broadened my perspective on the organisation of clinical research and the healthcare system.",
    },
  ],
};

export const affiliations: Affiliation[] = [
  {
    id: "igichp",
    name: { pl: "Instytut Gruźlicy i Chorób Płuc", en: "National Institute of Tuberculosis and Lung Diseases" },
    unit: { pl: "Zakład Genetyki i Immunologii Klinicznej", en: "Department of Genetics and Clinical Immunology" },
    city: { pl: "Warszawa", en: "Warsaw" },
    kind: "current",
    url: "https://www.igichp.edu.pl/",
    review: { status: "verified", source: `${BRIEF}; jednostka: ORCID`, checkedAt: CHECKED },
  },
  {
    id: "umed-lodz",
    name: { pl: "Uniwersytet Medyczny w Łodzi", en: "Medical University of Lodz" },
    city: { pl: "Łódź", en: "Łódź" },
    kind: "collaboration",
    url: "https://umed.pl/",
    review: { status: "verified", source: BRIEF, checkedAt: CHECKED },
  },
  {
    id: "akademia-slaska",
    name: { pl: "Akademia Śląska", en: "Silesian Academy" },
    city: { pl: "Katowice", en: "Katowice" },
    kind: "collaboration",
    url: "https://akademiaslaska.pl/",
    review: { status: "verified", source: BRIEF, checkedAt: CHECKED },
  },
  {
    id: "ipczd",
    name: { pl: "Instytut „Pomnik – Centrum Zdrowia Dziecka”", en: "The Children's Memorial Health Institute" },
    city: { pl: "Warszawa", en: "Warsaw" },
    kind: "previous",
    url: "https://czd.pl/",
    review: { status: "verified", source: BRIEF, checkedAt: CHECKED },
  },
];

/**
 * Optional timeline. Rendered only when at least one entry is verified.
 * Entries below come from the public ORCID record and await confirmation.
 */
export const timeline: TimelineEntry[] = [
  {
    year: 2001,
    endYear: 2017,
    title: { pl: "Instytut „Pomnik – Centrum Zdrowia Dziecka”", en: "The Children's Memorial Health Institute" },
    detail: { pl: "Warszawa", en: "Warsaw" },
    review: {
      status: "requiresReview",
      source: "ORCID 0000-0001-9814-0324 (sekcja Employment)",
      checkedAt: CHECKED,
      note: "Lata wg ORCID — potwierdzić z Prof. przed publikacją.",
    },
  },
];

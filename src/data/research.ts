import type { ResearchArea, ResearchProject } from "./types";

/**
 * Research AREAS are fields of scientific interest. They are presented as
 * such and are never labelled as funded or active projects.
 *
 * Statements about the professor's work in each area are limited to what the
 * brief and her indexed publications (see publications.ts) support.
 */

const REVIEW = { status: "verified", source: "Brief + publikacje w PubMed", checkedAt: "2026-10-23" } as const;

export const researchAreas: ResearchArea[] = [
  {
    slug: "pulmogenetyka",
    featured: true,
    graphic: "branching",
    schemaTerm: "Pulmogenetics",
    title: { pl: "Pulmogenetyka", en: "Pulmogenetics" },
    summary: {
      pl: "Genetyczne podłoże chorób płuc, w tym chorób rzadkich — od niedoboru alfa-1 antytrypsyny po uwarunkowania włóknienia płuc.",
      en: "The genetic basis of lung disease, including rare disorders — from alpha-1 antitrypsin deficiency to the determinants of pulmonary fibrosis.",
    },
    body: [
      {
        pl: "Pulmogenetyka zajmuje się wpływem czynników genetycznych na rozwój, przebieg i obraz kliniczny chorób układu oddechowego. Obejmuje zarówno choroby jednogenowe, jak i złożone, w których wariant genetyczny jest jednym z kilku czynników ryzyka.",
        en: "Pulmogenetics studies how genetic factors shape the development, course and clinical picture of respiratory disease. It covers both monogenic disorders and complex conditions in which a genetic variant is one of several risk factors.",
      },
      {
        pl: "To obszar szczególnie bliski mojej pracy w Instytucie Gruźlicy i Chorób Płuc. Publikacje, których jestem współautorką, dotyczą m.in. niedoboru alfa-1 antytrypsyny i zmienności genu SERPINA1, narzędzi obliczeniowych wspierających ocenę wariantów oraz genetycznych uwarunkowań postępującego włóknienia płuc.",
        en: "This area is particularly close to my work at the National Institute of Tuberculosis and Lung Diseases. Publications I have co-authored concern, among others, alpha-1 antitrypsin deficiency and SERPINA1 variation, computational tools supporting variant assessment, and the genetic determinants of progressive pulmonary fibrosis.",
      },
      {
        pl: "Rozpoznanie genetycznej przyczyny choroby płuc może mieć znaczenie dla rokowania, wyboru postępowania i badań u członków rodziny. Każdy taki wniosek wymaga jednak indywidualnej oceny klinicznej.",
        en: "Identifying a genetic cause of lung disease can matter for prognosis, management and testing of relatives. Each such conclusion, however, requires an individual clinical assessment.",
      },
    ],
    topics: [
      { pl: "Niedobór alfa-1 antytrypsyny i zmienność genu SERPINA1", en: "Alpha-1 antitrypsin deficiency and SERPINA1 variation" },
      { pl: "Genetyczne uwarunkowania postępującego włóknienia płuc", en: "Genetic determinants of progressive pulmonary fibrosis" },
      { pl: "Rzadkie choroby płuc o podłożu genetycznym", en: "Rare lung diseases with a genetic basis" },
      {
        pl: "Narzędzia obliczeniowe w ocenie wpływu wariantów na białko",
        en: "Computational tools for assessing variant effects on proteins",
      },
    ],
    tags: [
      { pl: "SERPINA1", en: "SERPINA1" },
      { pl: "Włóknienie płuc", en: "Pulmonary fibrosis" },
      { pl: "Choroby rzadkie", en: "Rare diseases" },
    ],
    publicationCategories: ["pulmogenetics"],
    review: REVIEW,
  },
  {
    slug: "choroby-rzadkie",
    graphic: "pedigree",
    schemaTerm: "Rare diseases",
    title: { pl: "Choroby rzadkie i ultrarzadkie", en: "Rare and ultra-rare diseases" },
    summary: {
      pl: "Diagnostyka molekularna chorób rzadkich, opisywanie obrazu klinicznego nowych wariantów i interdyscyplinarna współpraca naukowa.",
      en: "Molecular diagnosis of rare disorders, delineating the clinical picture of novel variants, and interdisciplinary scientific collaboration.",
    },
    body: [
      {
        pl: "Za chorobę rzadką uznaje się w Unii Europejskiej schorzenie występujące nie częściej niż u 5 na 10 000 osób; choroby ultrarzadkie dotyczą znacznie mniejszej liczby pacjentów. Większość z nich ma podłoże genetyczne, a droga do rozpoznania bywa długa i wymaga połączenia oceny klinicznej z badaniami molekularnymi.",
        en: "In the European Union a disease is considered rare when it affects no more than 5 in 10,000 people; ultra-rare diseases affect far fewer. Most have a genetic basis, and the path to diagnosis can be long, requiring clinical assessment combined with molecular testing.",
      },
      {
        pl: "W pracy naukowej zajmuję się m.in. korelacją genotypu z fenotypem w rzadkich zespołach genetycznych, chorobami metabolicznymi i lizosomalnymi oraz oceną nowych wariantów z wykorzystaniem modeli struktury białek. Wiele z tych prac powstaje we współpracy krajowych i europejskich ośrodków.",
        en: "My research covers, among others, genotype–phenotype correlation in rare genetic syndromes, metabolic and lysosomal diseases, and the assessment of novel variants using protein structure models. Much of this work is carried out with national and European centres.",
      },
    ],
    topics: [
      {
        pl: "Korelacja genotypu z fenotypem w rzadkich zespołach genetycznych",
        en: "Genotype–phenotype correlation in rare genetic syndromes",
      },
      { pl: "Choroby metaboliczne i lizosomalne", en: "Metabolic and lysosomal diseases" },
      { pl: "Ocena nowych wariantów i ich znaczenia klinicznego", en: "Assessment of novel variants and their clinical significance" },
      { pl: "Wieloośrodkowe kohorty pacjentów", en: "Multicentre patient cohorts" },
    ],
    tags: [
      { pl: "Fenotyp", en: "Phenotype" },
      { pl: "Warianty", en: "Variants" },
      { pl: "Współpraca międzynarodowa", en: "International collaboration" },
    ],
    publicationCategories: ["rareDiseases"],
    review: REVIEW,
  },
  {
    slug: "onkogenetyka",
    graphic: "cells",
    schemaTerm: "Oncogenetics",
    title: { pl: "Onkogenetyka", en: "Oncogenetics" },
    summary: {
      pl: "Genetyczne aspekty predyspozycji do nowotworów, ich diagnostyki i profilaktyki.",
      en: "Genetic aspects of cancer susceptibility, diagnosis and prevention.",
    },
    body: [
      {
        pl: "Onkogenetyka bada, w jaki sposób warianty dziedziczne i zmiany nabyte w komórkach nowotworowych wpływają na ryzyko zachorowania, przebieg choroby i możliwości profilaktyki. W praktyce klinicznej oznacza to ocenę dziedzicznej predyspozycji na podstawie wywiadu rodzinnego i wyników badań.",
        en: "Oncogenetics studies how inherited variants and acquired changes in tumour cells influence cancer risk, disease course and options for prevention. In clinical practice, this means assessing hereditary predisposition from family history and test results.",
      },
      {
        pl: "W publikacjach przeglądowych, których jestem współautorką, omawiane jest m.in. molekularne podłoże rozwoju glejaka wielopostaciowego i raka trzustki.",
        en: "Review articles I have co-authored discuss, among others, the molecular background of glioblastoma and pancreatic cancer.",
      },
    ],
    topics: [
      { pl: "Dziedziczna predyspozycja do nowotworów", en: "Hereditary cancer predisposition" },
      { pl: "Molekularne podłoże rozwoju nowotworów", en: "Molecular basis of tumour development" },
      { pl: "Profilaktyka u osób z grup podwyższonego ryzyka", en: "Prevention in people at increased risk" },
    ],
    tags: [
      { pl: "Predyspozycja", en: "Predisposition" },
      { pl: "Profilaktyka", en: "Prevention" },
    ],
    publicationCategories: ["oncogenetics"],
    review: REVIEW,
  },
  {
    slug: "farmakogenetyka",
    graphic: "lattice",
    schemaTerm: "Pharmacogenetics",
    title: { pl: "Farmakogenetyka", en: "Pharmacogenetics" },
    summary: {
      pl: "Znaczenie zmienności genetycznej dla indywidualizacji farmakoterapii.",
      en: "The relevance of genetic variability to individualised pharmacotherapy.",
    },
    body: [
      {
        pl: "Farmakogenetyka opisuje, jak warianty w genach kodujących m.in. enzymy metabolizujące leki, transportery i receptory mogą wpływać na skuteczność i bezpieczeństwo leczenia. Jej celem jest lepsze dopasowanie wyboru leku i dawki do konkretnego pacjenta.",
        en: "Pharmacogenetics describes how variants in genes encoding drug-metabolising enzymes, transporters and receptors may affect treatment efficacy and safety. Its goal is to better match the choice of drug and dose to the individual patient.",
      },
      {
        pl: "Wynik badania farmakogenetycznego jest jednym z elementów decyzji terapeutycznej — interpretuje się go zawsze razem z obrazem klinicznym, innymi lekami i zaleceniami lekarza prowadzącego.",
        en: "A pharmacogenetic result is one element of a treatment decision — it is always interpreted together with the clinical picture, other medicines and the treating physician's recommendations.",
      },
    ],
    topics: [
      { pl: "Warianty genów metabolizmu leków", en: "Variants in drug-metabolism genes" },
      { pl: "Interpretacja wyników w kontekście klinicznym", en: "Interpreting results in clinical context" },
    ],
    tags: [{ pl: "Medycyna spersonalizowana", en: "Personalised medicine" }],
    publicationCategories: ["pharmacogenetics"],
    review: REVIEW,
  },
  {
    slug: "diagnostyka-molekularna",
    graphic: "tracks",
    schemaTerm: "Molecular diagnostics",
    title: { pl: "Diagnostyka molekularna", en: "Molecular diagnostics" },
    summary: {
      pl: "Dobór i interpretacja badań molekularnych i genomowych w praktyce klinicznej — od paneli genów po WES, WGS i analizy RNA.",
      en: "Selecting and interpreting molecular and genomic tests in clinical practice — from gene panels to WES, WGS and RNA analysis.",
    },
    body: [
      {
        pl: "Nowoczesne metody sekwencjonowania pozwalają badać jednocześnie wiele genów, cały eksom lub genom. Wartość badania zależy jednak od trafnego doboru metody do pytania klinicznego i od rzetelnej interpretacji wyników.",
        en: "Modern sequencing makes it possible to examine many genes, the whole exome or the whole genome at once. The value of a test, however, depends on matching the method to the clinical question and on careful interpretation of the results.",
      },
      {
        pl: "W pracach badawczych korzystam m.in. z analizy transkryptomu i modelowania struktury białek, które pomagają ocenić znaczenie wariantów, gdy samo badanie DNA nie daje jednoznacznej odpowiedzi.",
        en: "In my research I use, among others, transcriptome analysis and protein structure modelling, which help assess the significance of variants when DNA testing alone is inconclusive.",
      },
    ],
    topics: [
      { pl: "Dobór metody: panel, WES, WGS", en: "Choosing the method: panel, WES, WGS" },
      { pl: "Analizy RNA i transkryptomu", en: "RNA and transcriptome analysis" },
      {
        pl: "Klasyfikacja wariantów, w tym wariantów o niepewnym znaczeniu",
        en: "Variant classification, including variants of uncertain significance",
      },
      { pl: "Modelowanie struktury białek", en: "Protein structure modelling" },
    ],
    tags: [
      { pl: "WES", en: "WES" },
      { pl: "WGS", en: "WGS" },
      { pl: "RNA", en: "RNA" },
    ],
    publicationCategories: ["molecularDiagnostics"],
    review: REVIEW,
  },
];

/**
 * Confirmed research PROJECTS.
 *
 * No projects have been confirmed yet, so the list is empty and the projects
 * block is not rendered. To add one, copy the template below, fill in only
 * confirmed facts and set `review.status` to "verified" after sign-off.
 *
 * {
 *   slug: "nazwa-projektu",                 // used in the URL
 *   title: { pl: "Pełny tytuł projektu" },
 *   status: "ongoing",                      // "planned" | "ongoing" | "completed"
 *   area: "pulmogenetyka",                  // slug of a research area above
 *   description: { pl: "Krótki opis projektu." },
 *   objective: { pl: "Cel naukowy." },      // optional
 *   institutions: [{ pl: "Instytut Gruźlicy i Chorób Płuc" }],
 *   role: { pl: "Kierownik projektu" },     // only if confirmed
 *   funding: { pl: "NCN, OPUS 25" },        // only if confirmed
 *   startYear: 2025, endYear: 2028,         // only if confirmed
 *   publicationIds: ["pmid:41465275"],
 *   review: { status: "requiresReview", source: "…" },
 * }
 */
export const researchProjects: ResearchProject[] = [];

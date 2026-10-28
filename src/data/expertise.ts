import type { ExpertiseItem, L10n } from "./types";

/**
 * Professional scope. Descriptions explain each field in general terms for
 * patients, families and physicians. They must not promise a particular test,
 * result or treatment — every case requires an individual clinical assessment.
 */

const REVIEW = { status: "verified", source: "Brief (zakres) + opis redakcyjny", checkedAt: "2026-10-23" } as const;

export const expertise: ExpertiseItem[] = [
  {
    id: "onkogenetyka",
    title: { pl: "Onkogenetyka", en: "Oncogenetics" },
    description: {
      pl: "Ocena dziedzicznej predyspozycji do nowotworów na podstawie wywiadu rodzinnego i badań genetycznych oraz omówienie znaczenia wyników dla pacjenta i jego bliskich.",
      en: "Assessing hereditary cancer predisposition from family history and genetic tests, and explaining what the results mean for the patient and their relatives.",
    },
    review: REVIEW,
  },
  {
    id: "choroby-rzadkie",
    title: { pl: "Złożone wyzwania diagnostyczne", en: "Complex diagnostic challenges" },
    description: {
      pl: "Analiza kliniczno-genomowa w chorobach ultrarzadkich, nietypowych obrazach klinicznych i przypadkach pozostających bez rozpoznania. Łączenie danych molekularnych z pogłębioną oceną fenotypu w celu weryfikacji hipotez diagnostycznych i wyznaczania dalszego postępowania.",
      en: "Clinical and genomic analysis in ultra-rare diseases, atypical clinical presentations and undiagnosed cases. Combining molecular data with in-depth phenotyping to test diagnostic hypotheses and plan further management.",
    },
    review: { status: "verified", source: "Tekst od Prof. Jezeli-Stanek (2026-10-28)", checkedAt: "2026-10-28" },
  },
  {
    id: "nosicielstwo",
    title: { pl: "Badania nosicielstwa", en: "Carrier testing" },
    description: {
      pl: "Badania pozwalające ustalić, czy zdrowa osoba jest nosicielem wariantu związanego z chorobą dziedziczoną recesywnie — istotne m.in. przy planowaniu rodziny.",
      en: "Tests that show whether a healthy person carries a variant associated with a recessively inherited disease — relevant, among others, to family planning.",
    },
    review: REVIEW,
  },
  {
    id: "wes-wgs",
    title: { pl: "Sekwencjonowanie WES i WGS", en: "WES and WGS sequencing" },
    description: {
      pl: "Sekwencjonowanie eksomu (WES) i całego genomu (WGS): dobór metody do pytania klinicznego, ocena ograniczeń badania i interpretacja wykrytych wariantów.",
      en: "Whole-exome (WES) and whole-genome (WGS) sequencing: matching the method to the clinical question, understanding its limits and interpreting detected variants.",
    },
    review: REVIEW,
  },
  {
    id: "rna",
    title: { pl: "Analizy RNA", en: "RNA analysis" },
    description: {
      pl: "Analizy RNA i transkryptomu pomagające ocenić wpływ wariantu na ekspresję lub składanie genu, gdy badanie DNA nie daje jednoznacznej odpowiedzi.",
      en: "RNA and transcriptome analyses that help assess a variant's effect on gene expression or splicing when DNA testing is inconclusive.",
    },
    review: REVIEW,
  },
  {
    id: "farmakogenetyka",
    title: { pl: "Farmakogenetyka", en: "Pharmacogenetics" },
    description: {
      pl: "Ocena, czy indywidualna zmienność genetyczna może wpływać na działanie lub tolerancję leków — jako jeden z elementów decyzji terapeutycznej lekarza prowadzącego.",
      en: "Assessing whether individual genetic variability may affect how medicines work or are tolerated — as one element of the treating physician's decision.",
    },
    review: REVIEW,
  },
  {
    id: "interpretacja",
    title: { pl: "Interpretacja wyników genetycznych", en: "Interpreting genetic results" },
    description: {
      pl: "Omówienie wyników badań genetycznych, w tym wariantów o niepewnym znaczeniu klinicznym (VUS), w kontekście obrazu klinicznego i historii rodzinnej.",
      en: "Reviewing genetic test results, including variants of uncertain significance (VUS), in the context of the clinical picture and family history.",
    },
    review: REVIEW,
  },
  {
    id: "zalecenia",
    title: { pl: "Indywidualne zalecenia medyczne", en: "Individual medical recommendations" },
    description: {
      pl: "Zalecenia dotyczące dalszej diagnostyki, profilaktyki i opieki, formułowane w zakresie kompetencji lekarza genetyka — zawsze po indywidualnej ocenie klinicznej.",
      en: "Recommendations on further diagnostics, prevention and care within the competence of a clinical geneticist — always after an individual clinical assessment.",
    },
    review: REVIEW,
  },
];

export const expertiseNotice: L10n = {
  pl: "Opisy mają charakter informacyjny. Strona nie służy do interpretacji wyników ani udzielania porad medycznych — o zakresie badań i postępowania decyduje indywidualna ocena kliniczna.",
  en: "These descriptions are for information only. This website does not interpret results or give medical advice — the scope of testing and care is decided by an individual clinical assessment.",
};

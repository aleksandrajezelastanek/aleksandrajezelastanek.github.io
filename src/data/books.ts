import type { BookEntry, BookKind } from "./types";

/**
 * Monographs, edited books, book chapters and other publications.
 *
 * Source: the list provided on 2026-11-03. Only the details given there are
 * recorded — add a publisher, year, ISBN or link only after checking it with
 * the publisher's page or the professor.
 *
 * Names are kept exactly as printed in the list. Any name containing
 * "Jezela-Stanek" is highlighted on the page.
 */

const SOURCE = { status: "verified", source: "Lista publikacji przekazana 2026-11-03", checkedAt: "2026-11-03" } as const;

/** The edited book that several chapters below appeared in. */
const NEURO_BOOK = {
  title: "Genetyka w wybranych chorobach neurologicznych u dzieci. Od rozpoznania do leczenia",
  publisher: "PZWL",
  city: "Warszawa",
  year: 2023,
};

export const books: BookEntry[] = [
  /* ── Monographs and edited books ── */
  {
    id: "isbn:9788301229498",
    kind: "edited",
    title: NEURO_BOOK.title,
    editors: ["Aleksandra Jezela-Stanek", "Justyna Paprocka"],
    publisher: NEURO_BOOK.publisher,
    city: NEURO_BOOK.city,
    year: NEURO_BOOK.year,
    isbn: "978-83-01-22949-8",
    review: SOURCE,
  },
  {
    id: "genetyka-w-chorobach-ukladu-oddechowego",
    kind: "edited",
    title: "Genetyka w chorobach układu oddechowego",
    editors: ["Aleksandra Jezela-Stanek", "Joanna Chorostowska-Wynimko"],
    publisher: "PZWL",
    series: "W gabinecie lekarza specjalisty",
    review: { ...SOURCE, note: "Rok wydania i ISBN do uzupełnienia; link do katalogu wydawcy nie został podany." },
  },
  {
    id: "onkogenetyka",
    kind: "edited",
    title: "Onkogenetyka",
    description: {
      pl: "Publikacja poświęcona dziedzicznym predyspozycjom do nowotworów i diagnostyce molekularnej.",
      en: "A publication on hereditary cancer predisposition and molecular diagnostics.",
    },
    review: { ...SOURCE, note: "Lista nie podaje redaktorów, wydawcy, roku ani ISBN; link do katalogu nie został podany." },
  },

  /* ── Chapters ── */
  {
    id: "rozdzial-podloze-genetyczne-asd",
    kind: "chapter",
    title: "Podłoże genetyczne ASD",
    authors: ["A. Jezela-Stanek", "T. Iwanicki"],
    inBook: { title: "Autyzm u dzieci. Wiedza kliniczna" },
    review: SOURCE,
  },
  {
    id: "rozdzial-asd-badanie-genetyczne",
    kind: "chapter",
    title: "Zaburzenia ze spektrum autyzmu – czy wymagane jest badanie genetyczne",
    authors: ["B. Kazek", "E. Emich-Widera", "A. Jezela-Stanek"],
    inBook: NEURO_BOOK,
    review: SOURCE,
  },
  {
    id: "rozdzial-terapie-spersonalizowane-padaczki",
    kind: "chapter",
    title: "Terapie spersonalizowane w leczeniu padaczek",
    authors: ["J. Paprocka", "A. Jezela-Stanek"],
    inBook: NEURO_BOOK,
    review: SOURCE,
  },
  {
    id: "rozdzial-wrodzone-zaburzenia-glikozylacji",
    kind: "chapter",
    title: "Wrodzone zaburzenia glikozylacji",
    authors: ["M. Greczan", "D. Rokicki", "A. Jezela-Stanek"],
    inBook: NEURO_BOOK,
    review: SOURCE,
  },
  {
    // Incomplete in the list: only the book title and one name were given.
    id: "rozdzial-wrodzone-choroby-metaboliczne",
    kind: "chapter",
    title: "",
    inBook: { title: "Wrodzone choroby metaboliczne w praktyce klinicznej" },
    review: {
      status: "requiresReview",
      source: "Lista publikacji przekazana 2026-11-03",
      note: "Niekompletny wpis: brak tytułu rozdziału i autorów; przy książce podano „Patryk Lipiński” (redaktor?). Uzupełnić przed publikacją.",
    },
  },

  /* ── Other ── */
  {
    id: "choroby-rzadkie-kompozytorow",
    kind: "other",
    title: "Choroby rzadkie i niewyjaśnione wśród kompozytorów muzyki klasycznej",
    authors: ["Zela A.J."],
    format: { pl: "e-book (PDF), wydanie własne", en: "e-book (PDF), self-published" },
    review: SOURCE,
  },
];

export const bookKindOrder: BookKind[] = ["edited", "chapter", "other"];

import type { L10n, Review } from "./types";

/**
 * Privacy notice and GDPR (RODO) information clause.
 *
 * Keep this text true to how the site actually works:
 *  - If analytics, embeds, forms or cookies are ever added, update it FIRST
 *    (and assess whether a consent banner becomes necessary).
 *  - `hosting` describes GitHub Pages. If the site moves to Vercel or another
 *    host, replace that section with the new provider's data practices.
 *  - The controller below must be confirmed by the professor (it could be the
 *    People4People Foundation if the mailbox is administered by it).
 */

export const privacyReview: Review = {
  status: "verified",
  source: "Prośba o klauzulę RODO (2026-10-28); działanie strony zweryfikowane w kodzie; GitHub Pages docs",
  checkedAt: "2026-10-28",
  note: "Tożsamość administratora (Prof. vs Fundacja People4People) do potwierdzenia.",
};

export const privacyUpdated = { iso: "2026-10-28", pl: "28 października 2026 r.", en: "28 October 2026" };

export const controller = {
  name: { pl: "prof. dr hab. n. med. Aleksandra Jezela-Stanek", en: "Prof. Aleksandra Jezela-Stanek, MD, PhD" } satisfies L10n,
  email: "badania@fundacja-p4p.com",
};

export interface PrivacySection {
  id: string;
  title: L10n;
  paragraphs: L10n[];
  list?: L10n[];
  /** Optional reference link shown under the section. */
  link?: { label: L10n; href: string };
}

export const privacyLead: L10n = {
  pl: "Jakie dane są — i jakie nie są — przetwarzane w związku z korzystaniem z tej strony oraz z kontaktem e-mailowym.",
  en: "What data is — and is not — processed when you use this website or get in touch by email.",
};

export const privacySections: PrivacySection[] = [
  {
    id: "brak-danych",
    title: { pl: "Strona nie zbiera danych o odwiedzających", en: "This website does not collect data about visitors" },
    paragraphs: [
      {
        pl: "Nie przechowujemy żadnych informacji o osobach odwiedzających stronę. Nie tworzymy profili, nie zapisujemy historii przeglądania i nie identyfikujemy odwiedzających.",
        en: "We do not store any information about people who visit this website. We do not build profiles, record browsing history or identify visitors.",
      },
      {
        pl: "Strona nie używa plików cookie ani podobnych technologii, dlatego nie wyświetla banera zgody na cookie.",
        en: "The website uses no cookies or similar technologies, which is why it shows no cookie consent banner.",
      },
    ],
    list: [
      {
        pl: "brak plików cookie i pamięci przeglądarki wykorzystywanej do śledzenia,",
        en: "no cookies and no browser storage used for tracking,",
      },
      { pl: "brak narzędzi analitycznych i statystyk odwiedzin,", en: "no analytics or visitor statistics," },
      {
        pl: "brak pikseli śledzących, reklam i wtyczek mediów społecznościowych,",
        en: "no tracking pixels, advertising or social media plug-ins,",
      },
      { pl: "brak formularzy, kont użytkowników i możliwości przesyłania plików,", en: "no forms, user accounts or file uploads," },
      {
        pl: "czcionki i grafiki są serwowane z tego samego serwera co strona — przeglądarka nie łączy się w tym celu z usługami zewnętrznymi.",
        en: "fonts and graphics are served from the same server as the website — your browser does not contact third-party services for them.",
      },
    ],
  },
  {
    id: "hosting",
    title: { pl: "Dane techniczne po stronie dostawcy hostingu", en: "Technical data held by the hosting provider" },
    paragraphs: [
      {
        pl: "Strona jest udostępniana za pośrednictwem usługi GitHub Pages (GitHub, Inc.). Jak informuje GitHub, przy każdym wejściu na stronę hostowaną w GitHub Pages adres IP odwiedzającego jest rejestrowany i przechowywany w celach bezpieczeństwa — niezależnie od tego, czy odwiedzający ma konto w GitHub.",
        en: "The website is served through GitHub Pages (GitHub, Inc.). According to GitHub, whenever a site hosted on GitHub Pages is visited, the visitor's IP address is logged and stored for security purposes, whether or not the visitor has a GitHub account.",
      },
      {
        pl: "Te dane przetwarza GitHub na zasadach opisanych w swoim oświadczeniu o ochronie prywatności. Nie mamy do nich dostępu i z nich nie korzystamy.",
        en: "GitHub processes this data under its own privacy statement. We have no access to it and do not use it.",
      },
    ],
    link: {
      label: { pl: "GitHub — oświadczenie o ochronie prywatności", en: "GitHub General Privacy Statement" },
      href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
    },
  },
  {
    id: "rodo",
    title: { pl: "Kontakt e-mail — klauzula informacyjna RODO", en: "Email contact — GDPR information notice" },
    paragraphs: [
      {
        pl: "Poniższa informacja wynika z art. 13 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) i dotyczy wyłącznie danych przekazanych w wiadomości e-mail.",
        en: "The following information is provided under Article 13 of Regulation (EU) 2016/679 (GDPR) and concerns only data you send by email.",
      },
    ],
  },
];

/** Art. 13 GDPR facts, rendered as a definition list. */
export const gdprClause: { term: L10n; detail: L10n }[] = [
  {
    term: { pl: "Administrator danych", en: "Data controller" },
    detail: {
      pl: `Administratorem danych osobowych przekazanych w korespondencji e-mail jest ${controller.name.pl}. W sprawach dotyczących danych osobowych można pisać na adres ${controller.email}.`,
      en: `The controller of personal data sent by email is ${controller.name.en}. For data protection matters, write to ${controller.email}.`,
    },
  },
  {
    term: { pl: "Zakres danych", en: "Data processed" },
    detail: {
      pl: "Wyłącznie dane, które sam(a) Pan/Pani przekaże w wiadomości — zwykle imię i nazwisko, adres e-mail oraz treść korespondencji.",
      en: "Only the data you choose to include in your message — usually your name, email address and the content of the correspondence.",
    },
  },
  {
    term: { pl: "Cel i podstawa prawna", en: "Purpose and legal basis" },
    detail: {
      pl: "Udzielenie odpowiedzi i prowadzenie korespondencji — na podstawie prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO). Jeżeli korespondencja dotyczy nawiązania współpracy — podjęcie działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).",
      en: "Replying to you and conducting the correspondence — on the basis of the controller's legitimate interest (Art. 6(1)(f) GDPR). Where the correspondence concerns starting a collaboration — taking steps prior to entering into a contract (Art. 6(1)(b) GDPR).",
    },
  },
  {
    term: { pl: "Dane o zdrowiu", en: "Health data" },
    detail: {
      pl: "Prosimy nie przesyłać zwykłą pocztą e-mail dokumentacji medycznej, wyników badań ani innych informacji o stanie zdrowia. Jeżeli ich przekazanie okaże się potrzebne, bezpieczny sposób przekazania i podstawa przetwarzania zostaną ustalone indywidualnie.",
      en: "Please do not send medical records, test results or other health information by ordinary email. If sharing them becomes necessary, a secure method and the legal basis will be agreed individually.",
    },
  },
  {
    term: { pl: "Odbiorcy danych", en: "Recipients" },
    detail: {
      pl: "Dane mogą być przetwarzane przez dostawców usług poczty elektronicznej i usług IT działających na rzecz administratora — wyłącznie w zakresie niezbędnym do obsługi korespondencji. Skrzynka kontaktowa działa w domenie Fundacji People4People.",
      en: "Data may be processed by email and IT service providers acting for the controller, only as far as needed to handle the correspondence. The contact mailbox runs on the People4People Foundation's domain.",
    },
  },
  {
    term: { pl: "Okres przechowywania", en: "Retention" },
    detail: {
      pl: "Przez czas prowadzenia korespondencji, a następnie przez okres niezbędny do ewentualnego ustalenia, dochodzenia lub obrony roszczeń albo do czasu skutecznego wniesienia sprzeciwu.",
      en: "For as long as the correspondence continues, and afterwards for the period needed to establish, pursue or defend possible claims, or until an objection is upheld.",
    },
  },
  {
    term: { pl: "Pani/Pana prawa", en: "Your rights" },
    detail: {
      pl: "Przysługuje Pani/Panu prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie.",
      en: "You have the right to access, rectify and erase your data, to restrict processing, to data portability, and to object to processing based on legitimate interest.",
    },
  },
  {
    term: { pl: "Skarga do organu nadzorczego", en: "Complaint" },
    detail: {
      pl: "Przysługuje Pani/Panu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, uodo.gov.pl).",
      en: "You may lodge a complaint with the President of the Personal Data Protection Office (UODO), ul. Stawki 2, 00-193 Warsaw, Poland (uodo.gov.pl).",
    },
  },
  {
    term: { pl: "Dobrowolność", en: "Voluntary provision" },
    detail: {
      pl: "Podanie danych jest dobrowolne, ale niezbędne do udzielenia odpowiedzi. Dane nie służą do zautomatyzowanego podejmowania decyzji ani profilowania.",
      en: "Providing data is voluntary but necessary for a reply. The data is not used for automated decision-making or profiling.",
    },
  },
];

export const privacyChanges: L10n = {
  pl: "Informacja zostanie zaktualizowana przed każdą zmianą sposobu działania strony, która wpływałaby na przetwarzanie danych — np. przed wprowadzeniem narzędzi analitycznych.",
  en: "This notice will be updated before any change to the website that would affect data processing — for example, before any analytics is introduced.",
};

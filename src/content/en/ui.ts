import type { Dictionary } from "../index";

/**
 * English interface copy — DRAFT, awaiting the professor's approval.
 * English routes are built only with NEXT_PUBLIC_ENABLE_EN=1 (see README).
 */
export const en: Dictionary = {
  meta: {
    siteName: "Prof. Aleksandra Jezela-Stanek",
    pages: {
      home: {
        title: "Prof. Aleksandra Jezela-Stanek — clinical genetics, pulmogenetics, rare diseases",
        description:
          "Prof. Aleksandra Jezela-Stanek, MD, PhD — specialist in clinical genetics. Pulmogenetics, rare diseases, oncogenetics, pharmacogenetics and molecular diagnostics.",
      },
      about: {
        title: "About",
        description:
          "Biography of Prof. Aleksandra Jezela-Stanek: clinical genetics, National Institute of Tuberculosis and Lung Diseases, collaboration with the Medical University of Lodz and the Silesian Academy.",
      },
      expertise: {
        title: "Areas of expertise",
        description:
          "Oncogenetics, rare diseases, carrier testing, WES and WGS sequencing, RNA analysis, pharmacogenetics and the interpretation of genetic test results.",
      },
      research: {
        title: "Research",
        description:
          "Research areas of Prof. Aleksandra Jezela-Stanek: pulmogenetics, rare and ultra-rare diseases, oncogenetics, pharmacogenetics and molecular diagnostics.",
      },
      publications: {
        title: "Publications",
        description:
          "Selected scientific publications of Prof. Aleksandra Jezela-Stanek and her Google Scholar, PubMed and ORCID profiles.",
      },
      privacy: {
        title: "Privacy and GDPR",
        description:
          "Privacy notice: this website uses no cookies and stores no data about visitors. GDPR information notice for email contact.",
      },
      contact: {
        title: "Collaboration and contact",
        description: "Contact regarding scientific and professional collaboration with Prof. Aleksandra Jezela-Stanek.",
      },
    },
  },
  nav: {
    home: "Home",
    about: "About",
    expertise: "Expertise",
    research: "Research",
    publications: "Publications",
    contact: "Collaboration & contact",
    menu: "Menu",
    close: "Close",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primary: "Main navigation",
    skipToContent: "Skip to content",
    language: "Language",
    breadcrumb: "Breadcrumb",
  },
  hero: {
    ctaPrimary: "Explore the research",
    ctaSecondary: "Areas of expertise",
    categoriesLabel: "Main areas",
    affiliationLabel: "National Institute of Tuberculosis and Lung Diseases · Warsaw",
  },
  intro: {
    eyebrow: "Science and clinical practice",
    title: "Science that finds its place in medicine",
    lead: "Clinical genetics connects knowledge of the genome with everyday medical practice. Its aim is not only to reach a diagnosis but to turn a test result into concrete, well-founded recommendations for the patient, their family and their physicians.",
    points: [
      { title: "Clinical and molecular diagnostics", text: "Clinical assessment combined with the choice of appropriate genetic tests." },
      { title: "Interpreting results", text: "Assessing detected variants in the context of symptoms and family history." },
      { title: "From knowledge to recommendations", text: "Turning results into diagnostic, preventive and therapeutic recommendations." },
      { title: "Rare diseases", text: "Research into rare and ultra-rare diseases with a genetic basis." },
      { title: "Research partnerships", text: "Collaboration with academic, clinical and research centres in Poland and abroad." },
      { title: "Personalised medicine", text: "Contributing to approaches that take the patient's genetic profile into account." },
    ],
  },
  research: {
    eyebrow: "Research",
    title: "Science and research",
    lead: "The areas of my scientific and clinical work. Pulmogenetics — the genetic basis of lung disease, including rare disorders — holds a special place.",
    areasNote: "These are fields of scientific interest. Information about specific research projects is published once confirmed.",
    featuredLabel: "Lead area",
    readMore: "More about this area",
    allAreas: "All research areas",
    topicsTitle: "Topics",
    relatedPublications: "Selected publications in this area",
    noPublications: "Selected publications in this area will be added soon. The full record is available in the scholarly profiles.",
    projectsTitle: "Research projects",
    projectStatus: { planned: "Planned", ongoing: "Ongoing", completed: "Completed" },
    projectFields: {
      objective: "Objective",
      institutions: "Institutions and partners",
      role: "Role",
      funding: "Funding",
      period: "Period",
      publications: "Publications",
    },
    otherAreas: "Other areas",
    backToResearch: "Research",
  },
  about: {
    eyebrow: "Biography",
    title: "About",
    readMore: "Full biography",
    affiliationsTitle: "Affiliations",
    kinds: { current: "Current", collaboration: "Collaboration", previous: "Previously" },
    timelineTitle: "Career",
    profilesTitle: "Scholarly profiles",
    educationTitle: "Qualifications",
    qualifications: [
      "Professor, habilitated doctor of medical sciences",
      "Specialist in clinical genetics",
      "MBA in healthcare with clinical research",
    ],
  },
  expertise: {
    eyebrow: "Clinical practice",
    title: "Areas of expertise",
    lead: "The competences of a clinical geneticist — from referral for testing and its interpretation to individual recommendations. The descriptions explain each field in terms that patients and families can follow.",
    seeAll: "Full scope of expertise",
  },
  publications: {
    eyebrow: "Scholarly output",
    title: "Publications",
    lead: "A selection of publications in pulmogenetics, rare diseases, oncogenetics and molecular diagnostics. The complete, up-to-date record is available in the scholarly profiles.",
    profilesTitle: "Scholarly profiles",
    selectedTitle: "Selected publications",
    seeAll: "All selected publications",
    authorsMore: (count: number) => `et al. (${count} authors in total)`,
    authorsTotal: (count: number) => `${count} authors in total`,
    polishArticle: "article in Polish",
    filters: {
      label: "Filter publications",
      year: "Year",
      category: "Area",
      type: "Type",
      all: "All",
      reset: "Clear filters",
      results: (n: number) => (n === 1 ? "1 publication" : `${n} publications`),
      empty: "No publications match the selected criteria.",
    },
    monographsTitle: "Monographs and chapters",
    monographsPending: "The list of monographs and chapters will be added.",
    sourceNote: "Bibliographic data from PubMed.",
  },
  partners: {
    eyebrow: "Collaboration",
    title: "Scientific collaboration and partnerships",
    lead: "Scientific and clinical work is carried out in collaboration with academic centres, research institutions and diagnostic laboratories. This is an independent, personal website.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Collaboration and contact",
    lead: "I welcome enquiries about scientific and professional collaboration — research projects, genetic analyses and the interpretation of test results.",
    emailLabel: "Email",
    write: "Write an email",
    copy: "Copy address",
    copied: "Copied",
    scopeTitle: "Scope and fees",
    scope:
      "The scope of collaboration and fees are agreed individually, depending on the nature of the analysis, the interpretation of results or the research project.",
    securityTitle: "Medical records",
    security:
      "Please do not send medical records or test results by ordinary email. A secure way to share documents will be agreed individually.",
    privacyLink: "How your data is handled (GDPR)",
    domainNote:
      "The contact address uses the People4People Foundation's domain at Prof. Jezela-Stanek's request. This remains an independent, personal website.",
    topicsTitle: "Enquiries about",
    topics: [
      "Scientific collaboration and research projects",
      "Collaboration with clinical centres and laboratories",
      "Interpretation of genetic test results",
    ],
  },
  footer: {
    rights: "All rights reserved.",
    privacy: "This website uses no cookies, analytics or forms. Fonts are served locally.",
    graphics: "Scientific graphics on this website are decorative and do not show research results.",
    disclaimer: "Content is for information only and does not replace a medical consultation.",
    sitemapTitle: "Pages",
    profilesTitle: "Scholarly profiles",
    contactTitle: "Contact",
    backToTop: "Back to top",
    privacyLink: "Privacy and GDPR",
  },
  common: {
    externalLink: "(opens in a new tab)",
    requiresReview: "Needs review",
    doi: "DOI",
    pubmed: "PubMed",
  },
  privacy: {
    eyebrow: "Privacy",
    updated: "Last updated",
    changesTitle: "Changes",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has moved.",
    back: "Back to the homepage",
  },
};

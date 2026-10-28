# Content verification checklist

This website concerns medicine and science, so every fact must be traceable to a source and approved by Prof. Jezela-Stanek before publication. Run `npm run check:content` to see the current review queue.

## Status of the content (2026-10-23)

### Verified — source recorded in the data files

| Content | Source |
| --- | --- |
| Name, titles, headline, research categories, contact email | Brief from the professor |
| Current institution: Instytut Gruźlicy i Chorób Płuc, Warszawa | Brief |
| Unit: Zakład Genetyki i Immunologii Klinicznej | Public ORCID record and IGiChP website |
| Collaboration: Uniwersytet Medyczny w Łodzi, Akademia Śląska | Brief |
| Previous institution: Instytut „Pomnik – Centrum Zdrowia Dziecka” (no dates shown) | Brief |
| Collaborations: Fundacja People4People, GeneAware, 3billion, CENTOGENE | Brief; official URLs checked 2026-10-23 |
| Google Scholar and PubMed links | Brief; both URLs respond |
| ORCID 0000-0001-9814-0324 | Public ORCID record whose name and affiliations match (IGiChP, IP-CZD). **Please confirm.** |
| 11 publications | PubMed E-utilities metadata, copied 2026-10-23 |

### Hidden until confirmed (`requiresReview`)

| Item | Note |
| --- | --- |
| Timeline: IP-CZD **2001–2017** | Years from the Employment section of ORCID. Confirm before setting to `verified`. |

### Editorial texts written for the site — please read and approve

These texts describe fields of medicine in general terms or paraphrase the brief. They make no claims beyond the brief and the indexed publications, but the professor should approve the wording:

- Biography paragraphs (`src/data/profile.ts → biography`), written in the first person.
- Research area descriptions and topic lists (`src/data/research.ts`). Statements about her own work refer only to topics of her PubMed-indexed publications: SERPINA1 / alpha-1 antitrypsin deficiency, pulmonary fibrosis, glioblastoma, pancreatic cancer, rare syndromes, protein structure modelling, transcriptome analysis.
- Professional scope descriptions (`src/data/expertise.ts`).
- Section introductions and notices (`src/content/pl/ui.ts`).
- Partner relationship labels (`src/data/partners.ts`): currently generic ("Współpraca naukowa", "Współpraca w obszarze diagnostyki genomowej"…). Replace them with the exact nature of each collaboration.
- Selection of featured publications (`featured: true`): currently papers on pulmogenetics, oncogenetics and molecular diagnostics.

### English

All English texts are **drafts**. The English version is not built until `NEXT_PUBLIC_ENABLE_EN=1`.

## Still needed from the professor

1. An authorised portrait (4:5, at least 1200 × 1500 px), with the photographer credit if required.
2. Approval of the biography and the descriptions listed above.
3. Confirmation of the ORCID iD and of the IP-CZD years (for the timeline).
4. Her own list of selected publications, plus monographs and book chapters (title, publisher, year, ISBN).
5. Details of confirmed research projects, if they should be shown: title, status, role, institutions, funding, years.
6. The nature of each collaboration (People4People, GeneAware, 3billion, CENTOGENE), and permission if logos should be shown.
7. Any additional profiles to link (institutional staff page, ResearchGate, Scopus Author ID).
8. Approved English texts, if an English version is wanted.
9. The production domain.
10. Confirmation of the **data controller** in the RODO clause (`src/data/privacy.ts`): currently the professor. If the People4People Foundation administers the mailbox, it may be the controller instead. Also confirm whether the email provider transfers data outside the EEA; if so, the clause must say so.

## Checklist before every publication

- [ ] `npm run verify` passes.
- [ ] `npm run check:content` shows no errors; every item in the review queue is intentionally hidden.
- [ ] New publications were copied from PubMed, DOI or the publisher, not typed from memory. DOI and PMID links open the right paper.
- [ ] New facts (dates, roles, projects, funding) have a recorded `source`.
- [ ] Nothing implies a guaranteed diagnosis, outcome or eligibility for testing.
- [ ] No patient stories, testimonials or images used without consent.
- [ ] Third-party logos and photos have recorded permission.
- [ ] English texts, if enabled, were approved by the professor.
- [ ] The privacy page still matches reality: hosting provider, no cookies or analytics, controller.
- [ ] `NEXT_PUBLIC_SITE_URL` points to the production domain; `/robots.txt` and `/sitemap.xml` show it.

import { identity, scholarlyProfiles } from "@/data/profile";
import { getPublications, getResearchAreas, publishable, t } from "@/lib/content";
import { researchAreaPath, route } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — an optional, experimental Markdown guide for language models
 * (https://llmstxt.org). Supplementary to robots.txt, the sitemap and JSON-LD;
 * not every provider reads it. Built only from published content.
 */
export function GET() {
  const areas = getResearchAreas();
  const pubs = getPublications().filter((p) => p.featured);
  const body = [
    `# ${identity.honorificPrefix} ${identity.fullName}`,
    "",
    `> Personal academic website of Prof. ${identity.fullName} — specialist in clinical genetics (${t(identity.title, "pl")}). It presents verified research areas, clinical genetics expertise, selected publications and professional collaborations. Primary language: Polish.`,
    "",
    "Research interests: clinical and medical genetics, pulmogenetics (genetic basis of lung disease), rare and ultra-rare diseases, oncogenetics, pharmacogenetics, molecular diagnostics and genomic sequencing (WES, WGS, RNA analysis).",
    "",
    "Current institution: Instytut Gruźlicy i Chorób Płuc (National Institute of Tuberculosis and Lung Diseases), Department of Genetics and Clinical Immunology, Warsaw, Poland.",
    "",
    "## Main sections",
    "",
    `- [O mnie / About](${absoluteUrl(route("pl", "about"))}): biography and affiliations`,
    `- [Nauka i projekty / Research](${absoluteUrl(route("pl", "research"))}): research areas`,
    `- [Zakres działalności / Areas of expertise](${absoluteUrl(route("pl", "expertise"))}): clinical genetics services described in general terms`,
    `- [Publikacje / Publications](${absoluteUrl(route("pl", "publications"))}): curated bibliography with DOI and PMID`,
    `- [Współpraca i kontakt / Contact](${absoluteUrl(route("pl", "contact"))}): email contact for collaboration`,
    "",
    "## Research areas",
    "",
    ...areas.map((a) => `- [${t(a.title, "pl")} (${a.schemaTerm})](${absoluteUrl(researchAreaPath("pl", a.slug))}): ${t(a.summary, "en")}`),
    "",
    "## Scientific profiles",
    "",
    ...publishable(scholarlyProfiles).map((p) => `- [${p.label}](${p.url})`),
    "",
    "## Selected publications",
    "",
    ...pubs.map((p) => `- ${p.title} ${p.venue}, ${p.year}.${p.doi ? ` https://doi.org/${p.doi}` : ""}`),
    "",
    "## Notes",
    "",
    "- Research areas are fields of scientific interest, not a list of funded projects.",
    "- The website does not provide medical advice or interpret individual results.",
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResearchArea, getResearchAreas, t } from "@/lib/content";
import { researchAreaPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { ResearchAreaPage } from "@/components/pages/ResearchPages";

// Static export: every research area is generated at build time, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return getResearchAreas().map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const area = getResearchArea((await params).slug);
  if (!area) return {};
  return buildMetadata({
    locale: "pl",
    path: researchAreaPath("pl", area.slug),
    title: t(area.title, "pl"),
    description: t(area.summary, "pl"),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const area = getResearchArea((await params).slug);
  if (!area) notFound();
  return <ResearchAreaPage area={area} locale="pl" />;
}

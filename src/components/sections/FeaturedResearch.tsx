import { Info } from "lucide-react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { getResearchAreas, getResearchProjects } from "@/lib/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { FeaturedResearchCard, ProjectCard, ResearchCard } from "@/components/research/ResearchCards";

export function FeaturedResearch({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).research;
  const areas = getResearchAreas();
  const featured = areas.find((a) => a.featured) ?? areas[0];
  const others = areas.filter((a) => a !== featured);
  const projects = getResearchProjects();

  return (
    <Section id="nauka" tone="navy" labelledBy="research-title" className="overflow-hidden">
      <Container>
        <SectionHeading id="research-title" eyebrow={dict.eyebrow} title={dict.title} lead={dict.lead} align="split" className="reveal" />

        {featured && (
          <div className="mt-16 lg:mt-20">
            <FeaturedResearchCard area={featured} locale={locale} />
          </div>
        )}

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((area) => (
            <ResearchCard key={area.slug} area={area} locale={locale} />
          ))}
        </div>

        {projects.length > 0 && (
          <div className="mt-20">
            <h3 className="t-h3">{dict.projectsTitle}</h3>
            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </div>
        )}

        <p className="mt-16 flex max-w-3xl gap-3 border-t border-line-inverse pt-6 text-sm leading-relaxed text-ivory/65">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.6} />
          {dict.areasNote}
        </p>
      </Container>
    </Section>
  );
}

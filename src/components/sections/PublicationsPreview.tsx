import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { getFeaturedPublications } from "@/lib/content";
import { route } from "@/lib/routes";
import { ArrowLink, Container, Section, SectionHeading } from "@/components/ui/primitives";
import { ProfileLinks } from "@/components/publications/ProfileLinks";
import { PublicationItem } from "@/components/publications/PublicationItem";

export function PublicationsPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).publications;
  const featured = getFeaturedPublications();

  return (
    <Section tone="ivory" labelledBy="publications-title">
      <Container>
        <SectionHeading
          id="publications-title"
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
          align="split"
          className="reveal"
        />

        <div className="reveal mt-14">
          <h3 className="sr-only">{dict.profilesTitle}</h3>
          <ProfileLinks locale={locale} />
        </div>

        {featured.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="t-h3">{dict.selectedTitle}</h3>
              <p className="text-sm text-slate-ink">{dict.sourceNote}</p>
            </div>
            <div className="mt-6 border-b border-line">
              {featured.map((p) => (
                <PublicationItem key={p.id} p={p} locale={locale} headingLevel={4} />
              ))}
            </div>
            <ArrowLink href={route(locale, "publications")} className="mt-10">
              {dict.seeAll}
            </ArrowLink>
          </div>
        )}
      </Container>
    </Section>
  );
}

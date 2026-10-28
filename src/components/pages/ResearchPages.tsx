import { Info } from "lucide-react";
import type { Locale, ResearchArea } from "@/data/types";
import { getDictionary } from "@/content";
import { getPublicationsByCategory, getResearchAreas, getResearchProjects, t } from "@/lib/content";
import { researchAreaPath, route } from "@/lib/routes";
import { ArrowLink, Container, ReviewBadge, Section, Tag, cx } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";
import { ResearchGraphicFor } from "@/components/graphics/ResearchGraphics";
import { ProjectCard, ResearchCard } from "@/components/research/ResearchCards";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { ProfileLinks } from "@/components/publications/ProfileLinks";

/* ───────────── /nauka-i-projekty ───────────── */

export function ResearchIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const areas = getResearchAreas();
  const projects = getResearchProjects();

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: dict.nav.research, path: route(locale, "research") }]}
        eyebrow={dict.research.eyebrow}
        title={dict.research.title}
        lead={dict.research.lead}
      />

      <Section tone="navy" className="overflow-hidden">
        <Container>
          <ol className="space-y-24 lg:space-y-32">
            {areas.map((area, i) => (
              <li key={area.slug} className="reveal grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={cx("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                  <ResearchGraphicFor
                    graphic={area.graphic}
                    tone={area.featured ? "gold" : "ivory"}
                    className={cx("mx-auto h-auto w-full max-w-[460px]", area.featured ? "opacity-90" : "opacity-60")}
                  />
                </div>
                <div className={cx("lg:col-span-6", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                  <p className="eyebrow">
                    {String(i + 1).padStart(2, "0")}
                    {area.featured && ` · ${dict.research.featuredLabel}`}
                  </p>
                  <h2 className="t-h2 mt-4">
                    {t(area.title, locale)}
                    <ReviewBadge item={area} locale={locale} />
                  </h2>
                  <p className="t-lead mt-5">{t(area.summary, locale)}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <Tag key={tag.pl} inverse>
                        {t(tag, locale)}
                      </Tag>
                    ))}
                  </div>
                  <ArrowLink href={researchAreaPath(locale, area.slug)} className="mt-9">
                    {dict.research.readMore}
                    <span className="sr-only">: {t(area.title, locale)}</span>
                  </ArrowLink>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-24 flex max-w-3xl gap-3 border-t border-line-inverse pt-6 text-sm leading-relaxed text-ivory/65">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.6} />
            {dict.research.areasNote}
          </p>
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section tone="ivory">
          <Container>
            <h2 className="t-h2">{dict.research.projectsTitle}</h2>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}

/* ───────────── /nauka-i-projekty/[slug] ───────────── */

export function ResearchAreaPage({ area, locale }: { area: ResearchArea; locale: Locale }) {
  const dict = getDictionary(locale);
  const pubs = getPublicationsByCategory(area.publicationCategories);
  const projects = getResearchProjects(area.slug);
  const others = getResearchAreas().filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[
          { name: dict.nav.research, path: route(locale, "research") },
          { name: t(area.title, locale), path: researchAreaPath(locale, area.slug) },
        ]}
        eyebrow={area.featured ? `${dict.research.eyebrow} · ${dict.research.featuredLabel}` : dict.research.eyebrow}
        title={t(area.title, locale)}
        lead={t(area.summary, locale)}
      />

      <Section tone="ivory">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="prose-academic text-[1.0938rem] leading-[1.75] text-ink/90">
              {area.body.map((p, i) => (
                <p key={i}>{t(p, locale)}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <Tag key={tag.pl}>{t(tag, locale)}</Tag>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="bg-navy p-8 text-ivory surface-dark">
              <ResearchGraphicFor graphic={area.graphic} tone="gold" className="h-auto w-full opacity-80" />
            </div>
            <h2 className="eyebrow mt-10 mb-1">{dict.research.topicsTitle}</h2>
            <ul className="border-t border-line">
              {area.topics.map((topic) => (
                <li key={topic.pl} className="border-b border-line py-4 font-serif text-[1.2rem] leading-snug text-navy">
                  {t(topic, locale)}
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section tone="paper">
          <Container>
            <h2 className="t-h2">{dict.research.projectsTitle}</h2>
            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="paper" className="border-t border-line">
        <Container>
          <h2 className="t-h2">{dict.research.relatedPublications}</h2>
          {pubs.length > 0 ? (
            <div className="mt-10 border-b border-line">
              {pubs.map((p) => (
                <PublicationItem key={p.id} p={p} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="mt-8 max-w-3xl">
              <p className="t-lead">{dict.research.noPublications}</p>
              <div className="mt-10">
                <ProfileLinks locale={locale} />
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="t-h2">{dict.research.otherAreas}</h2>
            <ArrowLink href={route(locale, "research")}>{dict.research.allAreas}</ArrowLink>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((a) => (
              <ResearchCard key={a.slug} area={a} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

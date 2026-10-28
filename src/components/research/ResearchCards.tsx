import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale, ResearchArea, ResearchProject } from "@/data/types";
import { getDictionary } from "@/content";
import { getResearchAreas, t } from "@/lib/content";
import { researchAreaPath } from "@/lib/routes";
import { ArrowLink, ReviewBadge, Tag, cx } from "@/components/ui/primitives";
import { ResearchGraphicFor } from "@/components/graphics/ResearchGraphics";

/** Large card for the lead research area (pulmogenetics). */
export function FeaturedResearchCard({ area, locale, headingLevel = 3 }: { area: ResearchArea; locale: Locale; headingLevel?: 2 | 3 }) {
  const dict = getDictionary(locale);
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="reveal grid items-center gap-10 border border-line-inverse bg-navy-soft/60 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
      <div className="relative order-2 lg:order-1 lg:col-span-6">
        <ResearchGraphicFor graphic={area.graphic} tone="gold" className="mx-auto h-auto w-full max-w-[520px] opacity-90" />
      </div>
      <div className="order-1 lg:order-2 lg:col-span-6">
        <p className="eyebrow">{dict.research.featuredLabel}</p>
        <H className="t-h2 mt-4">
          {t(area.title, locale)}
          <ReviewBadge item={area} locale={locale} />
        </H>
        <p className="t-lead mt-5">{t(area.summary, locale)}</p>
        <ul className="mt-8 space-y-3 border-t border-line-inverse pt-6">
          {area.topics.map((topic) => (
            <li key={topic.pl} className="flex gap-3 text-[0.98rem] text-ivory/85">
              <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rotate-45 border border-gold-light" />
              {t(topic, locale)}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {area.tags.map((tag) => (
            <Tag key={tag.pl} inverse>
              {t(tag, locale)}
            </Tag>
          ))}
        </div>
        <ArrowLink href={researchAreaPath(locale, area.slug)} className="mt-10">
          {dict.research.readMore}
          <span className="sr-only">: {t(area.title, locale)}</span>
        </ArrowLink>
      </div>
    </article>
  );
}

/** Compact card; the whole card is clickable through a stretched title link. */
export function ResearchCard({ area, locale, inverse = true }: { area: ResearchArea; locale: Locale; inverse?: boolean }) {
  const dict = getDictionary(locale);
  return (
    <article className={cx("reveal group relative flex flex-col border-t pt-6", inverse ? "border-line-inverse" : "border-line")}>
      <div className={cx("mb-7 flex h-36 items-end transition-opacity duration-500", "opacity-50 group-hover:opacity-80")}>
        <ResearchGraphicFor
          graphic={area.graphic}
          tone={inverse ? "ivory" : "navy"}
          className="h-full w-auto max-w-full object-contain object-left-bottom"
        />
      </div>
      <h3 className="font-serif text-[1.65rem] leading-tight">
        <Link
          href={researchAreaPath(locale, area.slug)}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold-light"
        >
          {t(area.title, locale)}
        </Link>
        <ReviewBadge item={area} locale={locale} />
      </h3>
      <p className={cx("mt-3 flex-1 text-[0.98rem] leading-relaxed", inverse ? "text-ivory/75" : "text-slate-ink")}>
        {t(area.summary, locale)}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {area.tags.slice(0, 2).map((tag) => (
          <Tag key={tag.pl} inverse={inverse}>
            {t(tag, locale)}
          </Tag>
        ))}
      </div>
      <span
        aria-hidden
        className={cx("mt-6 inline-flex items-center gap-2 text-sm font-semibold", inverse ? "text-gold-light" : "text-gold-ink")}
      >
        {dict.research.readMore}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
      </span>
    </article>
  );
}

/** A confirmed research project; optional facts are omitted when absent. */
export function ProjectCard({ project, locale }: { project: ResearchProject; locale: Locale }) {
  const dict = getDictionary(locale).research;
  const area = getResearchAreas().find((a) => a.slug === project.area);
  const period = project.startYear && (project.endYear ? `${project.startYear}–${project.endYear}` : `${project.startYear}–`);
  const facts: [string, string][] = [];
  if (project.objective) facts.push([dict.projectFields.objective, t(project.objective, locale)]);
  if (project.institutions?.length) facts.push([dict.projectFields.institutions, project.institutions.map((i) => t(i, locale)).join(", ")]);
  if (project.role) facts.push([dict.projectFields.role, t(project.role, locale)]);
  if (project.funding) facts.push([dict.projectFields.funding, t(project.funding, locale)]);
  if (period) facts.push([dict.projectFields.period, period]);

  return (
    <article className="reveal border-t border-line pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <Tag>{dict.projectStatus[project.status]}</Tag>
        {area && <span className="text-sm text-slate-ink">{t(area.title, locale)}</span>}
        <ReviewBadge item={project} locale={locale} />
      </div>
      <h3 className="t-h3 mt-4">{t(project.title, locale)}</h3>
      <p className="mt-3 max-w-[var(--measure)] text-slate-ink">{t(project.description, locale)}</p>
      {facts.length > 0 && (
        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-1 text-[0.98rem]">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

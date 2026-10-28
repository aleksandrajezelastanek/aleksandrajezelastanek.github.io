import { CircleAlert } from "lucide-react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { expertise, expertiseNotice } from "@/data/expertise";
import { publishable, t } from "@/lib/content";
import { route } from "@/lib/routes";
import { ArrowLink, Container, ReviewBadge, Section, SectionHeading } from "@/components/ui/primitives";

export function ExpertiseNotice({ locale }: { locale: Locale }) {
  return (
    <p className="flex max-w-3xl gap-3 border-l-2 border-gold py-1 pl-5 text-[0.95rem] leading-relaxed text-slate-ink">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" strokeWidth={1.6} />
      {t(expertiseNotice, locale)}
    </p>
  );
}

export function ExpertiseGrid({ locale, headingLevel = 3 }: { locale: Locale; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
      {publishable(expertise).map((item, i) => (
        <li key={item.id} id={item.id} className="reveal border-t border-line pt-6 pb-10">
          <span aria-hidden className="font-serif text-[1.05rem] text-gold-ink italic">
            {String(i + 1).padStart(2, "0")}
          </span>
          <H className="mt-3 font-serif text-[1.5rem] leading-snug">
            {t(item.title, locale)}
            <ReviewBadge item={item} locale={locale} />
          </H>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-ink">{t(item.description, locale)}</p>
        </li>
      ))}
    </ol>
  );
}

export function ExpertiseSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).expertise;
  return (
    <Section tone="paper" labelledBy="expertise-title">
      <Container>
        <SectionHeading id="expertise-title" eyebrow={dict.eyebrow} title={dict.title} lead={dict.lead} align="split" className="reveal" />
        <div className="mt-16 lg:mt-20">
          <ExpertiseGrid locale={locale} />
        </div>
        <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <ExpertiseNotice locale={locale} />
          <ArrowLink href={route(locale, "expertise")} className="shrink-0">
            {dict.seeAll}
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}

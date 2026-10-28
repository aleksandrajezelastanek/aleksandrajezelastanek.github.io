import type { Affiliation, Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { affiliations, biography } from "@/data/profile";
import { publishable, t } from "@/lib/content";
import { route } from "@/lib/routes";
import { ArrowLink, Container, ExternalLink, ReviewBadge, Section, cx } from "@/components/ui/primitives";

export function AffiliationList({ locale, className }: { locale: Locale; className?: string }) {
  const dict = getDictionary(locale).about;
  const items: Affiliation[] = publishable(affiliations);
  return (
    <ul className={cx("border-t border-line", className)}>
      {items.map((a) => (
        <li key={a.id} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
          <span className="eyebrow pt-1 text-[0.68rem]">{dict.kinds[a.kind]}</span>
          <div>
            <p className="font-serif text-[1.35rem] leading-snug text-navy">
              {a.url ? (
                <ExternalLink locale={locale} href={a.url} className="link-quiet">
                  {t(a.name, locale)}
                </ExternalLink>
              ) : (
                t(a.name, locale)
              )}
              <ReviewBadge item={a} locale={locale} />
            </p>
            <p className="mt-0.5 text-[0.95rem] text-slate-ink">
              {a.unit ? `${t(a.unit, locale)} · ` : ""}
              {t(a.city, locale)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Qualifications({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).about;
  return (
    <div>
      <h3 className="eyebrow">{dict.educationTitle}</h3>
      <ul className="mt-5 space-y-3">
        {dict.qualifications.map((q) => (
          <li key={q} className="flex gap-3 font-serif text-[1.25rem] leading-snug text-navy">
            <span aria-hidden className="mt-[0.6em] h-px w-5 shrink-0 bg-gold" />
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).about;
  return (
    <Section tone="ivory" labelledBy="about-title">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-4">
          <p className="eyebrow mb-5">{dict.eyebrow}</p>
          <h2 id="about-title" className="t-h2">
            {dict.title}
          </h2>
          <div className="mt-10 lg:mt-14">
            <Qualifications locale={locale} />
          </div>
        </div>

        <div className="reveal lg:col-span-7 lg:col-start-6">
          <div className="space-y-5">
            {biography.short.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "font-serif text-[clamp(1.4rem,1.15rem+0.9vw,1.85rem)] leading-[1.35] text-navy"
                    : "text-[1.0625rem] leading-relaxed text-ink/85"
                }
              >
                {t(p, locale)}
              </p>
            ))}
          </div>
          <h3 className="eyebrow mt-12 mb-1">{dict.affiliationsTitle}</h3>
          <AffiliationList locale={locale} />
          <ArrowLink href={route(locale, "about")} className="mt-10">
            {dict.readMore}
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}

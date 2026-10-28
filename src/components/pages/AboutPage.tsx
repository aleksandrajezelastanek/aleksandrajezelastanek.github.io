import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { biography, identity, timeline } from "@/data/profile";
import { publishable, t } from "@/lib/content";
import { route } from "@/lib/routes";
import { personJsonLd } from "@/lib/seo";
import { ButtonLink, Container, ReviewBadge, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { AffiliationList, Qualifications } from "@/components/sections/AboutPreview";
import { ProfileLinks } from "@/components/publications/ProfileLinks";
import { ContactSection } from "@/components/sections/ContactSection";

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const entries = publishable(timeline);

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <PageHeader
        locale={locale}
        crumbs={[{ name: dict.nav.about, path: route(locale, "about") }]}
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        lead={`${identity.honorificPrefix} ${identity.fullName} — ${t(identity.title, locale).charAt(0).toLowerCase()}${t(identity.title, locale).slice(1)}.`}
      />

      <Section tone="ivory">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="prose-academic text-[1.0938rem] leading-[1.75] text-ink/90 lg:col-span-7">
            {biography.long.map((p, i) => (
              <p key={i}>{t(p, locale)}</p>
            ))}
          </div>

          <aside className="space-y-14 lg:col-span-4 lg:col-start-9">
            <Qualifications locale={locale} />
            <div>
              <h2 className="eyebrow mb-1">{dict.about.affiliationsTitle}</h2>
              <AffiliationList locale={locale} />
            </div>
          </aside>
        </Container>

        {entries.length > 0 && (
          <Container className="mt-24">
            <h2 className="t-h3">{dict.about.timelineTitle}</h2>
            <ol className="mt-8 border-l border-line-strong pl-8">
              {entries
                .sort((a, b) => a.year - b.year)
                .map((e) => (
                  <li key={`${e.year}-${e.title.pl}`} className="relative pb-10 last:pb-0">
                    <span aria-hidden className="absolute top-2 -left-[2.32rem] size-2.5 rotate-45 border border-gold bg-ivory" />
                    <p className="font-serif text-[1.15rem] text-gold-ink">
                      {e.endYear ? `${e.year}–${e.endYear}` : e.year}
                      <ReviewBadge item={e} locale={locale} />
                    </p>
                    <p className="mt-1 font-serif text-[1.4rem] leading-snug text-navy">{t(e.title, locale)}</p>
                    {e.detail && <p className="mt-0.5 text-slate-ink">{t(e.detail, locale)}</p>}
                  </li>
                ))}
            </ol>
          </Container>
        )}

        <Container className="mt-24">
          <h2 className="t-h3 mb-8">{dict.about.profilesTitle}</h2>
          <ProfileLinks locale={locale} />
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={route(locale, "research")}>{dict.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href={route(locale, "publications")} variant="secondary">
              {dict.nav.publications}
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <ContactSection locale={locale} />
    </>
  );
}

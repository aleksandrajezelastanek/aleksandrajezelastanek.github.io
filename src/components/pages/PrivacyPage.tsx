import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { gdprClause, privacyChanges, privacyLead, privacySections, privacyUpdated } from "@/data/privacy";
import { t } from "@/lib/content";
import { route } from "@/lib/routes";
import { Container, ExternalLink, Section } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";

/** Privacy notice + GDPR (RODO) information clause. Text lives in src/data/privacy.ts. */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: dict.meta.pages.privacy.title, path: route(locale, "privacy") }]}
        eyebrow={dict.privacy.eyebrow}
        title={dict.meta.pages.privacy.title}
        lead={t(privacyLead, locale)}
      />
      <Section tone="paper">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-16 lg:col-span-8">
            {privacySections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="t-h3">
                  {t(section.title, locale)}
                </h2>
                <div className="mt-5 max-w-[var(--measure)] space-y-4 text-[1.0625rem] leading-relaxed text-ink/85">
                  {section.paragraphs.map((p) => (
                    <p key={p.pl}>{t(p, locale)}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-6 max-w-[var(--measure)] space-y-2.5">
                    {section.list.map((item) => (
                      <li key={item.pl} className="flex gap-3 text-ink/85">
                        <span aria-hidden className="mt-[0.75em] h-px w-5 shrink-0 bg-gold" />
                        {t(item, locale)}
                      </li>
                    ))}
                  </ul>
                )}
                {section.link && (
                  <p className="mt-5 text-sm">
                    <ExternalLink locale={locale} href={section.link.href} className="link-quiet text-navy">
                      {t(section.link.label, locale)}
                    </ExternalLink>
                  </p>
                )}
                {section.id === "rodo" && (
                  <dl className="mt-8 border-t border-line">
                    {gdprClause.map(({ term, detail }) => (
                      <div key={term.pl} className="grid gap-2 border-b border-line py-5 md:grid-cols-[13rem_1fr] md:gap-8">
                        <dt className="eyebrow pt-1">{t(term, locale)}</dt>
                        <dd className="leading-relaxed text-ink/85">{t(detail, locale)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
            <section aria-labelledby="zmiany-title">
              <h2 id="zmiany-title" className="t-h3">
                {dict.privacy.changesTitle}
              </h2>
              <p className="mt-5 max-w-[var(--measure)] text-[1.0625rem] leading-relaxed text-ink/85">{t(privacyChanges, locale)}</p>
              <p className="mt-4 text-sm text-slate-ink">
                {dict.privacy.updated}: <time dateTime={privacyUpdated.iso}>{privacyUpdated[locale]}</time>
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}

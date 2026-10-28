import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { expertise } from "@/data/expertise";
import { getResearchAreas, publishable, t } from "@/lib/content";
import { researchAreaPath, route } from "@/lib/routes";
import { ArrowLink, Container, ReviewBadge, Section } from "@/components/ui/primitives";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExpertiseNotice } from "@/components/sections/ExpertiseSection";
import { ContactSection } from "@/components/sections/ContactSection";

/** Map professional fields to the related research area, where one exists. */
const relatedArea: Record<string, string> = {
  onkogenetyka: "onkogenetyka",
  "choroby-rzadkie": "choroby-rzadkie",
  "wes-wgs": "diagnostyka-molekularna",
  rna: "diagnostyka-molekularna",
  farmakogenetyka: "farmakogenetyka",
  interpretacja: "diagnostyka-molekularna",
};

export function ExpertisePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const areas = getResearchAreas();

  return (
    <>
      <PageHeader
        locale={locale}
        crumbs={[{ name: dict.nav.expertise, path: route(locale, "expertise") }]}
        eyebrow={dict.expertise.eyebrow}
        title={dict.expertise.title}
        lead={dict.expertise.lead}
      />
      <Section tone="paper">
        <Container>
          <ol>
            {publishable(expertise).map((item, i) => {
              const area = areas.find((a) => a.slug === relatedArea[item.id]);
              return (
                <li key={item.id} id={item.id} className="reveal grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
                  <span aria-hidden className="font-serif text-[1.3rem] text-gold-ink italic md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="t-h3 md:col-span-4">
                    {t(item.title, locale)}
                    <ReviewBadge item={item} locale={locale} />
                  </h2>
                  <div className="md:col-span-6 md:col-start-7">
                    <p className="text-[1.0625rem] leading-relaxed text-ink/85">{t(item.description, locale)}</p>
                    {area && (
                      <ArrowLink href={researchAreaPath(locale, area.slug)} className="mt-5 text-sm">
                        {dict.research.eyebrow}: {t(area.title, locale)}
                      </ArrowLink>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 border-t border-line pt-10">
            <ExpertiseNotice locale={locale} />
          </div>
        </Container>
      </Section>
      <ContactSection locale={locale} />
    </>
  );
}

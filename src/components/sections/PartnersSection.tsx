import Image from "next/image";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { partnerGroups, partners } from "@/data/partners";
import { publishable, t } from "@/lib/content";
import { assetPath } from "@/lib/site";
import { Container, ExternalLink, ReviewBadge, Section, SectionHeading } from "@/components/ui/primitives";

/**
 * Partners deliberately play a secondary role: typographic list, no logo
 * wall, no brand colours. Logos render only when permission is recorded.
 */
export function PartnersSection({ locale, headingLevel = 2 }: { locale: Locale; headingLevel?: 1 | 2 }) {
  const dict = getDictionary(locale).partners;
  const visible = publishable(partners);
  const groups = partnerGroups
    .map((g) => ({ ...g, items: visible.filter((p) => g.relations.includes(p.relation)) }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <Section tone="paper" labelledBy="partners-title">
      <Container>
        <SectionHeading
          id="partners-title"
          eyebrow={dict.eyebrow}
          title={dict.title}
          lead={dict.lead}
          align="split"
          level={headingLevel}
          className="reveal"
        />
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {groups.map((group) => (
            <div key={group.title.pl} className="reveal">
              <h3 className="eyebrow border-b border-line pb-4">{group.title[locale]}</h3>
              <ul>
                {group.items.map((p) => (
                  <li key={p.id} className="border-b border-line py-5">
                    {p.logo && (
                      <Image
                        src={assetPath(p.logo.src)}
                        alt=""
                        width={p.logo.width}
                        height={p.logo.height}
                        className="mb-3 h-8 w-auto opacity-80 grayscale"
                      />
                    )}
                    <p className="font-serif text-[1.35rem] leading-snug text-navy">
                      {p.url ? (
                        <ExternalLink locale={locale} href={p.url} className="link-quiet">
                          {p.name}
                        </ExternalLink>
                      ) : (
                        p.name
                      )}
                      <ReviewBadge item={p} locale={locale} />
                    </p>
                    <p className="mt-1 text-[0.92rem] text-slate-ink">
                      {t(p.description, locale)}
                      {p.location && <> · {t(p.location, locale)}</>}
                      {p.from && <> · {p.to ? `${p.from}–${p.to}` : `${p.from}–`}</>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

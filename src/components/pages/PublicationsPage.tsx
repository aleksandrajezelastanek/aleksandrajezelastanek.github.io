import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { getPublications } from "@/lib/content";
import { route } from "@/lib/routes";
import { scholarlyArticleJsonLd } from "@/lib/seo";
import { Container, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileLinks } from "@/components/publications/ProfileLinks";
import { PublicationExplorer } from "@/components/publications/PublicationExplorer";
import { PublicationItem } from "@/components/publications/PublicationItem";

export function PublicationsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const all = getPublications();
  const books = all.filter((p) => p.type === "monograph" || p.type === "chapter");
  const articles = all.filter((p) => !books.includes(p));

  return (
    <>
      {all.length > 0 && <JsonLd data={all.map(scholarlyArticleJsonLd)} />}
      <PageHeader
        locale={locale}
        crumbs={[{ name: dict.nav.publications, path: route(locale, "publications") }]}
        eyebrow={dict.publications.eyebrow}
        title={dict.publications.title}
        lead={dict.publications.lead}
      />

      <Section tone="ivory" className="pb-0 lg:pb-0">
        <Container>
          <h2 className="t-h3 mb-8">{dict.publications.profilesTitle}</h2>
          <ProfileLinks locale={locale} />
        </Container>
      </Section>

      {/* Monographs appear once the professor supplies them; no empty section before that. */}
      {books.length > 0 && (
        <Section tone="ivory" className="pb-0 lg:pb-0">
          <Container>
            <h2 className="t-h2">{dict.publications.monographsTitle}</h2>
            <div className="mt-10 border-b border-line">
              {books.map((p) => (
                <PublicationItem key={p.id} p={p} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="ivory">
        <Container>
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="t-h2">{dict.publications.selectedTitle}</h2>
            <p className="text-sm text-slate-ink">{dict.publications.sourceNote}</p>
          </div>
          {articles.length > 0 && (
            <PublicationExplorer locale={locale} entries={articles.map(({ year, categories, type }) => ({ year, categories, type }))}>
              {articles.map((p) => (
                <PublicationItem key={p.id} p={p} locale={locale} />
              ))}
            </PublicationExplorer>
          )}
        </Container>
      </Section>
    </>
  );
}

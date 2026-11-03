import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { bookKindOrder } from "@/data/books";
import { getBooks, getPublications } from "@/lib/content";
import { route } from "@/lib/routes";
import { bookJsonLd, scholarlyArticleJsonLd } from "@/lib/seo";
import { Container, Section } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProfileLinks } from "@/components/publications/ProfileLinks";
import { PublicationExplorer } from "@/components/publications/PublicationExplorer";
import { PublicationItem } from "@/components/publications/PublicationItem";
import { PublicationTabs } from "@/components/publications/PublicationTabs";
import { BookItem } from "@/components/publications/BookItem";

export function PublicationsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const articles = getPublications();
  const books = getBooks();

  return (
    <>
      {(articles.length > 0 || books.length > 0) && <JsonLd data={[...articles.map(scholarlyArticleJsonLd), ...books.map(bookJsonLd)]} />}
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

      <Section tone="ivory">
        <Container>
          <PublicationTabs
            label={dict.publications.tabsLabel}
            tabs={[
              { id: "artykuly", label: dict.publications.articlesTab, count: articles.length },
              { id: "ksiazki", label: dict.publications.booksTab, count: books.length },
            ]}
          >
            <div>
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
            </div>
            <div>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="t-h2">{dict.publications.booksTitle}</h2>
                <p className="text-sm text-slate-ink">{dict.publications.booksNote}</p>
              </div>
              {bookKindOrder.map((kind) => {
                const group = books.filter((b) => b.kind === kind);
                return (
                  group.length > 0 && (
                    <section key={kind} aria-labelledby={`ksiazki-${kind}`} className="mt-12">
                      <h3 id={`ksiazki-${kind}`} className="t-h3">
                        {dict.publications.bookGroups[kind]}
                      </h3>
                      <div className="mt-6 border-b border-line">
                        {group.map((b) => (
                          <BookItem key={b.id} b={b} locale={locale} />
                        ))}
                      </div>
                    </section>
                  )
                );
              })}
            </div>
          </PublicationTabs>
        </Container>
      </Section>
    </>
  );
}

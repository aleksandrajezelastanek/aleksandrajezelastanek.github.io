import type { Locale, Publication } from "@/data/types";
import { getDictionary } from "@/content";
import { AUTHOR_NAME, publicationTypeLabels } from "@/data/publications";
import { publicationUrl } from "@/lib/content";
import { ExternalLink, ReviewBadge } from "@/components/ui/primitives";

function Authors({ p, locale }: { p: Publication; locale: Locale }) {
  const dict = getDictionary(locale).publications;
  const truncated = p.authorCount !== undefined && p.authorCount > p.authors.length;
  const names = [...p.authors];
  return (
    <p className="text-[0.92rem] leading-relaxed text-slate-ink">
      {names.map((name, i) => (
        <span key={`${name}-${i}`}>
          {i > 0 && ", "}
          {name === AUTHOR_NAME ? <strong className="font-semibold text-navy">{name}</strong> : name}
        </span>
      ))}
      {truncated && (
        <>
          {p.lastAuthor ? (
            <>
              , …, {p.lastAuthor === AUTHOR_NAME ? <strong className="font-semibold text-navy">{p.lastAuthor}</strong> : p.lastAuthor}
              {` (${dict.authorsTotal(p.authorCount!)})`}
            </>
          ) : (
            <> {dict.authorsMore(p.authorCount!)}</>
          )}
        </>
      )}
    </p>
  );
}

function citationTail(p: Publication) {
  let tail = "";
  if (p.volume) tail += p.volume;
  if (p.issue) tail += `(${p.issue})`;
  if (p.pages) tail += `${tail ? ":" : ""}${p.pages}`;
  return tail;
}

/**
 * One bibliography entry. Rendered as an <article> with semantic, crawlable
 * text: title, authors, venue, year and persistent identifiers.
 */
export function PublicationItem({ p, locale, headingLevel = 3 }: { p: Publication; locale: Locale; headingLevel?: 2 | 3 | 4 }) {
  const dict = getDictionary(locale);
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  const url = publicationUrl(p);
  const tail = citationTail(p);

  return (
    <article className="reveal grid gap-3 border-t border-line py-7 md:grid-cols-[6.5rem_1fr] md:gap-8">
      <p className="font-serif text-[1.35rem] leading-none text-gold-ink md:pt-1">
        <time dateTime={p.date ?? String(p.year)}>{p.year}</time>
      </p>
      <div>
        <H className="font-serif text-[1.35rem] leading-snug text-navy sm:text-[1.45rem]">
          {url ? (
            <ExternalLink locale={locale} href={url} className="link-quiet decoration-transparent hover:decoration-gold" icon={false}>
              <span lang={locale === "pl" ? "en" : undefined}>{p.title}</span>
            </ExternalLink>
          ) : (
            <span lang={locale === "pl" ? "en" : undefined}>{p.title}</span>
          )}
          <ReviewBadge item={p} locale={locale} />
        </H>
        <div className="mt-2">
          <Authors p={p} locale={locale} />
        </div>
        <p className="mt-1.5 text-[0.92rem] text-ink/80">
          <cite className="not-italic">
            <em>{p.venue}</em>
          </cite>
          {". "}
          {p.year}
          {tail && `;${tail}`}.{p.language === "pl" && <span className="text-slate-ink"> [{dict.publications.polishArticle}]</span>}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.8rem] font-semibold tracking-[0.04em] text-slate-ink">
          <span className="uppercase tracking-[0.12em]">{publicationTypeLabels[p.type][locale]}</span>
          {p.doi && (
            <ExternalLink locale={locale} href={`https://doi.org/${p.doi}`} className="link-quiet font-normal">
              {dict.common.doi} {p.doi}
            </ExternalLink>
          )}
          {p.pmid && (
            <ExternalLink locale={locale} href={`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`} className="link-quiet font-normal">
              {dict.common.pubmed} {p.pmid}
            </ExternalLink>
          )}
          {p.isbn && <span className="font-normal">ISBN {p.isbn}</span>}
        </p>
      </div>
    </article>
  );
}

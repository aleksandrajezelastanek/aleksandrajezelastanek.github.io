import type { BookEntry, Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { t } from "@/lib/content";
import { ExternalLink, ReviewBadge } from "@/components/ui/primitives";

function Names({ names }: { names: string[] }) {
  return names.map((name, i) => (
    <span key={`${name}-${i}`}>
      {i > 0 && ", "}
      {name.includes("Jezela-Stanek") ? <strong className="font-semibold text-navy">{name}</strong> : name}
    </span>
  ));
}

/** "PZWL, Warszawa 2023" — only the parts that are known. */
function imprint(publisher?: string, city?: string, year?: number) {
  const place = [publisher, city].filter(Boolean).join(", ");
  return [place, year].filter(Boolean).join(place && year ? " " : "");
}

/** One book, edited volume, chapter or other publication. */
export function BookItem({ b, locale }: { b: BookEntry; locale: Locale }) {
  const dict = getDictionary(locale);
  const lang = locale === "pl" ? undefined : "pl";
  const ownImprint = imprint(b.publisher, b.city, b.year);
  const year = b.year ?? b.inBook?.year;
  const meta = [b.isbn && `ISBN ${b.isbn}`, b.format && t(b.format, locale)].filter(Boolean);

  return (
    <article className="reveal grid gap-3 border-t border-line py-7 md:grid-cols-[6.5rem_1fr] md:gap-8">
      <p className="font-serif text-[1.35rem] leading-none text-gold-ink md:pt-1">{year && <time dateTime={String(year)}>{year}</time>}</p>
      <div>
        <h4 className="font-serif text-[1.35rem] leading-snug text-navy sm:text-[1.45rem]">
          {b.url ? (
            <ExternalLink locale={locale} href={b.url} className="link-quiet decoration-transparent hover:decoration-gold" icon={false}>
              <span lang={lang}>{b.title}</span>
            </ExternalLink>
          ) : (
            <span lang={lang}>{b.title}</span>
          )}
          <ReviewBadge item={b} locale={locale} />
        </h4>
        {(b.authors || b.editors) && (
          <p className="mt-2 text-[0.92rem] leading-relaxed text-slate-ink">
            {b.authors && <Names names={b.authors} />}
            {b.editors && (
              <>
                {dict.publications.editedBy} <Names names={b.editors} />
              </>
            )}
          </p>
        )}
        {b.inBook && (
          <p className="mt-1.5 text-[0.92rem] text-ink/80">
            {dict.publications.inBook}{" "}
            <cite className="not-italic">
              <em lang={lang}>{b.inBook.title}</em>
            </cite>
            {imprint(b.inBook.publisher, b.inBook.city, b.inBook.year) && `. ${imprint(b.inBook.publisher, b.inBook.city, b.inBook.year)}`}.
          </p>
        )}
        {(ownImprint || b.series) && (
          <p className="mt-1.5 text-[0.92rem] text-ink/80">
            {[ownImprint, b.series && dict.publications.series(b.series)].filter(Boolean).join(" · ")}.
          </p>
        )}
        {b.description && <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-ink/85">{t(b.description, locale)}</p>}
        {meta.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] tracking-[0.04em] text-slate-ink">
            {meta.map((m) => (
              <span key={m as string}>{m}</span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

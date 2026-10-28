import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { scholarlyProfiles } from "@/data/profile";
import { publishable, t } from "@/lib/content";
import { ReviewBadge } from "@/components/ui/primitives";

/** Google Scholar / PubMed / ORCID as large, quiet link tiles. */
export function ProfileLinks({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const profiles = publishable(scholarlyProfiles);
  return (
    <ul className="grid gap-px border border-line bg-line sm:grid-cols-3">
      {profiles.map((p) => (
        <li key={p.id} className="bg-paper">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-ivory sm:p-7"
          >
            <span className="flex items-start justify-between gap-4">
              <span className="font-serif text-[1.75rem] leading-none text-navy">
                {p.label}
                <ReviewBadge item={p} locale={locale} />
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-gold-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </span>
            <span className="text-[0.92rem] leading-snug text-slate-ink">
              {t(p.description, locale)}
              <span className="sr-only"> {dict.common.externalLink}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

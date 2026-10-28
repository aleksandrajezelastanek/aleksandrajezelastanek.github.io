"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Locale, PublicationCategory, PublicationType } from "@/data/types";
import { getDictionary } from "@/content";
import { publicationCategoryLabels, publicationTypeLabels } from "@/data/publications";
import { useIsClient } from "@/lib/use-client";

/** Minimal per-entry metadata, in the same order as the rendered list. */
export interface FilterableEntry {
  year: number;
  categories: PublicationCategory[];
  type: PublicationType;
}

/**
 * Filters a server-rendered bibliography. The list itself (children) stays a
 * Server Component: each entry carries data-year / data-categories / data-type
 * and this component only toggles `hidden`. Controls appear once JavaScript
 * runs, so without it the complete list is simply shown.
 */
export function PublicationExplorer({ locale, entries, children }: { locale: Locale; entries: FilterableEntry[]; children: ReactNode }) {
  const dict = getDictionary(locale).publications;
  const enhanced = useIsClient();
  const listRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const ids = { year: useId(), category: useId(), type: useId() };
  const active = Boolean(year || category || type);

  const matches = entries.map(
    (e) =>
      (!year || String(e.year) === year) &&
      (!category || e.categories.includes(category as PublicationCategory)) &&
      (!type || e.type === type),
  );
  const visible = matches.filter(Boolean).length;
  const options = {
    years: [...new Set(entries.map((e) => e.year))].sort((a, b) => b - a),
    categories: (Object.keys(publicationCategoryLabels) as PublicationCategory[]).filter((c) =>
      entries.some((e) => e.categories.includes(c)),
    ),
    types: (Object.keys(publicationTypeLabels) as PublicationType[]).filter((tp) => entries.some((e) => e.type === tp)),
  };

  // Sync visibility of the server-rendered entries (an external DOM tree).
  const signature = matches.join();
  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>(":scope > *") ?? [];
    const show = signature.split(",");
    items.forEach((el, i) => {
      el.hidden = show[i] === "false";
    });
  }, [signature]);

  const selectClass =
    "mt-2 block min-h-11 w-full appearance-none border border-line-strong bg-paper bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat px-3.5 pr-9 text-[0.95rem] text-navy " +
    "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23142638' stroke-width='1.3'/%3E%3C/svg%3E\")]";

  return (
    <div>
      {enhanced && (
        <fieldset className="mb-10 grid gap-5 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <legend className="sr-only">{dict.filters.label}</legend>
          <div>
            <label htmlFor={ids.year} className="eyebrow">
              {dict.filters.year}
            </label>
            <select id={ids.year} value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
              <option value="">{dict.filters.all}</option>
              {options.years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.category} className="eyebrow">
              {dict.filters.category}
            </label>
            <select id={ids.category} value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
              <option value="">{dict.filters.all}</option>
              {options.categories.map((c) => (
                <option key={c} value={c}>
                  {publicationCategoryLabels[c][locale]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.type} className="eyebrow">
              {dict.filters.type}
            </label>
            <select id={ids.type} value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
              <option value="">{dict.filters.all}</option>
              {options.types.map((tp) => (
                <option key={tp} value={tp}>
                  {publicationTypeLabels[tp][locale]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              setYear("");
              setCategory("");
              setType("");
            }}
            disabled={!active}
            className="min-h-11 px-2 text-left text-sm font-semibold text-navy underline decoration-line-strong underline-offset-4 hover:decoration-navy disabled:cursor-default disabled:text-slate-ink disabled:no-underline lg:text-right"
          >
            {dict.filters.reset}
          </button>
        </fieldset>
      )}

      <p role="status" aria-live="polite" className="mb-2 text-sm text-slate-ink">
        {dict.filters.results(visible)}
      </p>

      <div ref={listRef} className="border-b border-line">
        {children}
      </div>
      {visible === 0 && <p className="border-b border-line py-10 text-slate-ink">{dict.filters.empty}</p>}
    </div>
  );
}

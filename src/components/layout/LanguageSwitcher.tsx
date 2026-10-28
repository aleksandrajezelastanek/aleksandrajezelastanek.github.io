"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/data/types";
import { translatePath } from "@/lib/routes";

/** Rendered only when the English version is enabled (see Header). */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const target: Locale = locale === "pl" ? "en" : "pl";
  return (
    <Link
      href={translatePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={`${label}: ${target === "en" ? "English" : "Polski"}`}
      className="inline-flex min-h-11 items-center px-1 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-slate-ink hover:text-navy"
    >
      {target.toUpperCase()}
    </Link>
  );
}

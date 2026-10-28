import type { ReactNode } from "react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Shared <html> shell for the Polish and English root layouts. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory"
        >
          {dict.nav.skipToContent}
        </a>
        <Header locale={locale} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}

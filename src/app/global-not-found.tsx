import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/globals.css";
import { getDictionary } from "@/content";
import { identity } from "@/data/profile";
import { fontVariables } from "@/lib/fonts";
import { englishEnabled } from "@/lib/site";
import { Graphic } from "@/components/graphics/ResearchGraphics";

const pl = getDictionary("pl");
const en = getDictionary("en");

export const metadata: Metadata = {
  title: `${pl.notFound.title} — ${pl.meta.siteName}`,
  robots: { index: false, follow: true },
};

/** Routing-level 404 (two root layouts → no shared not-found.tsx). */
export default function GlobalNotFound() {
  return (
    <html lang="pl" className={fontVariables}>
      <body>
        <main className="relative flex min-h-svh items-center overflow-hidden bg-ivory px-[var(--gutter)]">
          <Graphic
            name="network-panel"
            tone="navy"
            className="pointer-events-none absolute -right-20 bottom-0 w-[760px] max-w-none opacity-15"
          />
          <div className="relative mx-auto w-full max-w-[1280px]">
            <p className="eyebrow">404</p>
            <h1 className="t-h1 mt-5">{pl.notFound.title}</h1>
            <p className="t-lead mt-6 max-w-xl">{pl.notFound.text}</p>
            <p className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/" className="link-arrow">
                {pl.notFound.back} →
              </Link>
              {englishEnabled && (
                <Link href="/en/" lang="en" className="link-arrow">
                  {en.notFound.back} →
                </Link>
              )}
            </p>
            <p className="mt-16 font-serif text-xl text-navy">
              {identity.honorificPrefix} {identity.fullName}
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}

import Link from "next/link";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { contact, identity } from "@/data/profile";
import { route } from "@/lib/routes";
import { englishEnabled } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const labels = {
    home: dict.nav.home,
    about: dict.nav.about,
    expertise: dict.nav.expertise,
    research: dict.nav.research,
    publications: dict.nav.publications,
    contact: dict.nav.contact,
  };

  return (
    // No backdrop-filter here: it would turn the fixed mobile panel into a
    // child of the header's box.
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/[0.97]">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={route(locale, "home")} className="group relative z-[60] flex min-w-0 flex-col leading-none">
          <span className="truncate font-serif text-[1.3rem] font-medium tracking-[-0.005em] text-navy sm:text-[1.4rem]">
            {identity.fullName}
          </span>
          <span className="mt-1.5 truncate text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-ink">
            {locale === "pl" ? "Genetyka kliniczna" : "Clinical genetics"}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label={dict.nav.primary} className="hidden lg:block">
            <NavLinks locale={locale} labels={labels} />
          </nav>
          {englishEnabled && (
            <>
              <span aria-hidden className="hidden h-4 w-px bg-line-strong lg:block" />
              <LanguageSwitcher locale={locale} label={dict.nav.language} />
            </>
          )}
          <MobileNav
            locale={locale}
            email={contact.email}
            labels={{ ...labels, openMenu: dict.nav.openMenu, closeMenu: dict.nav.closeMenu, menu: dict.nav.menu, close: dict.nav.close }}
          />
        </div>
      </Container>
    </header>
  );
}

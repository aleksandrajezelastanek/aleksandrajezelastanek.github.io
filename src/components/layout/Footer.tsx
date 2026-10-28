import Link from "next/link";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { contact, identity, scholarlyProfiles } from "@/data/profile";
import { publishable, t } from "@/lib/content";
import { navigation, route } from "@/lib/routes";
import { Container, ExternalLink } from "@/components/ui/primitives";
import { Graphic } from "@/components/graphics/ResearchGraphics";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark relative overflow-hidden bg-navy text-ivory/85">
      <Graphic
        name="network-footer"
        tone="ivory"
        className="pointer-events-none absolute -top-24 -right-32 w-[620px] max-w-none opacity-20"
      />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[1.7rem] leading-tight text-ivory">
              {identity.honorificPrefix}
              <br />
              {identity.fullName}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">{t(identity.title, locale)}</p>
          </div>

          <nav aria-label={dict.footer.sitemapTitle} className="md:col-span-3">
            <h2 className="eyebrow mb-4 font-sans">{dict.footer.sitemapTitle}</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {(["home", ...navigation] as const).map((key) => (
                <li key={key}>
                  <Link className="link-quiet text-ivory/85 hover:text-ivory" href={route(locale, key)}>
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-4 font-sans">{dict.footer.profilesTitle}</h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {publishable(scholarlyProfiles).map((p) => (
                <li key={p.id}>
                  <ExternalLink locale={locale} href={p.url} className="link-quiet text-ivory/85 hover:text-ivory">
                    {p.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <h2 className="eyebrow mt-8 mb-3 font-sans">{dict.footer.contactTitle}</h2>
            <a href={`mailto:${contact.email}`} className="link-quiet break-all text-ivory">
              {contact.email}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-line-inverse pt-8 text-[0.8rem] leading-relaxed text-ivory/60">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:gap-10">
            <p>
              © {year} {identity.fullName}. {dict.footer.rights}
            </p>
            <div className="max-w-2xl space-y-1 lg:text-right">
              <p>{dict.footer.disclaimer}</p>
              <p>{dict.footer.graphics}</p>
              <p>
                {dict.footer.privacy}{" "}
                <Link href={route(locale, "privacy")} className="link-quiet text-ivory/80 hover:text-ivory">
                  {dict.footer.privacyLink}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

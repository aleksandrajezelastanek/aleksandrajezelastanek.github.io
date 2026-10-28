import Link from "next/link";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/ContactSection";
import { PartnersSection } from "@/components/sections/PartnersSection";

/** Contact is the page's main content, so its heading is the <h1>. */
export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const trail = [
    { name: dict.nav.home, path: route(locale, "home") },
    { name: dict.nav.contact, path: route(locale, "contact") },
  ];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="surface-dark bg-forest">
        <Container className="pt-10">
          <nav aria-label={dict.nav.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-2 text-[0.82rem] text-ivory/70">
              <li>
                <Link href={trail[0].path} className="link-quiet">
                  {trail[0].name}
                </Link>
              </li>
              <li aria-hidden className="text-gold-light">
                /
              </li>
              <li aria-current="page" className="text-ivory">
                {trail[1].name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>
      <ContactSection locale={locale} headingLevel={1} />
      <PartnersSection locale={locale} />
    </>
  );
}

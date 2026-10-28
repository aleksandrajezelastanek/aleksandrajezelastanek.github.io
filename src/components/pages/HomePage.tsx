import type { Locale } from "@/data/types";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ScientificIntro } from "@/components/sections/ScientificIntro";
import { FeaturedResearch } from "@/components/sections/FeaturedResearch";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { PublicationsPreview } from "@/components/sections/PublicationsPreview";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * Homepage narrative, in the order of the brief:
 * identity → science → research → biography → expertise → publications →
 * collaboration → contact.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={[personJsonLd(locale), websiteJsonLd(locale)]} />
      <Hero locale={locale} />
      <ScientificIntro locale={locale} />
      <FeaturedResearch locale={locale} />
      <AboutPreview locale={locale} />
      <ExpertiseSection locale={locale} />
      <PublicationsPreview locale={locale} />
      <PartnersSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}

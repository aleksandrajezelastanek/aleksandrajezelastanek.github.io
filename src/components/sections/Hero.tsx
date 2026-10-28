import Image from "next/image";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { identity, portrait } from "@/data/profile";
import { t } from "@/lib/content";
import { route } from "@/lib/routes";
import { assetPath } from "@/lib/site";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { Graphic } from "@/components/graphics/ResearchGraphics";

function PortraitFigure({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <figure className="relative mx-auto w-full max-w-[460px] lg:mr-0">
      <div className="relative">
        {/* Offset hairline frame */}
        <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 border border-gold/70 sm:translate-x-5 sm:translate-y-5" />
        <div className="relative aspect-[4/5] overflow-hidden bg-forest">
          {portrait.src ? (
            <Image
              src={assetPath(portrait.src)}
              alt={t(portrait.alt, locale)}
              width={portrait.width}
              height={portrait.height}
              priority
              sizes="(min-width: 1024px) 460px, 90vw"
              className="h-full w-full object-cover"
            />
          ) : (
            // No authorised portrait yet: an abstract composition keeps the
            // layout intact. Replace by setting `portrait.src` in data/profile.ts.
            <div aria-hidden className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_20%,var(--forest-soft),var(--forest)_60%,#122f29)]" />
              <Graphic
                name="branching"
                tone="gold"
                eager
                className="absolute inset-x-[-4%] top-[22%] h-auto w-[108%] max-w-none opacity-75"
              />
              <Graphic name="network-portrait" tone="ivory" eager className="absolute inset-x-0 bottom-0 h-auto w-full opacity-25" />
              <div className="absolute top-8 left-8 font-serif text-[4.5rem] leading-none text-ivory/90 italic">
                A<span className="text-gold-light">·</span>J<span className="text-gold-light">·</span>S
              </div>
            </div>
          )}
        </div>
      </div>
      <figcaption className="relative mt-7 flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-slate-ink sm:mt-9">
        <span aria-hidden className="h-px w-8 bg-gold" />
        {dict.hero.affiliationLabel}
      </figcaption>
    </figure>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      {/* Background composition */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Graphic
          name="network-hero"
          tone="navy"
          eager
          className="absolute -top-10 right-[-12%] hidden w-[1000px] max-w-none opacity-[0.18] lg:block"
        />
        <div className="absolute inset-y-0 left-[58%] hidden w-px bg-line lg:block" />
      </div>

      <Container className="relative grid gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7 lg:pr-8">
          <h1 id="hero-title" className="hero-in" style={{ ["--i" as string]: 0 }}>
            <span className="eyebrow block font-sans">{identity.honorificPrefix}</span>
            <span className="t-display mt-5 block text-navy">
              <span className="whitespace-nowrap">{identity.givenName}</span>{" "}
              <span className="whitespace-nowrap">{identity.familyName}</span>
            </span>
          </h1>
          <p className="hero-in mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-slate-ink sm:text-lg" style={{ ["--i" as string]: 1 }}>
            {t(identity.title, locale)}
          </p>

          <div className="hero-in mt-10 border-t border-line pt-8 sm:mt-12" style={{ ["--i" as string]: 2 }}>
            <p className="font-serif text-[clamp(1.75rem,1.2rem+2.1vw,2.9rem)] leading-[1.12] text-navy italic">
              {t(identity.headline, locale)}
            </p>
            <ul
              aria-label={dict.hero.categoriesLabel}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-gold-ink"
            >
              {identity.heroCategories.map((c) => (
                <li key={c.pl} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-1.5 rotate-45 bg-gold" />
                  {t(c, locale)}
                </li>
              ))}
            </ul>
          </div>

          <p className="hero-in mt-8 max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink/85" style={{ ["--i" as string]: 3 }}>
            {t(identity.intro, locale)}
          </p>

          <div className="hero-in mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap" style={{ ["--i" as string]: 4 }}>
            <ButtonLink href={route(locale, "research")}>{dict.hero.ctaPrimary}</ButtonLink>
            <ButtonLink href={route(locale, "expertise")} variant="secondary">
              {dict.hero.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-in lg:col-span-5 lg:pt-6" style={{ ["--i" as string]: 2 }}>
          <PortraitFigure locale={locale} />
        </div>
      </Container>

      <Graphic name="ruler" tone="navy" className="absolute bottom-0 left-0 h-4 w-[600px] max-w-full opacity-30" />
    </section>
  );
}

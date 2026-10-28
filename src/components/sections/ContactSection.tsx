import Link from "next/link";
import { Mail, ShieldAlert, Scale } from "lucide-react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { contact } from "@/data/profile";
import { route } from "@/lib/routes";
import { Container, Section } from "@/components/ui/primitives";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Graphic } from "@/components/graphics/ResearchGraphics";

/**
 * Email-only contact. Deliberately no form, no upload and no booking: the
 * site never receives or stores health information.
 */
export function ContactSection({ locale, headingLevel = 2 }: { locale: Locale; headingLevel?: 1 | 2 }) {
  const dict = getDictionary(locale).contact;
  const H = headingLevel === 1 ? "h1" : "h2";
  const Sub = headingLevel === 1 ? "h2" : "h3";

  return (
    <Section id="kontakt" tone="forest" labelledBy="contact-title" className="overflow-hidden">
      <Graphic
        name="network-panel"
        tone="ivory"
        className="pointer-events-none absolute top-0 -right-40 hidden w-[760px] max-w-none opacity-20 md:block"
      />
      <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow mb-5">{dict.eyebrow}</p>
          <H id="contact-title" className={headingLevel === 1 ? "t-h1" : "t-h2"}>
            {dict.title}
          </H>
          <p className="t-lead mt-6">{dict.lead}</p>
          <Sub className="eyebrow mt-12 mb-4">{dict.topicsTitle}</Sub>
          <ul className="space-y-3">
            {dict.topics.map((topic) => (
              <li key={topic} className="flex gap-3 text-ivory/85">
                <span aria-hidden className="mt-[0.75em] h-px w-5 shrink-0 bg-gold-light" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <div className="border border-line-inverse bg-forest-soft/60 p-6 sm:p-10">
            <p className="eyebrow flex items-center gap-2">
              <Mail aria-hidden className="size-4" strokeWidth={1.6} />
              {dict.emailLabel}
            </p>
            <p className="mt-4 font-serif text-[clamp(1.5rem,1rem+2.6vw,2.6rem)] leading-tight break-words text-ivory">
              <a
                href={`mailto:${contact.email}`}
                className="underline decoration-gold-light/50 decoration-1 underline-offset-[0.2em] hover:decoration-gold-light"
              >
                {contact.email}
              </a>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-ivory px-6 text-[0.9375rem] font-semibold text-forest transition-colors hover:bg-gold-light"
              >
                {dict.write}
              </a>
              <CopyEmailButton email={contact.email} label={dict.copy} copiedLabel={dict.copied} />
            </div>
          </div>

          <div className="mt-10 space-y-8">
            {[
              { Icon: Scale, title: dict.scopeTitle, text: dict.scope },
              { Icon: ShieldAlert, title: dict.securityTitle, text: dict.security },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon aria-hidden className="mt-1 size-5 shrink-0 text-gold-light" strokeWidth={1.4} />
                <div>
                  <Sub className="font-serif text-[1.3rem] text-ivory">{title}</Sub>
                  <p className="mt-1.5 leading-relaxed text-ivory/75">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 border-t border-line-inverse pt-6 text-sm leading-relaxed text-ivory/60">
            {dict.domainNote}{" "}
            <Link href={route(locale, "privacy")} className="underline decoration-ivory/30 underline-offset-4 hover:text-ivory">
              {dict.privacyLink}
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}

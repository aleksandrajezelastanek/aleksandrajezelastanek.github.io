import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";

export function ScientificIntro({ locale }: { locale: Locale }) {
  const { intro } = getDictionary(locale);
  return (
    <Section tone="paper" labelledBy="intro-title">
      <Container>
        <SectionHeading id="intro-title" eyebrow={intro.eyebrow} title={intro.title} lead={intro.lead} align="split" className="reveal" />
        <ol className="mt-16 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {intro.points.map((point, i) => (
            <li key={point.title} className="reveal border-t border-line py-7 pr-4">
              <span aria-hidden className="font-serif text-[1.05rem] text-gold-ink italic">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-[1.45rem] leading-snug">{point.title}</h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-slate-ink">{point.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

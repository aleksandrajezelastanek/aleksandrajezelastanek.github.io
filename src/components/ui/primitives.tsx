import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps, ElementType, ReactNode } from "react";
import type { Locale, Reviewable } from "@/data/types";
import { getDictionary } from "@/content";
import { contentPreview } from "@/lib/site";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Layout ── */

export function Container({ className, children, as: Tag = "div" }: { className?: string; children: ReactNode; as?: ElementType }) {
  return <Tag className={cx("mx-auto w-full max-w-[1280px] px-[var(--gutter)]", className)}>{children}</Tag>;
}

type Tone = "ivory" | "paper" | "navy" | "forest";

const toneClass: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  paper: "bg-paper text-ink",
  navy: "surface-dark bg-navy text-ivory",
  forest: "surface-dark bg-forest text-ivory",
};

export function Section({
  id,
  tone = "ivory",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("relative py-[var(--section-y)]", toneClass[tone], className)}>
      {children}
    </section>
  );
}

/* ── Headings ── */

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  level = 2,
  className,
  align = "start",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  level?: 1 | 2;
  className?: string;
  align?: "start" | "split";
}) {
  const H = level === 1 ? "h1" : "h2";
  const heading = (
    <H id={id} className={level === 1 ? "t-h1" : "t-h2"}>
      {title}
    </H>
  );
  if (align === "split") {
    return (
      <div className={cx("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
        <div className="lg:col-span-6">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          {heading}
        </div>
        {lead && <p className="t-lead lg:col-span-5 lg:col-start-8 lg:self-end">{lead}</p>}
      </div>
    );
  }
  return (
    <div className={cx("max-w-3xl", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      {heading}
      {lead && <p className="t-lead mt-6">{lead}</p>}
    </div>
  );
}

/* ── Links & buttons ── */

export function ExternalLink({
  href,
  locale,
  children,
  className,
  icon = true,
  ...rest
}: { href: string; locale: Locale; children: ReactNode; className?: string; icon?: boolean } & Omit<
  ComponentProps<"a">,
  "href" | "target" | "rel"
>) {
  const dict = getDictionary(locale);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      {icon && <ArrowUpRight aria-hidden className="ml-1 inline-block size-[0.9em] -translate-y-px opacity-70" strokeWidth={1.6} />}
      <span className="sr-only"> {dict.common.externalLink}</span>
    </a>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cx("link-arrow", className)}>
      <span>{children}</span>
      <ArrowRight aria-hidden className="arrow size-4" strokeWidth={1.6} />
    </Link>
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-200";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse" | "inverseSecondary";
  className?: string;
}) {
  const styles = {
    primary: "bg-navy text-ivory hover:bg-forest",
    secondary: "border border-line-strong text-navy hover:border-navy hover:bg-paper",
    inverse: "bg-ivory text-navy hover:bg-gold-light",
    inverseSecondary: "border border-line-inverse text-ivory hover:border-ivory",
  }[variant];
  const isExternal = /^(https?:|mailto:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" || variant === "inverse" ? <ArrowRight aria-hidden className="size-4" strokeWidth={1.7} /> : null}
    </>
  );
  return isExternal ? (
    <a href={href} className={cx(buttonBase, styles, className)}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cx(buttonBase, styles, className)}>
      {content}
    </Link>
  );
}

/* ── Small pieces ── */

export function Tag({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center border px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
        inverse ? "border-line-inverse text-ivory/80" : "border-line text-slate-ink",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Visible marker for unverified content. Renders only in content-preview
 * builds, where `requiresReview` items are shown at all.
 */
export function ReviewBadge({ item, locale }: { item: Reviewable; locale: Locale }) {
  if (!contentPreview || item.review.status === "verified") return null;
  return (
    <span
      title={item.review.note ?? item.review.source}
      className="ml-2 inline-flex items-center bg-[#fde9c8] px-2 py-0.5 align-middle font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-[#6b4300]"
    >
      {getDictionary(locale).common.requiresReview}
    </span>
  );
}

/** Ornamental divider: hairline with a small gold node. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx("flex items-center gap-3", className)}>
      <span className="h-px w-10 bg-gold" />
      <span className="size-1.5 rotate-45 border border-gold" />
    </div>
  );
}

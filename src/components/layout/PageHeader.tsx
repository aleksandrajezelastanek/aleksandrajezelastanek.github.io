import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { route } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Container } from "@/components/ui/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { Graphic } from "@/components/graphics/ResearchGraphics";

export interface Crumb {
  name: string;
  path: string;
}

/** Title block for subpages, with visible + structured breadcrumbs. */
export function PageHeader({
  locale,
  crumbs,
  eyebrow,
  title,
  lead,
  aside,
}: {
  locale: Locale;
  /** Trail after "home"; the last item is the current page. */
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  aside?: ReactNode;
}) {
  const dict = getDictionary(locale);
  const trail: Crumb[] = [{ name: dict.nav.home, path: route(locale, "home") }, ...crumbs];

  return (
    <div className="relative overflow-hidden border-b border-line bg-ivory">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <Graphic
        name="network-header"
        tone="navy"
        eager
        className="pointer-events-none absolute -top-8 -right-24 hidden w-[680px] max-w-none opacity-[0.16] md:block"
      />
      <Container className="relative pt-10 pb-16 sm:pt-14 lg:pb-24">
        <nav aria-label={dict.nav.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.82rem] text-slate-ink">
            {trail.map((c, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && (
                    <span aria-hidden className="text-gold">
                      /
                    </span>
                  )}
                  {last ? (
                    <span aria-current="page" className="text-navy">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="link-quiet">
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="t-h1">{title}</h1>
            {lead && <p className="t-lead mt-7 max-w-[42rem]">{lead}</p>}
          </div>
          {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
        </div>
      </Container>
    </div>
  );
}

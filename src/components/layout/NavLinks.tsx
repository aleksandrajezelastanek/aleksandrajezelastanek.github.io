"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/data/types";
import { activeRouteKey, navigation, route } from "@/lib/routes";
import { cx } from "@/components/ui/primitives";

export interface NavLabels {
  about: string;
  expertise: string;
  research: string;
  publications: string;
  contact: string;
}

/** Desktop navigation links with aria-current on the active section. */
export function NavLinks({ locale, labels }: { locale: Locale; labels: NavLabels }) {
  const active = activeRouteKey(usePathname(), locale);
  return (
    <ul className="flex items-center gap-x-6 xl:gap-x-9">
      {navigation.map((key) => {
        const isActive = active === key;
        return (
          <li key={key}>
            <Link
              href={route(locale, key as Exclude<typeof key, "home">)}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "relative py-2 text-[0.9rem] font-medium tracking-[0.005em] whitespace-nowrap text-navy/80 transition-colors hover:text-navy",
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300",
                isActive ? "text-navy after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
              )}
            >
              {labels[key as keyof NavLabels]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

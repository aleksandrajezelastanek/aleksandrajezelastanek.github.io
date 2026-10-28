import type { Locale } from "@/data/types";

export type RouteKey = "home" | "about" | "expertise" | "research" | "publications" | "contact" | "privacy";

/** Paths per locale. Trailing slashes match `trailingSlash: true`. */
const paths: Record<Locale, Record<RouteKey, string>> = {
  pl: {
    home: "/",
    about: "/o-mnie/",
    expertise: "/zakres-dzialalnosci/",
    research: "/nauka-i-projekty/",
    publications: "/publikacje/",
    contact: "/wspolpraca-i-kontakt/",
    privacy: "/polityka-prywatnosci/",
  },
  en: {
    home: "/en/",
    about: "/en/about/",
    expertise: "/en/expertise/",
    research: "/en/research/",
    publications: "/en/publications/",
    contact: "/en/contact/",
    privacy: "/en/privacy/",
  },
};

export function route(locale: Locale, key: RouteKey): string {
  return paths[locale][key];
}

export function researchAreaPath(locale: Locale, slug: string): string {
  return `${paths[locale].research}${slug}/`;
}

/** Primary navigation order, as specified in the brief. */
/** Keys shown in menus (the privacy page is linked from the footer and contact section). */
export type NavKey = Exclude<RouteKey, "privacy">;

export const navigation: NavKey[] = ["about", "expertise", "research", "publications", "contact"];

export const allRouteKeys = Object.keys(paths.pl) as RouteKey[];

/**
 * Map a path in one locale to its counterpart in the other — used by the
 * language switcher and for hreflang alternates. Paths are compared without
 * the base path, with a trailing slash.
 */
export function translatePath(pathname: string, to: Locale): string {
  const from: Locale = to === "pl" ? "en" : "pl";
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  // Longest match first so "/" does not swallow every path.
  const keys = [...allRouteKeys].sort((a, b) => paths[from][b].length - paths[from][a].length);
  for (const key of keys) {
    const base = paths[from][key];
    if (path === base) return paths[to][key];
    if (key === "research" && path.startsWith(base)) {
      return `${paths[to].research}${path.slice(base.length)}`;
    }
  }
  return paths[to].home;
}

/** Which navigation item a path belongs to (for aria-current). */
export function activeRouteKey(pathname: string, locale: Locale): RouteKey | null {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const key of navigation) {
    if (path.startsWith(paths[locale][key])) return key;
  }
  return path === paths[locale].home ? "home" : null;
}

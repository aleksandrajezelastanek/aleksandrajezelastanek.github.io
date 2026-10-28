import type { Locale } from "@/data/types";
import { getResearchAreas } from "./content";
import { allRouteKeys, researchAreaPath, route, translatePath } from "./routes";
import { englishEnabled } from "./site";

/** Every public, canonical path for a locale (drafts are never included). */
export function publicPaths(locale: Locale): string[] {
  return [...allRouteKeys.map((key) => route(locale, key)), ...getResearchAreas().map((area) => researchAreaPath(locale, area.slug))];
}

export function sitemapLocales(): Locale[] {
  return englishEnabled ? ["pl", "en"] : ["pl"];
}

export { translatePath };

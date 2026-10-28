import type { MetadataRoute } from "next";
import { publicPaths, sitemapLocales, translatePath } from "@/lib/sitemap-entries";
import { absoluteUrl, englishEnabled } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /sitemap.xml — canonical, indexable routes only. No `lastModified`: the
 * site has no reliable per-page modification dates, and fabricated ones are
 * worse than none.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapLocales().flatMap((locale) =>
    publicPaths(locale).map((path) => ({
      url: absoluteUrl(path),
      ...(englishEnabled
        ? {
            alternates: {
              languages: {
                pl: absoluteUrl(locale === "pl" ? path : translatePath(path, "pl")),
                en: absoluteUrl(locale === "en" ? path : translatePath(path, "en")),
              },
            },
          }
        : {}),
    })),
  );
}

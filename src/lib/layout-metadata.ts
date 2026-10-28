import type { Metadata, Viewport } from "next";
import type { Locale } from "@/data/types";
import { getDictionary } from "@/content";
import { identity } from "@/data/profile";
import { siteUrl } from "./site";

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: dict.meta.pages.home.title, template: `%s — ${dict.meta.siteName}` },
    description: dict.meta.pages.home.description,
    applicationName: dict.meta.siteName,
    authors: [{ name: identity.fullName }],
    creator: identity.fullName,
    // Explicitly indexable — see README "SEO & AI crawlers".
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export const rootViewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

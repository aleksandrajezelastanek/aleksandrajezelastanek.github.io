import type { NextConfig } from "next";

/**
 * Deployment configuration — everything is driven by environment variables,
 * so the same code builds for GitHub Pages, Vercel or any static host.
 *
 *   NEXT_PUBLIC_SITE_URL   Canonical origin, e.g. https://jezela-stanek.pl
 *                          (GitHub Pages: https://<user>.github.io/<repo>)
 *   NEXT_PUBLIC_BASE_PATH  Sub-path when served from a folder, e.g. /<repo>
 *                          (empty for a custom domain or Vercel)
 *   NEXT_PUBLIC_ENABLE_EN  "1" builds the English routes under /en.
 *                          Keep it off until translations are approved.
 *
 * See README.md → "Deployment".
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const enableEnglish = process.env.NEXT_PUBLIC_ENABLE_EN === "1";

const nextConfig: NextConfig = {
  // Fully static output (./out) — works on GitHub Pages, Vercel and any CDN.
  output: "export",
  // /o-mnie → /o-mnie/index.html, which every static host resolves.
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    // The default optimiser needs a server; static export ships images as-is.
    unoptimized: true,
  },
  // English route files are named `*.en.tsx`. They only become routes when the
  // English version is switched on, so unapproved translations never ship.
  pageExtensions: enableEnglish ? ["tsx", "ts", "en.tsx", "en.ts"] : ["tsx", "ts"],
  experimental: {
    // Two root layouts (pl / en) need a single routing-level 404 page.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

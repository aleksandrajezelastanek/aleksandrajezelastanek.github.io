/**
 * Site-wide deployment settings derived from environment variables.
 * Nothing here is content — see src/data and src/content for that.
 */

const FALLBACK_ORIGIN = "http://localhost:3000";

function normaliseOrigin(value: string | undefined): string | null {
  if (!value) return null;
  const withProtocol = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withProtocol.replace(/\/+$/, "");
}

/**
 * The canonical public origin (including the base path, if any), without a
 * trailing slash. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this for production.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — provided automatically on Vercel.
 *   3. http://localhost:3000 for local development.
 */
export const siteUrl: string =
  normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? normaliseOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? FALLBACK_ORIGIN;

/** True when no real production origin was configured. */
export const isFallbackOrigin = siteUrl === FALLBACK_ORIGIN;

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** English routes are generated only when explicitly enabled. */
export const englishEnabled = process.env.NEXT_PUBLIC_ENABLE_EN === "1";

/**
 * Content preview: also render items marked `requiresReview`, with a visible
 * badge. Never enable this for a public deployment.
 */
export const contentPreview = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "1";

/** Absolute URL for a site path such as "/o-mnie/". */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  // siteUrl already contains the base path when configured that way, so only
  // append it if the origin does not end with it.
  const origin = basePath && !siteUrl.endsWith(basePath) ? `${siteUrl}${basePath}` : siteUrl;
  return `${origin}${clean}`;
}

/** Path for static files in /public, honouring the base path. */
export function assetPath(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

import { crawlerGroups } from "@/lib/crawlers";
import { absoluteUrl, isFallbackOrigin } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /robots.txt — written by hand (not app/robots.ts) so the groups can carry
 * comments. The Sitemap line is emitted only when a real origin is set, so a
 * placeholder domain is never published.
 */
export function GET() {
  const lines: string[] = [];
  for (const group of crawlerGroups) {
    lines.push(`# ${group.comment}`);
    for (const agent of group.agents) {
      lines.push(`User-agent: ${agent}`, "Allow: /", "");
    }
  }
  if (!isFallbackOrigin) {
    lines.push("# XML sitemap", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, "");
  }
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

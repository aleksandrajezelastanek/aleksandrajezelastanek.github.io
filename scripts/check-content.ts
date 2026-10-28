/**
 * npm run check:content
 *
 * Validates src/data, prints the review queue and fails on errors.
 * Set NEXT_PUBLIC_ENABLE_EN=1 to also require complete English texts.
 * Set CHECK_DEPLOY=1 (CI does) to require a production NEXT_PUBLIC_SITE_URL.
 */
import { reviewQueue, validateContent } from "./content-rules.ts";

const requireEnglish = process.env.NEXT_PUBLIC_ENABLE_EN === "1";
const findings = validateContent({ requireEnglish });

if (process.env.CHECK_DEPLOY === "1") {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (!/^https:\/\/[^/]+/.test(url) || /localhost|example\.(org|com)|YOUR_PRODUCTION_DOMAIN/i.test(url)) {
    findings.push({ level: "error", where: "env", message: `NEXT_PUBLIC_SITE_URL must be the real https origin (got "${url}")` });
  }
}

const errors = findings.filter((f) => f.level === "error");
const warnings = findings.filter((f) => f.level === "warning");

for (const f of warnings) console.warn(`⚠  ${f.where}: ${f.message}`);
for (const f of errors) console.error(`✖  ${f.where}: ${f.message}`);

const queue = reviewQueue();
if (queue.length > 0) {
  console.log(`\nReview queue (${queue.length}) — not shown in production until verified:`);
  for (const item of queue) console.log(`   • [${item.status}] ${item.where}${item.note ? ` — ${item.note}` : ""}`);
}

console.log(`\nContent check: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length > 0 ? 1 : 0);

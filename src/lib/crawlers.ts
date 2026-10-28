/**
 * Crawler policy for robots.txt. Tokens follow each provider's official
 * documentation (checked 2026-10-23):
 *   OpenAI      https://developers.openai.com/api/docs/bots
 *   Anthropic   https://support.claude.com/en/articles/8896518
 *   Google      https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
 *   Perplexity  https://docs.perplexity.ai/guides/bots
 *   Microsoft   https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0
 *   CommonCrawl https://commoncrawl.org/ccbot
 *
 * To restrict a crawler later, change its `allow` to `disallow`.
 * The `*` group already permits every compliant crawler; the named groups
 * document the intended policy explicitly.
 */
export const crawlerGroups: { comment: string; agents: string[] }[] = [
  { comment: "General search engines", agents: ["*"] },
  { comment: "OpenAI", agents: ["GPTBot", "OAI-SearchBot", "ChatGPT-User"] },
  { comment: "Anthropic", agents: ["ClaudeBot", "Claude-SearchBot", "Claude-User"] },
  { comment: "Google", agents: ["Googlebot", "Google-Extended"] },
  { comment: "Perplexity", agents: ["PerplexityBot", "Perplexity-User"] },
  { comment: "Microsoft", agents: ["Bingbot"] },
  { comment: "Common Crawl", agents: ["CCBot"] },
];

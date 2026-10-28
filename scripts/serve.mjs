/**
 * npm run serve — serve the static export in ./out exactly like a static host
 * would (directory indexes, 404.html, content types, gzip, base path).
 *
 *   PORT=4173 NEXT_PUBLIC_BASE_PATH=/repo npm run serve
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createGzip } from "node:zlib";

const root = join(import.meta.dirname, "..", "out");
const port = Number(process.env.PORT ?? 4173);
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

if (!existsSync(root)) {
  console.error("No ./out directory — run `npm run build` first.");
  process.exit(1);
}

function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(root, safe);
  if (!candidate.startsWith(root)) return null;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, "index.html");
  if (existsSync(index)) return index;
  return null;
}

createServer((req, res) => {
  let { pathname } = new URL(req.url ?? "/", "http://localhost");
  if (basePath) {
    if (!pathname.startsWith(basePath)) {
      res.writeHead(302, { Location: `${basePath}/` }).end();
      return;
    }
    pathname = pathname.slice(basePath.length) || "/";
  }
  // Mirror trailingSlash: true — /o-mnie → /o-mnie/
  if (!extname(pathname) && !pathname.endsWith("/") && existsSync(join(root, pathname, "index.html"))) {
    res.writeHead(308, { Location: `${basePath}${pathname}/` }).end();
    return;
  }
  const file = resolveFile(pathname);
  const status = file ? 200 : 404;
  const body = file ?? join(root, "404.html");
  const type = types[extname(body)] ?? "application/octet-stream";
  // GitHub Pages and Vercel compress text responses; do the same here.
  const gzip = /gzip/.test(req.headers["accept-encoding"] ?? "") && /text|xml|json|javascript|svg/.test(type);
  res.writeHead(status, { "Content-Type": type, ...(gzip ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}) });
  const stream = createReadStream(body);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}${basePath}/`));

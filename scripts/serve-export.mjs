// Serves the static export (out/) under the repository sub-path, the way GitHub Pages does.
// Usage: npm run build && npm run serve:export   ->  http://127.0.0.1:4173/<repo>/
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const repo = process.env.NEXT_PUBLIC_REPO_NAME ?? "fashion-hub";
const base = process.env.NEXT_PUBLIC_USE_ROOT_PATH === "true" ? "" : `/${repo}`;
const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml", ".woff2": "font/woff2", ".woff": "font/woff" };

function send(res, status, file) {
  res.writeHead(status, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  let path = decodeURIComponent(url.pathname);
  const notFound = join(root, "404.html");
  if (base && !path.startsWith(`${base}/`) && path !== base) return existsSync(notFound) ? send(res, 404, notFound) : (res.writeHead(404), res.end("Not found"));
  if (base && path === base) { res.writeHead(301, { location: `${base}/` }); return res.end(); }
  path = normalize(path.slice(base.length)).replace(/^(\.\.[/\\])+/, "");
  let file = join(root, path);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (existsSync(file) && statSync(file).isFile()) return send(res, 200, file);
  return existsSync(notFound) ? send(res, 404, notFound) : (res.writeHead(404), res.end("Not found"));
}).listen(port, "127.0.0.1", () => console.log(`Serving out/ at http://127.0.0.1:${port}${base}/`));

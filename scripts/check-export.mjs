// Verifies the static export for GitHub Pages: every local asset/link reference in the HTML must
// carry the base path AND resolve to a real file in out/. Run after `npm run build`.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const repo = process.env.NEXT_PUBLIC_REPO_NAME ?? "fashion-hub";
const base = process.env.NEXT_PUBLIC_USE_ROOT_PATH === "true" ? "" : `/${repo}`;
const root = process.env.EXPORT_DIR ?? join(process.cwd(), "out");

if (!existsSync(root)) { console.error(`No export found at ${root}. Run "npm run build" first.`); process.exit(1); }

const walk = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(root);
const html = files.filter((f) => f.endsWith(".html"));
const problems = [];

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split("#")[0].split("?")[0]).slice(base.length);
  const p = join(root, clean);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, "index.html")));
};

for (const file of html) {
  const text = readFileSync(file, "utf8");
  const page = "/" + relative(root, file);
  const refs = [...text.matchAll(/\b(?:src|href|content)="(\/[^"\s]*)/g)].map((m) => m[1]);
  for (const m of text.matchAll(/\bsrcset="([^"]*)"/g)) for (const cand of m[1].split(",")) { const url = cand.trim().split(/\s+/)[0]; if (url.startsWith("/")) refs.push(url); }
  for (const ref of refs) {
    if (ref.startsWith("//")) continue;
    if (base && !ref.startsWith(`${base}/`) && ref !== base) problems.push(`${page}: missing base path -> ${ref}`);
    else if (!exists(ref)) problems.push(`${page}: broken reference -> ${ref}`);
  }
}

for (const required of [".nojekyll", "index.html", "404.html"]) if (!existsSync(join(root, required))) problems.push(`Missing ${required} in export`);

console.log(`Checked ${html.length} HTML files, ${files.length} files total.`);
if (problems.length) {
  const unique = [...new Set(problems)];
  console.error(`\n${unique.length} problem(s):`);
  unique.slice(0, 60).forEach((p) => console.error(" - " + p));
  process.exit(1);
}
console.log("Export check passed: all local references use the base path and resolve to files.");

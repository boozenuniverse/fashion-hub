import { categories } from "@/data/categories";
import { collections } from "@/data/collections";
import { chipOption, slugify, type Seed } from "@/data/seed";
import type { Availability, ProductOption } from "@/types/product";

/** Minimal RFC 4180 CSV parser (quotes, escaped quotes, commas and newlines inside quotes). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const input = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && input[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

export interface ImportResult { seeds: Seed[]; errors: string[] }

const REQUIRED = ["name", "category", "subcategory", "price", "brand", "description"];
const AVAILABILITY: Availability[] = ["available", "unavailable", "preorder"];
const FLAGS = ["featured", "new", "trending"] as const;
const list = (v: string | undefined) => (v ?? "").split("|").map((x) => x.trim()).filter(Boolean);

/** `length~Length~14"+0|16"+150;texture~Texture~Straight|Body wave`  ->  ProductOption[] */
function parseOptions(raw: string | undefined, row: number, errors: string[]): ProductOption[] {
  const out: ProductOption[] = [];
  for (const part of (raw ?? "").split(";").map((p) => p.trim()).filter(Boolean)) {
    const [id, label, values] = part.split("~");
    if (!id || !label || !values) { errors.push(`Row ${row}: option "${part}" must look like id~Label~value1|value2+adjustment`); continue; }
    const parsed = values.split("|").map((v) => {
      const m = /^(.*?)(?:\+(\d+(?:\.\d+)?))?$/.exec(v.trim());
      const value = (m?.[1] ?? v).trim();
      return m?.[2] ? ([value, Number(m[2])] as [string, number]) : value;
    });
    out.push(chipOption(id.trim(), label.trim(), parsed));
  }
  return out;
}

export function csvToSeeds(text: string): ImportResult {
  const errors: string[] = [];
  const rows = parseCsv(text);
  if (rows.length < 2) return { seeds: [], errors: ["The CSV needs a header row and at least one product row."] };
  const header = rows[0].map((h) => h.trim().toLowerCase());
  for (const col of REQUIRED) if (!header.includes(col)) errors.push(`Missing required column: ${col}`);
  if (errors.length) return { seeds: [], errors };

  const seeds: Seed[] = [];
  const slugs = new Set<string>();
  rows.slice(1).forEach((cells, i) => {
    const row = i + 2;
    const get = (k: string) => (cells[header.indexOf(k)] ?? "").trim();
    const name = get("name");
    const problems: string[] = [];
    for (const col of REQUIRED) if (!get(col)) problems.push(`"${col}" is empty`);
    const category = categories.find((c) => c.id === get("category"));
    if (get("category") && !category) problems.push(`unknown category "${get("category")}" (use one of: ${categories.map((c) => c.id).join(", ")})`);
    if (category && get("subcategory") && !category.subcategories.some((s) => s.id === get("subcategory"))) problems.push(`unknown subcategory "${get("subcategory")}" for ${category.id} (use: ${category.subcategories.map((s) => s.id).join(", ")})`);
    const price = Number(get("price"));
    if (get("price") && (!Number.isFinite(price) || price <= 0)) problems.push(`price "${get("price")}" must be a positive number`);
    const was = get("compare_at_price") ? Number(get("compare_at_price")) : undefined;
    if (was !== undefined && (!Number.isFinite(was) || was <= price)) problems.push("compare_at_price must be a number higher than price");
    const avail = (get("availability") || "available") as Availability;
    if (!AVAILABILITY.includes(avail)) problems.push(`availability must be one of ${AVAILABILITY.join(", ")}`);
    const flags = list(get("flags"));
    for (const f of flags) if (!(FLAGS as readonly string[]).includes(f)) problems.push(`unknown flag "${f}" (use featured, new, trending)`);
    const cols = list(get("collections"));
    for (const c of cols) if (!collections.some((x) => x.id === c)) problems.push(`unknown collection "${c}"`);
    const attrs: Record<string, string> = {};
    for (const pair of list(get("attributes"))) {
      const at = pair.indexOf(":");
      if (at < 1) problems.push(`attribute "${pair}" must look like Key:Value`);
      else attrs[pair.slice(0, at).trim()] = pair.slice(at + 1).trim();
    }
    const slug = slugify(name);
    if (name && slugs.has(slug)) problems.push(`duplicate product name (slug "${slug}")`);
    const extra = parseOptions(get("options"), row, errors);

    if (problems.length) { errors.push(`Row ${row} (${name || "no name"}): ${problems.join("; ")}`); return; }
    slugs.add(slug);
    seeds.push({
      name, cat: category!.id, sub: get("subcategory"), price, was, brand: get("brand"), d: get("description"),
      colours: list(get("colours")), sizes: list(get("sizes")), sizeLabel: get("size_label") || undefined, extra,
      attrs, flags: flags as Seed["flags"], collections: cols, avail, tags: list(get("tags")),
      images: list(get("images")), sample: false,
    });
  });
  return { seeds, errors };
}

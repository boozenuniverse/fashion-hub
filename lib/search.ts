import { products } from "@/data/products";
import type { Article } from "@/types/journal";
import type { Product } from "@/types/product";

const tokenise = (q: string) => q.toLowerCase().split(/[^a-z0-9\u00c0-\u024f]+/).filter(Boolean);

/** Client-side, ranked, AND-matching search over names, categories, brands, tags and descriptions. */
export function searchProducts(query: string, list: Product[] = products, limit?: number): Product[] {
  const tokens = tokenise(query);
  if (tokens.length === 0) return limit ? list.slice(0, limit) : list;
  const ranked = list
    .map((p, index) => {
      const name = p.name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const tags = p.tags.join(" ").toLowerCase();
      const desc = p.description.toLowerCase();
      let score = 0;
      for (const t of tokens) {
        let s = 0;
        if (name.includes(t)) s += name.startsWith(t) ? 8 : 5;
        if (brand.includes(t)) s += 3;
        if (tags.includes(t)) s += 3;
        if (desc.includes(t)) s += 1;
        if (s === 0) return { p, score: 0, index };
        score += s;
      }
      return { p, score, index };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.p);
  return limit ? ranked.slice(0, limit) : ranked;
}

export function searchArticles(query: string, list: Article[]): Article[] {
  const tokens = tokenise(query);
  if (tokens.length === 0) return list;
  return list.filter((a) => {
    const hay = `${a.title} ${a.excerpt} ${a.category}`.toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}

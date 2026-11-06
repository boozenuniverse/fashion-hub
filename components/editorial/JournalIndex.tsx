"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { journalCategories } from "@/data/journal";
import { searchArticles } from "@/lib/search";
import type { Article } from "@/types/journal";
import { ArticleCard } from "./ArticleCard";

export function JournalIndex({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const present = journalCategories.filter((c) => articles.some((a) => a.category === c));
  const filtered = useMemo(() => searchArticles(query, articles).filter((a) => category === "All" || a.category === category), [articles, query, category]);
  const showFeatured = category === "All" && !query.trim() && filtered.length > 0;
  const [featured, ...rest] = filtered;
  const grid = showFeatured ? rest : filtered;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...present].map((c) => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={`min-h-[42px] rounded-full border px-4 text-[14px] ${category === c ? "border-ink bg-ink text-cream" : "border-stone/70 text-ink hover:border-ink"}`}>{c}</button>)}
        </div>
        <div className="relative md:w-72">
          <label htmlFor="journal-search" className="sr-only">Search the Journal</label>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input id="journal-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the Journal" className="field pl-11" />
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "article" : "articles"}</p>
      {filtered.length === 0 ? <p className="py-16 text-center text-muted">No stories match your search.</p> : (
        <>
          {showFeatured && <div className="mb-14"><ArticleCard article={featured} large /></div>}
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{grid.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </>
      )}
    </div>
  );
}

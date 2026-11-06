"use client";

import { ChevronDown, Filter, LayoutGrid, List } from "lucide-react";
import { sortLabels, type SortKey } from "@/lib/filters";

interface Props { total: number; shown: number; sort: SortKey; onSort: (s: SortKey) => void; view: "grid" | "list"; onView: (v: "grid" | "list") => void; onOpenFilters: () => void; activeCount: number; showRelevance: boolean }

/** Row 1 (thumb reachable): Filter and Sort, equal width. Row 2: result count and grid/list toggle. */
export function ProductToolbar({ total, shown, sort, onSort, view, onView, onOpenFilters, activeCount, showRelevance }: Props) {
  const options = [...(showRelevance ? [{ value: "relevance", label: "Most relevant" }] : []), ...Object.entries(sortLabels).map(([value, label]) => ({ value, label }))];
  const toggle = (active: boolean) => `grid h-11 w-11 place-items-center rounded-[10px] transition-colors ${active ? "bg-burgundy text-cream" : "bg-paper text-ink ring-1 ring-line hover:bg-sand-light"}`;
  const box = "relative flex min-h-[44px] items-center gap-2 rounded-[10px] border border-taupe/60 bg-paper px-3.5 font-sans text-[14px] text-ink";
  return (
    <div className="mb-5 md:mb-8">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-[1fr_auto]">
        <button type="button" onClick={onOpenFilters} className={`${box} justify-between lg:hidden`}>
          <span className="flex items-center gap-2"><Filter aria-hidden="true" className="h-[18px] w-[18px] text-burgundy" strokeWidth={1.5} />Filter{activeCount ? ` (${activeCount})` : ""}</span><ChevronDown aria-hidden="true" className="h-4 w-4" />
        </button>
        <label className={`${box} min-w-0 lg:ml-auto lg:min-w-[220px]`}>
          <span className="sr-only">Sort by</span>
          <span aria-hidden="true" className="whitespace-nowrap text-muted">Sort:</span>
          <select value={sort} onChange={(e) => onSort(e.target.value as SortKey)} className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[10px] bg-transparent pl-[3.4rem] pr-8 text-[14px] font-medium text-ink focus:outline-none">
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 h-4 w-4" />
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p role="status" aria-live="polite" className="text-[13px] text-muted">{total === 0 ? "No products" : `Showing ${shown} of ${total} ${total === 1 ? "product" : "products"}`}</p>
        <div role="group" aria-label="Layout" className="flex shrink-0 gap-2">
          <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => onView("grid")} className={toggle(view === "grid")}><LayoutGrid aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} /></button>
          <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => onView("list")} className={toggle(view === "list")}><List aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} /></button>
        </div>
      </div>
    </div>
  );
}

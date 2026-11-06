"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { ProductListItem } from "@/components/product/ProductList";
import { activeFilterCount, buildFacets, emptyFilters, filterProducts, PAGE_SIZE, sortProducts, type ProductFilters as Filters, type SortKey } from "@/lib/filters";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/types/product";
import { ProductFilters } from "./ProductFilters";
import { ProductGrid } from "./ProductGrid";
import { CatalogueSkeleton } from "./ProductSkeleton";
import { ProductToolbar } from "./ProductToolbar";

export interface CatalogueProps {
  /** Products in scope for this page (all products, one category, one collection...). */
  products: Product[];
  /** Starting filter values (e.g. new arrivals page). */
  initial?: Partial<Filters>;
  /** Initial text query (search page). */
  initialQuery?: string;
  /** Show the department filter (false on category pages). */
  showDepartments?: boolean;
  /** Read `q` from the URL (search page). */
  readQueryParam?: boolean;
}

const SORTS: SortKey[] = ["relevance", "featured", "newest", "price-asc", "price-desc", "name-asc", "name-desc"];

function Inner({ products, initial, initialQuery = "", showDepartments = true, readQueryParam = false }: CatalogueProps) {
  const params = useSearchParams();
  const paramsKey = params.toString();

  const fromParams = () => {
    const sub = params.get("sub");
    const cat = params.get("cat");
    const col = params.get("collection");
    const sort = params.get("sort") as SortKey | null;
    const filters: Filters = {
      ...emptyFilters, ...initial,
      subcategoryIds: sub ? [sub] : initial?.subcategoryIds ?? [],
      categoryIds: cat ? [cat] : initial?.categoryIds ?? [],
      collectionIds: col ? [col] : initial?.collectionIds ?? [],
      newOnly: params.get("new") === "1" || Boolean(initial?.newOnly),
      onSale: params.get("sale") === "1" || Boolean(initial?.onSale),
    };
    const q = readQueryParam ? params.get("q") ?? initialQuery : initialQuery;
    return { filters, q, sort: sort && SORTS.includes(sort) ? sort : null };
  };

  const [state] = useState(fromParams);
  const [filters, setFilters] = useState<Filters>(state.filters);
  const [query, setQuery] = useState(state.q);
  const [sort, setSort] = useState<SortKey>(state.sort ?? (state.q ? "relevance" : "featured"));
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Re-apply URL-driven filters when navigating between links to the same page (e.g. mega menu).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const next = fromParams();
    setFilters(next.filters); setQuery(next.q); setSort(next.sort ?? (next.q ? "relevance" : "featured")); setVisible(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey]);

  const textMatched = useMemo(() => (query.trim() ? searchProducts(query, products) : products), [query, products]);
  const facetBase = useMemo(() => (filters.categoryIds.length ? textMatched.filter((p) => filters.categoryIds.includes(p.categoryId)) : textMatched), [textMatched, filters.categoryIds]);
  const facets = useMemo(() => buildFacets(facetBase), [facetBase]);
  const results = useMemo(() => {
    const filtered = filterProducts(textMatched, filters);
    return sort === "relevance" ? filtered : sortProducts(filtered, sort);
  }, [textMatched, filters, sort]);

  const change = (next: Filters) => { setFilters(next); setVisible(PAGE_SIZE); };
  const clear = () => { setFilters({ ...emptyFilters, categoryIds: showDepartments ? [] : filters.categoryIds }); setVisible(PAGE_SIZE); };
  const activeCount = activeFilterCount(filters) - (showDepartments ? 0 : filters.categoryIds.length);
  const shown = results.slice(0, visible);

  return (
    <div>
      {readQueryParam && query.trim() && <p className="mb-6 text-muted">Results for <span className="font-semibold text-ink">&ldquo;{query.trim()}&rdquo;</span></p>}
      <ProductToolbar total={results.length} shown={shown.length} sort={sort} onSort={setSort} view={view} onView={setView} onOpenFilters={() => setFiltersOpen(true)} activeCount={activeCount} showRelevance={Boolean(query.trim())} />
      <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block" aria-label="Product filters">
          <ProductFilters facets={facets} filters={filters} onChange={change} onClear={clear} showCategories={showDepartments} idPrefix="d" />
        </aside>
        <div>
          {results.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-[2rem] text-ink">Nothing matches just yet</p>
              <p className="mx-auto mt-2 max-w-md text-muted">Try removing a filter or searching with a different word.</p>
              <div className="mt-6 flex justify-center gap-3"><Button onClick={clear}>Clear filters</Button><Button href="/shop/" variant="outline">Browse all</Button></div>
            </div>
          ) : view === "grid" ? (
            <ProductGrid products={shown} columns="catalogue" priorityCount={4} />
          ) : (
            <div>{shown.map((p) => <ProductListItem key={p.id} product={p} />)}</div>
          )}
          {results.length > visible && (
            <div className="mt-14 flex flex-col items-center gap-3">
              <p className="text-[13px] text-muted">Showing {shown.length} of {results.length}</p>
              <div className="h-[2px] w-48 bg-line" aria-hidden="true"><div className="h-full bg-ink" style={{ width: `${(shown.length / results.length) * 100}%` }} /></div>
              <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Load more</Button>
            </div>
          )}
        </div>
      </div>
      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" side="bottom">
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4"><ProductFilters facets={facets} filters={filters} onChange={change} onClear={clear} showCategories={showDepartments} idPrefix="m" compact /></div>
        <div className="shrink-0 border-t border-line bg-cream p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"><Button className="w-full" onClick={() => setFiltersOpen(false)}>Show {results.length} {results.length === 1 ? "product" : "products"}</Button></div>
      </Drawer>
    </div>
  );
}

export function Catalogue(props: CatalogueProps) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <Inner {...props} />
    </Suspense>
  );
}

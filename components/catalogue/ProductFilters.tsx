"use client";

import type { ReactNode } from "react";
import { getCategoryById, getSubcategory } from "@/lib/categories";
import { getCollections } from "@/lib/products";
import { activeFilterCount, type Facets, type ProductFilters as Filters } from "@/lib/filters";
import type { Availability } from "@/types/product";

const availabilityLabel: Record<Availability, string> = { available: "Available", preorder: "Pre-order", unavailable: "Unavailable" };
const toggleIn = <T,>(list: T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Group({ title, children, open = true }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-line py-4">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between font-serif text-[1.25rem] text-ink [&::-webkit-details-marker]:hidden">
        {title}<span aria-hidden="true" className="text-wine transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  );
}

function Check({ id, label, count, checked, onChange }: { id: string; label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[15px] text-charcoal">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-[18px] w-[18px] accent-[#531C22]" />
      <span className="flex-1">{label}</span>
      {typeof count === "number" && <span className="text-[12.5px] text-muted">{count}</span>}
    </label>
  );
}

interface Props { facets: Facets; filters: Filters; onChange: (next: Filters) => void; onClear: () => void; showCategories: boolean; idPrefix?: string; compact?: boolean }

export function ProductFilters({ facets, filters, onChange, onClear, showCategories, idPrefix = "f", compact = false }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const count = activeFilterCount(filters);
  const singleCategoryId = facets.categories.length === 1 ? facets.categories[0].id : filters.categoryIds.length === 1 ? filters.categoryIds[0] : undefined;
  const collections = getCollections();
  const numeric = (v: string) => (v.trim() === "" || Number.isNaN(Number(v)) ? null : Math.max(0, Number(v)));

  return (
    <div>
      <div className="flex items-center justify-between pb-1">
        {!compact && <p className="font-serif text-[1.6rem] text-ink">Filters</p>}
        {count > 0 && <button type="button" onClick={onClear} className="min-h-[44px] text-[14px] text-wine underline hover:text-ink">Clear all ({count})</button>}
      </div>

      {(facets.hasSale || facets.hasNew) && (
        <Group title="Highlights">
          {facets.hasNew && <Check id={`${idPrefix}-new`} label="New arrivals" checked={filters.newOnly} onChange={() => set({ newOnly: !filters.newOnly })} />}
          {facets.hasSale && <Check id={`${idPrefix}-sale`} label="On sale" checked={filters.onSale} onChange={() => set({ onSale: !filters.onSale })} />}
        </Group>
      )}

      {showCategories && facets.categories.length > 1 && (
        <Group title="Department">
          {facets.categories.map((c) => <Check key={c.id} id={`${idPrefix}-cat-${c.id}`} label={getCategoryById(c.id)?.name ?? c.id} count={c.count} checked={filters.categoryIds.includes(c.id)} onChange={() => set({ categoryIds: toggleIn(filters.categoryIds, c.id), subcategoryIds: [] })} />)}
        </Group>
      )}

      {facets.subcategories.length > 1 && singleCategoryId && (
        <Group title="Type">
          {facets.subcategories.map((s) => <Check key={s.id} id={`${idPrefix}-sub-${s.id}`} label={getSubcategory(singleCategoryId, s.id)?.name ?? s.id} count={s.count} checked={filters.subcategoryIds.includes(s.id)} onChange={() => set({ subcategoryIds: toggleIn(filters.subcategoryIds, s.id) })} />)}
        </Group>
      )}

      {facets.priceRange[1] > facets.priceRange[0] && (
        <Group title="Price (GHS)">
          <div className="grid grid-cols-2 gap-3">
            <div><label htmlFor={`${idPrefix}-min`} className="mb-1 block text-[12.5px] text-muted">From</label><input id={`${idPrefix}-min`} inputMode="numeric" className="field" placeholder={String(facets.priceRange[0])} value={filters.priceMin ?? ""} onChange={(e) => set({ priceMin: numeric(e.target.value) })} /></div>
            <div><label htmlFor={`${idPrefix}-max`} className="mb-1 block text-[12.5px] text-muted">To</label><input id={`${idPrefix}-max`} inputMode="numeric" className="field" placeholder={String(facets.priceRange[1])} value={filters.priceMax ?? ""} onChange={(e) => set({ priceMax: numeric(e.target.value) })} /></div>
          </div>
        </Group>
      )}

      {facets.colours.length > 0 && (
        <Group title="Colour">
          <ul className="flex flex-wrap gap-2.5">
            {facets.colours.map((c) => {
              const on = filters.colours.includes(c.value);
              return <li key={c.value}><button type="button" aria-pressed={on} aria-label={`${c.value} (${c.count})`} title={c.value} onClick={() => set({ colours: toggleIn(filters.colours, c.value) })} className={`h-11 w-11 rounded-full border-[5px] border-paper shadow-[0_0_0_1px_var(--color-line)] ${on ? "outline outline-2 outline-ink" : ""}`} style={{ backgroundColor: c.swatch }} /></li>;
            })}
          </ul>
        </Group>
      )}

      {facets.sizes.length > 0 && (
        <Group title="Size">
          <ul className="flex flex-wrap gap-2">
            {facets.sizes.map((s) => {
              const on = filters.sizes.includes(s.value);
              return <li key={s.value}><button type="button" aria-pressed={on} onClick={() => set({ sizes: toggleIn(filters.sizes, s.value) })} className={`min-h-[44px] min-w-[48px] rounded-[8px] border px-3 text-[14px] ${on ? "border-ink bg-ink text-cream" : "border-stone/70 bg-paper hover:border-ink"}`}>{s.value}</button></li>;
            })}
          </ul>
        </Group>
      )}

      {facets.brands.length > 1 && (
        <Group title="Brand" open={false}>
          {facets.brands.map((b) => <Check key={b.value} id={`${idPrefix}-brand-${b.value}`} label={b.value} count={b.count} checked={filters.brands.includes(b.value)} onChange={() => set({ brands: toggleIn(filters.brands, b.value) })} />)}
        </Group>
      )}

      {facets.availability.length > 0 && (
        <Group title="Availability" open={false}>
          {facets.availability.map((a) => <Check key={a.value} id={`${idPrefix}-av-${a.value}`} label={availabilityLabel[a.value]} count={a.count} checked={filters.availability.includes(a.value)} onChange={() => set({ availability: toggleIn(filters.availability, a.value) })} />)}
        </Group>
      )}

      {facets.collections.length > 0 && (
        <Group title="Collections" open={false}>
          {facets.collections.map((c) => <Check key={c.id} id={`${idPrefix}-col-${c.id}`} label={collections.find((x) => x.id === c.id)?.title ?? c.id} count={c.count} checked={filters.collectionIds.includes(c.id)} onChange={() => set({ collectionIds: toggleIn(filters.collectionIds, c.id) })} />)}
        </Group>
      )}
    </div>
  );
}

"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePersistentState } from "@/hooks/useLocalStorage";
import { isStringArray } from "@/lib/wishlist";
import { getProductBySlug } from "@/lib/products";
import type { Product } from "@/types/product";

const MAX = 8;

interface RecentValue { products: Product[]; record: (slug: string) => void }
const RecentContext = createContext<RecentValue | null>(null);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = usePersistentState<string[]>("recently-viewed", [], isStringArray);
  const record = useCallback((slug: string) => setSlugs((prev) => (prev[0] === slug ? prev : [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX))), [setSlugs]);
  const products = useMemo(() => slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p)), [slugs]);
  const value = useMemo(() => ({ products, record }), [products, record]);
  return <RecentContext.Provider value={value}>{children}</RecentContext.Provider>;
}

export function useRecentlyViewed(): RecentValue {
  const ctx = useContext(RecentContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}

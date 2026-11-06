"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePersistentState } from "@/hooks/useLocalStorage";
import { isStringArray, toggleWishlist } from "@/lib/wishlist";
import { getProductById } from "@/lib/products";
import type { Product } from "@/types/product";
import { useUI } from "./UIContext";

interface WishlistValue {
  ids: string[];
  products: Product[];
  count: number;
  hydrated: boolean;
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
}

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds, hydrated] = usePersistentState<string[]>("wishlist", [], isStringArray);
  const { pushToast } = useUI();

  const products = useMemo(() => ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p)), [ids]);
  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback((product: Product) => {
    const adding = !ids.includes(product.id);
    setIds((prev) => toggleWishlist(prev, product.id));
    pushToast(adding ? `${product.name} saved to your wishlist.` : `${product.name} removed from your wishlist.`, "info");
  }, [ids, setIds, pushToast]);
  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), [setIds]);

  const value = useMemo(() => ({ ids, products, count: products.length, hydrated, has, toggle, remove }), [ids, products, hydrated, has, toggle, remove]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

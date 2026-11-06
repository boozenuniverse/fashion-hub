"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { usePersistentState } from "@/hooks/useLocalStorage";
import { addLine, cartTotals, isCartLines, priceLines, removeLine, setQuantity } from "@/lib/cart";
import { getProductById } from "@/lib/products";
import type { CartLine, CartTotals, PricedLine } from "@/types/cart";
import type { Product } from "@/types/product";
import { useUI } from "./UIContext";

interface CartValue {
  lines: PricedLine[];
  totals: CartTotals;
  hydrated: boolean;
  add: (product: Product, selections: Record<string, string>, quantity?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [stored, setStored, hydrated] = usePersistentState<CartLine[]>("cart", [], isCartLines);
  const { openBag } = useUI();

  const lines = useMemo(() => priceLines(stored, getProductById), [stored]);
  const totals = useMemo(() => cartTotals(lines), [lines]);

  const add = useCallback((product: Product, selections: Record<string, string>, quantity = 1) => {
    setStored((prev) => addLine(prev, product.id, selections, quantity));
    openBag();
  }, [setStored, openBag]);
  const remove = useCallback((key: string) => setStored((prev) => removeLine(prev, key)), [setStored]);
  const setQty = useCallback((key: string, q: number) => setStored((prev) => setQuantity(prev, key, q)), [setStored]);
  const clear = useCallback(() => setStored([]), [setStored]);

  const value = useMemo(() => ({ lines, totals, hydrated, add, remove, setQty, clear }), [lines, totals, hydrated, add, remove, setQty, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

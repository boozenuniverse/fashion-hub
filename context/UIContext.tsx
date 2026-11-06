"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export interface ToastItem { id: number; message: string; tone: "success" | "info" | "error" }

interface UIValue {
  bagOpen: boolean; openBag: () => void; closeBag: () => void;
  navOpen: boolean; openNav: () => void; closeNav: () => void;
  shopOpen: boolean; openShop: () => void; closeShop: () => void;
  searchOpen: boolean; openSearch: () => void; closeSearch: () => void;
  quickViewSlug: string | null; openQuickView: (slug: string) => void; closeQuickView: () => void;
  toasts: ToastItem[]; pushToast: (message: string, tone?: ToastItem["tone"]) => void; dismissToast: (id: number) => void;
}

const UIContext = createContext<UIValue | null>(null);
let toastId = 0;

export function UIProvider({ children }: { children: ReactNode }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const pushToast = useCallback((message: string, tone: ToastItem["tone"] = "success") => {
    const id = ++toastId;
    setToasts((t) => [...t.slice(-2), { id, message, tone }]);
    window.setTimeout(() => dismissToast(id), 4500);
  }, [dismissToast]);

  const value = useMemo<UIValue>(() => ({
    bagOpen, openBag: () => setBagOpen(true), closeBag: () => setBagOpen(false),
    navOpen, openNav: () => { setShopOpen(false); setNavOpen(true); }, closeNav: () => setNavOpen(false),
    shopOpen, openShop: () => { setNavOpen(false); setShopOpen(true); }, closeShop: () => setShopOpen(false),
    searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
    quickViewSlug, openQuickView: setQuickViewSlug, closeQuickView: () => setQuickViewSlug(null),
    toasts, pushToast, dismissToast,
  }), [bagOpen, navOpen, shopOpen, searchOpen, quickViewSlug, toasts, pushToast, dismissToast]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}

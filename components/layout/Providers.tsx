"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { UIProvider } from "@/context/UIContext";
import { WishlistProvider } from "@/context/WishlistContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <UIProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </UIProvider>
    </MotionConfig>
  );
}

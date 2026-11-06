"use client";

import { useEffect } from "react";
import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";

/** Records the current product view and lists other recently viewed products from this browser. */
export function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const { products, record } = useRecentlyViewed();
  useEffect(() => { record(currentSlug); }, [currentSlug, record]);
  const others = products.filter((p) => p.slug !== currentSlug).slice(0, 4);
  if (others.length === 0) return null;
  return (
    <section className="section-y-sm">
      <SectionHeading title="Recently viewed" />
      <ProductGrid products={others} />
    </section>
  );
}

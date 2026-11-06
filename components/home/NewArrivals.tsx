"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { OrnateHeading } from "@/components/ui/OrnateHeading";
import { homepage } from "@/data/homepage";
import { getProductBySlug } from "@/lib/products";
import type { Product } from "@/types/product";
import { LandingProductCard } from "./LandingProductCard";

/** Phones show the first two products as a 2-up grid; large screens scroll a carousel of six-plus. */
export function NewArrivals() {
  const scroller = useRef<HTMLUListElement>(null);
  const items = homepage.newArrivals.items
    .map((it) => ({ ...it, product: getProductBySlug(it.slug) }))
    .filter((it): it is typeof it & { product: Product } => Boolean(it.product));

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  const arrow = "absolute top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-ink shadow-md transition-colors hover:bg-burgundy hover:text-cream lg:grid";

  return (
    <section aria-labelledby="new-arrivals" className="bg-sand-light/60 py-8 md:py-10">
      <div className="container-x">
        <div id="new-arrivals"><OrnateHeading title={homepage.newArrivals.title} subtitle={homepage.newArrivals.subtitle} action={{ label: "View All", href: "/new-arrivals/" }} /></div>
        <div className="relative">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll new arrivals left" className={`${arrow} -left-5`}><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll new arrivals right" className={`${arrow} -right-5`}><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
          <ul ref={scroller} className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:snap-x lg:snap-mandatory lg:gap-4 lg:overflow-x-auto lg:pb-2 no-scrollbar">
            {items.map((it, i) => (
              <li key={it.slug} className={`${i >= 2 ? "hidden lg:block" : ""} lg:w-[calc((100%-5*1rem)/6)] lg:shrink-0 lg:snap-start`}>
                <LandingProductCard product={it.product} image={it.image} wide={it.wide} priority={i < 2} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

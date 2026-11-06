"use client";

import { Drawer } from "@/components/ui/Drawer";
import { useUI } from "@/context/UIContext";
import { navItems } from "@/data/navigation";
import { NavAccordion } from "./NavAccordion";

/** Bottom sheet opened by the "Shop" tab: Fashion, Accessories, Hair & Beauty and Discover, each a dropdown. */
export function MobileShopSheet() {
  const { shopOpen, closeShop } = useUI();
  const shop = navItems.find((n) => n.label === "Shop");
  return (
    <Drawer open={shopOpen} onClose={closeShop} title="Shop" side="bottom">
      <nav aria-label="Shop" className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-1">
        {shop?.mega?.columns.map((col, i) => <NavAccordion key={col.title} title={col.title} columns={[{ title: col.title, links: col.links }]} hideColumnTitles onNavigate={closeShop} defaultOpen={i === 0} />)}
      </nav>
    </Drawer>
  );
}

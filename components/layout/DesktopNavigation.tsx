"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/navigation";
import { MegaMenu } from "./MegaMenu";

export function DesktopNavigation() {
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const pathname = usePathname() ?? "/";

  const show = (i: number) => { window.clearTimeout(timer.current); setOpen(i); };
  const hideSoon = () => { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setOpen(null), 140); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); window.clearTimeout(timer.current); };
  }, []);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  return (
    <nav aria-label="Primary" className="hidden lg:block" onMouseLeave={hideSoon}>
      <ul className="flex items-center justify-center gap-x-6 xl:gap-x-8">
        {navItems.map((item, i) => {
          const hasMega = Boolean(item.mega);
          const panelId = `mega-${i}`;
          const active = isActive(item.href);
          return (
            <li key={item.label} onMouseEnter={() => (hasMega ? show(i) : setOpen(null))} onFocus={() => (hasMega ? show(i) : setOpen(null))} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hideSoon(); }}>
              <Link href={item.href} aria-current={active && !hasMega ? "page" : undefined} aria-haspopup={hasMega ? "true" : undefined} aria-expanded={hasMega ? open === i : undefined} aria-controls={hasMega && open === i ? panelId : undefined} onClick={() => setOpen(null)}
                className={`relative flex items-center gap-1 py-[22px] font-sans text-[14px] font-medium transition-colors ${open === i || active ? "text-burgundy" : "text-ink hover:text-burgundy"}`}>
                {item.label}
                {hasMega && <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open === i ? "rotate-180" : ""}`} />}
                {active && <span aria-hidden="true" className="absolute inset-x-0 bottom-3 h-[2px] bg-burgundy" />}
              </Link>
              {hasMega && open === i && <MegaMenu item={item} id={panelId} onNavigate={() => setOpen(null)} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

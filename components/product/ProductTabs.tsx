"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

export function ProductTabs({ product }: { product: Product }) {
  const base = useId();
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "delivery", label: "Delivery" },
    { id: "returns", label: "Returns" },
  ];
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  const specs = Object.entries(product.attributes);
  return (
    <div>
      <div role="tablist" aria-label="Product information" className="flex gap-6 overflow-x-auto border-b border-line no-scrollbar">
        {tabs.map((t, i) => (
          <button key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${base}-tab-${t.id}`} aria-selected={active === i} aria-controls={`${base}-panel-${t.id}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}
            className={`-mb-px min-h-[48px] whitespace-nowrap border-b-2 px-1 font-serif text-[1.35rem] transition-colors ${active === i ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${base}-panel-${t.id}`} aria-labelledby={`${base}-tab-${t.id}`} hidden={active !== i} className="max-w-[72ch] py-8">
          {t.id === "description" && <p className="text-[16px] leading-relaxed text-charcoal">{product.description}</p>}
          {t.id === "specifications" && (
            <dl className="divide-y divide-line border-y border-line">
              {specs.map(([k, v]) => <div key={k} className="grid grid-cols-[1fr_1.4fr] gap-4 py-3"><dt className="text-muted">{k}</dt><dd className="text-ink">{String(v)}</dd></div>)}
              <div className="grid grid-cols-[1fr_1.4fr] gap-4 py-3"><dt className="text-muted">Brand</dt><dd className="text-ink">{product.brand}</dd></div>
            </dl>
          )}
          {t.id === "delivery" && <p>{siteConfig.delivery.defaultMessage} See the <Link href="/shipping/" className="link-quiet">shipping policy</Link> for more.</p>}
          {t.id === "returns" && <p>{siteConfig.returns.summary} Read the full <Link href="/returns/" className="link-quiet">returns policy</Link> before you order.</p>}
        </div>
      ))}
    </div>
  );
}

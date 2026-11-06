"use client";

import Link from "next/link";
import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { PriceTag } from "@/components/ui/PriceTag";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { useCart } from "@/context/CartContext";
import { MAX_QUANTITY, unitPrice } from "@/lib/cart";
import { formatPrice } from "@/lib/currency";
import { getCategoryById } from "@/lib/categories";
import type { Product, ProductOption } from "@/types/product";

function OptionGroup({ option, value, onChange, sizeGuideHref }: { option: ProductOption; value?: string; onChange: (v: string) => void; sizeGuideHref?: string }) {
  const labelId = `opt-${option.id}`;
  return (
    <div role="group" aria-labelledby={labelId}>
      <div className="mb-1 flex items-baseline justify-between">
        <p id={labelId} className="text-[14px] font-semibold text-ink">{option.label}{value ? <span className="ml-2 font-normal text-muted">{value}</span> : null}</p>
        {sizeGuideHref && option.id === "size" && <Link href={sizeGuideHref} className="inline-flex min-h-[44px] items-center text-[13.5px] text-muted underline hover:text-ink">Size guide</Link>}
      </div>
      <div className="flex flex-wrap gap-x-1 gap-y-1">
        {option.values.map((v) => {
          const selected = value === v.value;
          const disabled = v.available === false;
          if (option.kind === "swatch") {
            return (
              <button key={v.value} type="button" disabled={disabled} aria-pressed={selected} aria-label={`${option.label}: ${v.value}${disabled ? " (unavailable)" : ""}`} title={v.value} onClick={() => onChange(v.value)} className={`grid h-11 w-11 place-items-center ${disabled ? "opacity-40" : ""}`}>
                <span className={`block h-8 w-8 rounded-full border border-line ring-offset-2 transition ${selected ? "ring-2 ring-ink" : ""}`} style={{ backgroundColor: v.swatch }} />
              </button>
            );
          }
          return (
            <button key={v.value} type="button" disabled={disabled} aria-pressed={selected} onClick={() => onChange(v.value)}
              className={`m-0.5 min-h-[44px] min-w-[48px] rounded-[8px] border px-3.5 text-[14px] transition-colors ${selected ? "border-burgundy bg-burgundy text-cream" : "border-taupe/70 bg-paper text-ink hover:border-burgundy"} ${disabled ? "text-stone line-through opacity-60" : ""}`}>
              {v.value}{v.priceAdjustment ? <span className={`ml-1 text-[12px] ${selected ? "text-sand" : "text-muted"}`}>+{v.priceAdjustment}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface Props {
  product: Product;
  onAdded?: () => void;
  /** "viewport": mobile bar fixed above the tab bar. "container": sticks to the bottom of a scrolling dialog. */
  stickyMode?: "viewport" | "container" | "none";
  hidePrice?: boolean;
}

export function ProductPurchase({ product, onAdded, stickyMode = "none", hidePrice = false }: Props) {
  const { add } = useCart();
  const category = getCategoryById(product.categoryId);
  const [selections, setSelections] = useState<Record<string, string>>(() => Object.fromEntries(product.options.filter((o) => o.values.length === 1).map((o) => [o.id, o.values[0].value])));
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const price = useMemo(() => unitPrice(product, selections), [product, selections]);
  const unavailable = product.availability === "unavailable";
  const sizeGuideHref = category?.sizeGuide ? `/size-guide/#${category.sizeGuide}` : undefined;

  function choose(id: string, value: string) { setSelections((s) => ({ ...s, [id]: value })); setError(null); }

  function addToBag() {
    const missing = product.options.filter((o) => o.required && !selections[o.id]);
    if (missing.length) { setError(`Please choose your ${missing.map((o) => o.label.toLowerCase()).join(" and ")}.`); return; }
    add(product, selections, quantity);
    setError(null);
    setAdded(true);                                  // instant feedback (well under 400 ms)
    timer.current = window.setTimeout(() => setAdded(false), 1800);
    onAdded?.();
  }

  const barCls = stickyMode === "viewport"
    ? "fixed inset-x-0 bottom-[calc(58px+env(safe-area-inset-bottom))] z-30 border-t border-line bg-cream/95 px-4 py-2.5 backdrop-blur lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
    : stickyMode === "container" ? "sticky bottom-0 z-10 -mx-4 border-t border-line bg-cream/95 px-4 py-2.5 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0" : "";

  return (
    <div className="space-y-5">
      {!hidePrice && <PriceTag price={price} compareAt={product.compareAtPrice ? product.compareAtPrice + (price - product.price) : undefined} size="lg" />}
      {product.options.map((o) => <OptionGroup key={o.id} option={o} value={selections[o.id]} onChange={(v) => choose(o.id, v)} sizeGuideHref={sizeGuideHref} />)}

      <div>
        <p id="qty-label" className="mb-1.5 text-[14px] font-semibold text-ink">Quantity</p>
        <div className="inline-flex items-center rounded-[8px] border border-taupe/70 bg-paper" role="group" aria-labelledby="qty-label">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center hover:bg-sand-light disabled:text-stone"><Minus aria-hidden="true" className="h-4 w-4" /></button>
          <span className="min-w-[2.5rem] text-center font-semibold" aria-live="polite">{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))} disabled={quantity >= MAX_QUANTITY} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center hover:bg-sand-light disabled:text-stone"><Plus aria-hidden="true" className="h-4 w-4" /></button>
        </div>
      </div>

      {product.availability === "preorder" && <p className="text-[14px] text-muted">Pre-order item: timing is confirmed when you send your enquiry.</p>}

      <div className={barCls}>
        {error && <p role="alert" className="mb-2 rounded-[8px] border border-[#9b2c2c]/40 bg-[#9b2c2c]/5 px-3 py-2 text-[13.5px] text-[#7a2a22]">{error}</p>}
        <div className="flex items-center gap-2.5">
          {stickyMode !== "none" && <p className="shrink-0 lg:hidden"><span className="block text-[11.5px] leading-none text-muted">Total</span><span className="block text-[16px] font-bold leading-tight text-burgundy">{formatPrice(price * quantity)}</span></p>}
          <Button onClick={addToBag} disabled={unavailable} className="min-w-0 flex-1">
            {added ? <><Check aria-hidden="true" className="h-4 w-4" />Added to bag</> : unavailable ? "Currently unavailable" : product.availability === "preorder" ? "Add pre-order to bag" : "Add to bag"}
          </Button>
          <WishlistButton product={product} variant="button" className="hidden w-auto sm:inline-flex" />
        </div>
        <span className="sr-only" role="status">{added ? `${product.name} added to your bag` : ""}</span>
      </div>
      <WishlistButton product={product} variant="button" className="w-full sm:hidden" />
    </div>
  );
}

import { orderRules } from "@/config/business";
import type { CartLine, CartTotals, PricedLine } from "@/types/cart";
import type { Product } from "@/types/product";

export const MAX_QUANTITY = orderRules.maxQuantityPerLine;

export function lineKey(productId: string, selections: Record<string, string>): string {
  const parts = Object.keys(selections).sort().map((k) => `${k}=${selections[k]}`);
  return [productId, ...parts].join("|");
}

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n) || 1));

export function addLine(lines: CartLine[], productId: string, selections: Record<string, string>, quantity = 1): CartLine[] {
  const key = lineKey(productId, selections);
  const existing = lines.find((l) => l.key === key);
  if (existing) return lines.map((l) => (l.key === key ? { ...l, quantity: clamp(l.quantity + quantity) } : l));
  return [...lines, { key, productId, selections: { ...selections }, quantity: clamp(quantity) }];
}

export const removeLine = (lines: CartLine[], key: string): CartLine[] => lines.filter((l) => l.key !== key);

export function setQuantity(lines: CartLine[], key: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeLine(lines, key);
  return lines.map((l) => (l.key === key ? { ...l, quantity: clamp(quantity) } : l));
}

/** Base price plus any price adjustments of the selected option values. */
export function unitPrice(product: Product, selections: Record<string, string>): number {
  const extra = product.options.reduce((sum, option) => {
    const chosen = option.values.find((v) => v.value === selections[option.id]);
    return sum + (chosen?.priceAdjustment ?? 0);
  }, 0);
  return product.price + extra;
}

export function priceLines(lines: CartLine[], lookup: (id: string) => Product | undefined): PricedLine[] {
  const priced: PricedLine[] = [];
  for (const line of lines) {
    const product = lookup(line.productId);
    if (!product) continue; // product removed from the catalogue since it was saved
    const price = unitPrice(product, line.selections);
    priced.push({ ...line, product, unitPrice: price, lineTotal: price * line.quantity, unavailable: product.availability === "unavailable" });
  }
  return priced;
}

export function cartTotals(lines: PricedLine[]): CartTotals {
  const active = lines.filter((l) => !l.unavailable);
  const subtotal = active.reduce((s, l) => s + l.lineTotal, 0);
  const savings = active.reduce((s, l) => s + Math.max(0, (l.product.compareAtPrice ?? l.product.price) - l.product.price) * l.quantity, 0);
  return { itemCount: active.reduce((s, l) => s + l.quantity, 0), subtotal, total: subtotal, savings };
}

export function isCartLines(value: unknown): value is CartLine[] {
  return (
    Array.isArray(value) &&
    value.every((l) => l && typeof l.key === "string" && typeof l.productId === "string" && typeof l.quantity === "number" && l.selections && typeof l.selections === "object")
  );
}

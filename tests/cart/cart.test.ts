import { describe, it, expect } from "vitest";
import { addLine, cartTotals, lineKey, MAX_QUANTITY, priceLines, removeLine, setQuantity, unitPrice, isCartLines } from "@/lib/cart";
import { getProductById, getProductBySlug } from "@/lib/products";
import { toggleWishlist } from "@/lib/wishlist";

const dress = getProductBySlug("satin-slip-dress")!;
const wig = getProductBySlug("body-wave-lace-front-wig")!;

describe("cart", () => {
  it("adds, merges identical selections and separates different ones", () => {
    let lines = addLine([], dress.id, { colour: "Champagne", size: "M" }, 1);
    lines = addLine(lines, dress.id, { size: "M", colour: "Champagne" }, 2);
    expect(lines.length).toBe(1);
    expect(lines[0].quantity).toBe(3);
    lines = addLine(lines, dress.id, { colour: "Espresso", size: "M" }, 1);
    expect(lines.length).toBe(2);
    expect(lineKey("a", { b: "1", a: "2" })).toBe("a|a=2|b=1");
  });
  it("updates quantities, clamps, and removes", () => {
    let lines = addLine([], dress.id, { size: "M" }, 1);
    lines = setQuantity(lines, lines[0].key, 99);
    expect(lines[0].quantity).toBe(MAX_QUANTITY);
    lines = setQuantity(lines, lines[0].key, 0);
    expect(lines.length).toBe(0);
    lines = addLine([], dress.id, { size: "S" }, 1);
    expect(removeLine(lines, lines[0].key).length).toBe(0);
  });
  it("applies option price adjustments and totals", () => {
    expect(unitPrice(wig, { length: `20"` })).toBe(wig.price + 520);
    expect(unitPrice(wig, {})).toBe(wig.price);
    let lines = addLine([], dress.id, { size: "M" }, 2);
    lines = addLine(lines, wig.id, { length: `16"` }, 1);
    const priced = priceLines(lines, getProductById);
    const totals = cartTotals(priced);
    expect(totals.itemCount).toBe(3);
    expect(totals.subtotal).toBe(dress.price * 2 + wig.price + 150);
    expect(totals.total).toBe(totals.subtotal);
    expect(totals.savings).toBe((dress.compareAtPrice! - dress.price) * 2);
  });
  it("drops lines for products that no longer exist and excludes unavailable products from totals", () => {
    const gone = [{ key: "x", productId: "nope", selections: {}, quantity: 1 }];
    expect(priceLines(gone, getProductById).length).toBe(0);
    const unavailable = getProductBySlug("chronograph-style-watch")!;
    const priced = priceLines(addLine([], unavailable.id, { colour: "Black" }, 1), getProductById);
    expect(priced[0].unavailable).toBe(true);
    expect(cartTotals(priced).subtotal).toBe(0);
  });
  it("validates stored cart data", () => {
    expect(isCartLines([])).toBe(true);
    expect(isCartLines([{ key: "a", productId: "b", selections: {}, quantity: 1 }])).toBe(true);
    expect(isCartLines([{ key: 1 }])).toBe(false);
    expect(isCartLines("nope")).toBe(false);
  });
});

describe("wishlist", () => {
  it("toggles ids", () => {
    expect(toggleWishlist([], "a")).toEqual(["a"]);
    expect(toggleWishlist(["a", "b"], "a")).toEqual(["b"]);
  });
});

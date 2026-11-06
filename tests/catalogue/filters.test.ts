import { describe, it, expect } from "vitest";
import { products } from "@/data/products";
import { buildFacets, emptyFilters, filterProducts, sortProducts } from "@/lib/filters";
import { searchProducts } from "@/lib/search";
import { formatPrice } from "@/lib/currency";
import { getRelatedProducts } from "@/lib/products";

describe("filtering", () => {
  it("filters by category and subcategory", () => {
    const r = filterProducts(products, { ...emptyFilters, categoryIds: ["shoes"], subcategoryIds: ["heels"] });
    expect(r.length > 0).toBe(true);
    expect(r.every((p) => p.categoryId === "shoes" && p.subcategoryId === "heels")).toBe(true);
  });
  it("filters by price range", () => {
    const r = filterProducts(products, { ...emptyFilters, priceMin: 100, priceMax: 200 });
    expect(r.length > 0).toBe(true);
    expect(r.every((p) => p.price >= 100 && p.price <= 200)).toBe(true);
  });
  it("filters by colour, size, brand, availability and sale", () => {
    expect(filterProducts(products, { ...emptyFilters, colours: ["Champagne"] }).every((p) => p.options.find((o) => o.id === "colour")!.values.some((v) => v.value === "Champagne"))).toBe(true);
    expect(filterProducts(products, { ...emptyFilters, sizes: ["M"] }).length > 0).toBe(true);
    expect(filterProducts(products, { ...emptyFilters, brands: ["Sample Beauty"] }).every((p) => p.brand === "Sample Beauty")).toBe(true);
    expect(filterProducts(products, { ...emptyFilters, availability: ["unavailable"] }).length > 0).toBe(true);
    expect(filterProducts(products, { ...emptyFilters, onSale: true }).every((p) => (p.compareAtPrice ?? 0) > p.price)).toBe(true);
  });
  it("sorts by price and name", () => {
    const asc = sortProducts(products, "price-asc").map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = sortProducts(products, "price-desc").map((p) => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
    const names = sortProducts(products, "name-asc").map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
  it("facets are context-sensitive: no shoe sizes beside makeup", () => {
    const makeup = buildFacets(products.filter((p) => p.categoryId === "makeup"));
    expect(makeup.sizes.length).toBe(0);
    const shoes = buildFacets(products.filter((p) => p.categoryId === "shoes"));
    expect(shoes.sizes.length > 0).toBe(true);
    expect(buildFacets(products).sizes.length).toBe(0);
  });
});

describe("search", () => {
  it("finds products by name, category, brand and keyword", () => {
    expect(searchProducts("slip dress")[0].name).toBe("Satin Slip Dress");
    expect(searchProducts("wig").some((p) => p.categoryId === "hair-wigs")).toBe(true);
    expect(searchProducts("Sample Maison").every((p) => p.brand === "Sample Maison")).toBe(true);
    expect(searchProducts("zzzzqq").length).toBe(0);
  });
  it("requires every word to match", () => {
    expect(searchProducts("satin watch").length).toBe(0);
  });
});

describe("currency and related products", () => {
  it("formats GHS", () => {
    expect(formatPrice(1250)).toBe("GHS 1,250.00");
    expect(formatPrice(99.5)).toBe("GHS 99.50");
    expect(formatPrice(0)).toBe("GHS 0.00");
  });
  it("returns related products without the product itself", () => {
    const p = products[0];
    const r = getRelatedProducts(p, 4);
    expect(r.length).toBe(4);
    expect(r.some((x) => x.id === p.id)).toBe(false);
  });
});

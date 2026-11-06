import { describe, it, expect } from "vitest";
import { emptyCheckout, isValidEmail, normalisePhone, validateCheckout } from "@/lib/validation";
import { ghanaRegions } from "@/config/business";
import { buildEnquiryMessage, buildMailtoUrl, buildWhatsAppUrl, whatsappNumber } from "@/lib/whatsapp";
import { addLine, cartTotals, priceLines } from "@/lib/cart";
import { getProductById, getProductBySlug } from "@/lib/products";

const valid = { fullName: "Ama Mensah", email: "ama@example.com", phone: "024 123 4567", region: "Greater Accra", city: "Accra", address: "12 Example Street, East Legon", instructions: "", acknowledged: true };

describe("checkout validation", () => {
  it("rejects an empty form with an error per required field", () => {
    const e = validateCheckout(emptyCheckout, ghanaRegions);
    for (const k of ["fullName", "email", "phone", "region", "city", "address", "acknowledged"]) expect(Boolean((e as Record<string, string>)[k])).toBe(true);
  });
  it("accepts a valid form", () => {
    expect(validateCheckout(valid, ghanaRegions)).toEqual({});
  });
  it("normalises Ghana phone numbers", () => {
    expect(normalisePhone("024 123 4567")).toBe("+233241234567");
    expect(normalisePhone("+233 24 123 4567")).toBe("+233241234567");
    expect(normalisePhone("233241234567")).toBe("+233241234567");
    expect(normalisePhone("12345")).toBe(null);
    expect(normalisePhone("0141234567")).toBe(null);
  });
  it("validates emails, regions and instruction length", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("a@b")).toBe(false);
    expect(Boolean(validateCheckout({ ...valid, region: "Mars" }, ghanaRegions).region)).toBe(true);
    expect(Boolean(validateCheckout({ ...valid, instructions: "x".repeat(301) }, ghanaRegions).instructions)).toBe(true);
  });
});

describe("enquiry channels", () => {
  const dress = getProductBySlug("satin-slip-dress")!;
  const lines = priceLines(addLine([], dress.id, { colour: "Champagne", size: "M" }, 2), getProductById);
  const totals = cartTotals(lines);
  const message = buildEnquiryMessage({ brand: "Fashion Hub", customer: valid, lines, totals });

  it("builds an enquiry that states delivery is unconfirmed and never claims payment", () => {
    expect(message).toContain("Satin Slip Dress");
    expect(message).toContain("x 2");
    expect(message).toContain("delivery to be confirmed");
    expect(message).toContain("+233241234567");
    expect(message.toLowerCase()).not.toContain("paid");
  });
  it("returns null when no channel is configured", () => {
    expect(buildWhatsAppUrl("", message)).toBe(null);
    expect(buildMailtoUrl("", "s", "b")).toBe(null);
  });
  it("builds wa.me and mailto links when configured", () => {
    expect(whatsappNumber("0200000000")).toBe("233200000000");
    expect(buildWhatsAppUrl("+233200000000", "hi there")).toBe("https://wa.me/233200000000?text=hi%20there");
    expect(buildMailtoUrl("hello@example.com", "Hi", "Body")).toBe("mailto:hello@example.com?subject=Hi&body=Body");
  });
});

import { buildProductEnquiry } from "@/lib/whatsapp";

describe("product enquiries", () => {
  it("builds ask and notify messages with the product link", () => {
    const ask = buildProductEnquiry("Fashion Hub", "Evening Clutch", "https://x.test/p/", "ask");
    expect(ask).toContain("question about");
    expect(ask).toContain("https://x.test/p/");
    expect(buildProductEnquiry("Fashion Hub", "Evening Clutch", "https://x.test/p/", "notify")).toContain("let me know when");
  });
});

import { buildSrcSet } from "@/lib/images";

describe("responsive images", () => {
  it("builds a srcset with the 480w variant only for webp images", () => {
    expect(buildSrcSet("/images/a.webp", 900)).toBe("/images/a-480.webp 480w, /images/a.webp 900w");
    expect(buildSrcSet("/images/a.webp", 900, (p) => `/repo${p}`)).toBe("/repo/images/a-480.webp 480w, /repo/images/a.webp 900w");
    expect(buildSrcSet("/images/a.jpg", 900)).toBe(undefined);
    expect(buildSrcSet("/images/a.webp", 400)).toBe(undefined);
  });
});

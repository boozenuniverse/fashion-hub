import { formatPrice } from "./currency";
import { normalisePhone } from "./validation";
import type { CartTotals, CheckoutValues, PricedLine } from "@/types/cart";

/**
 * Order-enquiry channel boundary. The site cannot store orders or confirm delivery of a message:
 * it only PREPARES a summary for the customer to send through an external channel.
 */
export interface EnquiryOrder {
  brand: string;
  customer: CheckoutValues;
  lines: PricedLine[];
  totals: CartTotals;
}

export function buildEnquiryMessage({ brand, customer, lines, totals }: EnquiryOrder): string {
  const items = lines
    .filter((l) => !l.unavailable)
    .map((l, i) => {
      const opts = Object.entries(l.selections).map(([k, v]) => `${k}: ${v}`).join(", ");
      return `${i + 1}. ${l.product.name}${opts ? ` (${opts})` : ""} x ${l.quantity} - ${formatPrice(l.lineTotal)}`;
    });
  const phone = normalisePhone(customer.phone) ?? customer.phone;
  return [
    `Hello ${brand}, I would like to enquire about this order:`,
    "",
    ...items,
    "",
    `Subtotal: ${formatPrice(totals.subtotal)} (delivery to be confirmed)`,
    "",
    `Name: ${customer.fullName.trim()}`,
    `Phone: ${phone}`,
    `Email: ${customer.email.trim()}`,
    `Delivery: ${customer.address.trim()}, ${customer.city.trim()}, ${customer.region}`,
    customer.instructions.trim() ? `Instructions: ${customer.instructions.trim()}` : "",
    "",
    "Please confirm availability, delivery cost and payment options.",
  ].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")).join("\n");
}

/** Converts a configured Ghana number to wa.me format. Returns null when not configured/invalid. */
export function whatsappNumber(configured: string): string | null {
  const normalised = normalisePhone(configured);
  if (normalised) return normalised.replace("+", "");
  const digits = configured.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export function buildWhatsAppUrl(configured: string, message: string): string | null {
  const number = whatsappNumber(configured);
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}

export function buildMailtoUrl(email: string, subject: string, body: string): string | null {
  return email.trim() ? `mailto:${email.trim()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` : null;
}

export type ProductEnquiryKind = "ask" | "notify";

/** Message for "Ask about this product" and "Notify me when available". */
export function buildProductEnquiry(brand: string, productName: string, productUrl: string, kind: ProductEnquiryKind): string {
  return kind === "ask"
    ? `Hello ${brand}, I have a question about "${productName}" (${productUrl}).`
    : `Hello ${brand}, please let me know when "${productName}" (${productUrl}) is available. Thank you.`;
}

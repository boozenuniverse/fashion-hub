import type { CheckoutErrors, CheckoutValues } from "@/types/cart";

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Accepts 0XXXXXXXXX, +233XXXXXXXXX or 233XXXXXXXXX (spaces, dashes, brackets ignored). Returns +233XXXXXXXXX or null. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-().]/g, "");
  const match = /^(?:\+?233|0)([235]\d{8})$/.exec(digits);
  return match ? `+233${match[1]}` : null;
}

export const emptyCheckout: CheckoutValues = {
  fullName: "", email: "", phone: "", region: "", city: "", address: "", instructions: "", acknowledged: false,
};

export function validateCheckout(v: CheckoutValues, regions: readonly string[]): CheckoutErrors {
  const e: CheckoutErrors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  if (!isValidEmail(v.email)) e.email = "Enter a valid email address, for example name@example.com.";
  if (!normalisePhone(v.phone)) e.phone = "Enter a Ghana phone number, for example 024 000 0000 or +233 24 000 0000.";
  if (!regions.includes(v.region)) e.region = "Choose your region.";
  if (v.city.trim().length < 2) e.city = "Enter your city or town.";
  if (v.address.trim().length < 5) e.address = "Enter your delivery address or landmark.";
  if (v.instructions.length > 300) e.instructions = "Keep delivery instructions under 300 characters.";
  if (!v.acknowledged) e.acknowledged = "Please confirm you understand this is an enquiry, not a payment.";
  return e;
}

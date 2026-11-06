import type { Product } from "./product";

export interface CartLine {
  /** Stable key: product id + sorted selections. */
  key: string;
  productId: string;
  selections: Record<string, string>;
  quantity: number;
}

export interface PricedLine extends CartLine {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  unavailable: boolean;
}

export interface CartTotals { itemCount: number; subtotal: number; total: number; savings: number }

export interface CheckoutValues {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  instructions: string;
  acknowledged: boolean;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutValues, string>>;

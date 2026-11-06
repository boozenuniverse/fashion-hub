export type Availability = "available" | "unavailable" | "preorder";

export interface ProductImage { src: string; alt: string; width?: number; height?: number }

export interface OptionValue {
  value: string;
  /** Hex colour for swatch options. */
  swatch?: string;
  /** Added to the base price when selected (e.g. longer wig lengths). */
  priceAdjustment?: number;
  available?: boolean;
}

/** A purchase option the customer must/can choose: colour, size, length, texture, lace, shade, finish... */
export interface ProductOption {
  id: string;
  label: string;
  kind: "swatch" | "chip";
  required: boolean;
  values: OptionValue[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: "GHS";
  images: ProductImage[];
  options: ProductOption[];
  /** Category-specific specification rows (material, movement, finish, hair type...). */
  attributes: Record<string, string | number | boolean>;
  tags: string[];
  badges: string[];
  collectionIds: string[];
  /** Optional REAL customer rating. Leave undefined unless it comes from genuine reviews. */
  rating?: { value: number; count: number };
  featured: boolean;
  newArrival: boolean;
  trending: boolean;
  availability: Availability;
  /** ISO date (YYYY-MM-DD). */
  addedAt: string;
  /** True for demonstration catalogue content. */
  sample: boolean;
  seo: { title: string; description: string };
}

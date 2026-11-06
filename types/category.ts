export interface Subcategory { id: string; name: string }

export type SizeGuideKey = "womens" | "mens" | "shoes" | "rings";

export interface Category {
  id: string;
  slug: string;
  name: string;
  department: "Fashion" | "Accessories" | "Hair & Beauty";
  tagline: string;
  description: string;
  image: string;
  /** Optional wider/larger image for the category page banner (defaults to `image`). */
  heroImage?: string;
  sizeGuide?: SizeGuideKey;
  subcategories: Subcategory[];
}

export interface NavLink { label: string; href: string }
export interface MegaColumn { title: string; links: NavLink[] }
export interface MegaFeature { title: string; text: string; href: string; image: string }
export interface NavItem {
  label: string;
  href: string;
  mega?: { columns: MegaColumn[]; features: MegaFeature[] };
}

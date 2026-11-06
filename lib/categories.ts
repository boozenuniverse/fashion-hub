import { categories } from "@/data/categories";
import type { Category, Subcategory } from "@/types/category";

export const getCategories = (): Category[] => categories;
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
export const getSubcategory = (categoryId: string, subId: string): Subcategory | undefined =>
  getCategoryById(categoryId)?.subcategories.find((s) => s.id === subId);
export const categoryHref = (slug: string, subId?: string) =>
  `/categories/${slug}/${subId ? `?sub=${encodeURIComponent(subId)}` : ""}`;

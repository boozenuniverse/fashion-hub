/**
 * Paths that are PHOTOGRAPHS (not generated placeholders). `npm run images` never overwrites these.
 * Category photos below were cropped from the design mockups at low resolution: replace them with
 * real, high-resolution photography at the same paths.
 */
export const photoPaths: string[] = [
  "/images/categories/women.webp", "/images/categories/men.webp", "/images/categories/fabrics.webp", "/images/categories/shoes.webp",
  "/images/categories/bags.webp", "/images/categories/jewellery.webp", "/images/categories/watches.webp", "/images/categories/wigs.webp",
  "/images/categories/makeup.webp", "/images/categories/skincare.webp", "/images/categories/women-hero.webp",
];

/** Anything under these prefixes is photography too. */
export const photoPrefixes = ["/images/hero/", "/images/landing/", "/images/products/photos/"];

export const isPhotoPath = (path: string) => photoPaths.includes(path) || photoPrefixes.some((p) => path.startsWith(p));

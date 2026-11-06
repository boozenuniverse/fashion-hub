/** Landing-page content (edit copy and imagery here, not in components). */
export interface CategoryTile { slug: string; label: string; image: string; /** hide on desktop (the mockup shows 9 on desktop, 10 on mobile) */ mobileOnly?: boolean }

export const homepage = {
  categoryTiles: [
    { slug: "womens-fashion", label: "Women's Fashion", image: "/images/categories/women.webp" },
    { slug: "mens-fashion", label: "Men's Fashion", image: "/images/categories/men.webp" },
    { slug: "clothing-fabrics", label: "Clothing & Fabrics", image: "/images/categories/fabrics.webp" },
    { slug: "shoes", label: "Shoes", image: "/images/categories/shoes.webp" },
    { slug: "handbags", label: "Bags", image: "/images/categories/bags.webp" },
    { slug: "jewellery", label: "Jewellery", image: "/images/categories/jewellery.webp" },
    { slug: "watches", label: "Watches", image: "/images/categories/watches.webp", mobileOnly: true },
    { slug: "hair-wigs", label: "Hair & Wigs", image: "/images/categories/wigs.webp" },
    { slug: "makeup", label: "Makeup", image: "/images/categories/makeup.webp" },
    { slug: "beauty-skincare", label: "Beauty & Skincare", image: "/images/categories/skincare.webp" },
  ] as CategoryTile[],

  newArrivals: {
    title: "New Arrivals", subtitle: "Step into the latest trends.",
    items: [
      { slug: "elegant-evening-dress", image: "/images/landing/new-arrivals/elegant-evening-dress.webp", wide: "/images/landing/new-arrivals/elegant-evening-dress-wide.webp" },
      { slug: "classic-kaftan-set", image: "/images/landing/new-arrivals/classic-kaftan-set.webp", wide: "/images/landing/new-arrivals/classic-kaftan-set-wide.webp" },
      { slug: "luxury-handbag", image: "/images/landing/new-arrivals/luxury-handbag.webp" },
      { slug: "gold-luxe-watch", image: "/images/landing/new-arrivals/gold-luxe-watch.webp" },
      { slug: "stiletto-heels", image: "/images/landing/new-arrivals/stiletto-heels.webp" },
      { slug: "premium-wig", image: "/images/landing/new-arrivals/premium-wig.webp" },
      { slug: "chic-cape-dress", image: "/images/products/photos/chic-cape-dress.webp" },
      { slug: "luxury-bodycon-dress", image: "/images/products/photos/luxury-bodycon-dress.webp" },
    ] as { slug: string; image: string; wide?: string }[],
  },

  signature: {
    eyebrow: "Luxury Collection", title: "The Signature Edit", text: "Pieces that make every moment memorable.",
    cta: { label: "Shop the Collection", href: "/collections/signature-collection/" },
    desktopImage: "/images/landing/signature-desktop.webp", mobileImage: "/images/landing/signature-mobile.webp",
    alt: "A woman in sunglasses and gold jewellery (desktop) and a burgundy handbag on satin (mobile), sample artwork.",
  },

  featuredCollections: [
    { slug: "everyday-elegance", image: "/images/landing/collections/everyday-elegance.webp" },
    { slug: "evening-edit", image: "/images/landing/collections/evening-edit.webp" },
    { slug: "modern-classics", image: "/images/landing/collections/modern-classics.webp" },
    { slug: "beauty-collection", image: "/images/landing/collections/beauty-collection.webp" },
  ],
};

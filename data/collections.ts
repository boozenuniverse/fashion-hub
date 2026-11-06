import type { Collection } from "@/types/collection";

/** Products join a collection through their `collectionIds`. */
export const collections: Collection[] = [
  { id: "signature-collection", slug: "signature-collection", title: "The Signature Edit", tagline: "Pieces that make every moment memorable.", description: "Our most distinctive pieces across fashion, accessories and beauty.", image: "/images/collections/signature.webp" },
  { id: "everyday-elegance", slug: "everyday-elegance", title: "Everyday Elegance", tagline: "Refined, wearable and effortless.", description: "Dependable pieces that make getting dressed simple.", image: "/images/collections/everyday-elegance.webp" },
  { id: "evening-edit", slug: "evening-edit", title: "The Evening Edit", tagline: "For the hours after dark.", description: "Satin, lace, heels and shine for occasions worth dressing for.", image: "/images/collections/evening-edit.webp" },
  { id: "modern-classics", slug: "modern-classics", title: "Modern Classics", tagline: "Timeless shapes, current details.", description: "Wardrobe anchors designed to be worn for years.", image: "/images/collections/modern-classics.webp" },
  { id: "beauty-collection", slug: "beauty-collection", title: "The Beauty Collection", tagline: "Hair, makeup and skincare together.", description: "Wigs, extensions, makeup, kits and care for the full routine.", image: "/images/collections/beauty.webp" },
  { id: "luxury-accessories", slug: "luxury-accessories", title: "Luxury Accessories", tagline: "The finishing touches.", description: "Jewellery, watches, sunglasses and scarves to complete a look.", image: "/images/collections/accessories.webp" },
];

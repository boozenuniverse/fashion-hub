import type { Category } from "@/types/category";

const s = (id: string, name: string) => ({ id, name });

/** Central taxonomy. Category id === slug. Edit here; navigation, filters and pages follow. */
export const categories: Category[] = [
  {
    id: "womens-fashion", slug: "womens-fashion", name: "Women's Fashion", department: "Fashion",
    tagline: "Dresses, tops and tailoring for every hour.",
    description: "Considered silhouettes and refined fabrics, from daytime ease to evening occasions.",
    image: "/images/categories/women.webp", heroImage: "/images/categories/women-hero.webp", sizeGuide: "womens",
    subcategories: [s("dresses", "Dresses"), s("tops", "Tops"), s("skirts", "Skirts"), s("trousers", "Trousers"), s("jumpsuits", "Jumpsuits"), s("jackets", "Jackets"), s("lingerie", "Lingerie")],
  },
  {
    id: "mens-fashion", slug: "mens-fashion", name: "Men's Fashion", department: "Fashion",
    tagline: "Sharp, comfortable and quietly confident.",
    description: "Shirts, tailoring and outerwear with clean lines and a considered fit.",
    image: "/images/categories/men.webp", sizeGuide: "mens",
    subcategories: [s("shirts", "Shirts"), s("t-shirts", "T-Shirts"), s("trousers", "Trousers"), s("suits", "Suits"), s("jackets", "Jackets"), s("traditional-wear", "Traditional Wear")],
  },
  {
    id: "clothing-fabrics", slug: "clothing-fabrics", name: "Clothing & Fabrics", department: "Fashion",
    tagline: "Fabrics for pieces made your way.",
    description: "Ankara, lace, satin, chiffon and more, for tailors, designers and anyone planning a bespoke piece.",
    image: "/images/categories/fabrics.webp",
    subcategories: [s("ankara", "Ankara"), s("lace", "Lace"), s("chiffon", "Chiffon"), s("satin", "Satin"), s("cotton", "Cotton"), s("silk", "Silk"), s("other-fabrics", "Other Fabrics")],
  },
  {
    id: "shoes", slug: "shoes", name: "Shoes", department: "Fashion",
    tagline: "From first step to final flourish.",
    description: "Heels, sneakers, flats, sandals, boots and loafers in refined finishes.",
    image: "/images/categories/shoes.webp", sizeGuide: "shoes",
    subcategories: [s("heels", "Heels"), s("sneakers", "Sneakers"), s("flats", "Flats"), s("sandals", "Sandals"), s("boots", "Boots"), s("loafers", "Loafers")],
  },
  {
    id: "handbags", slug: "handbags", name: "Handbags", department: "Fashion",
    tagline: "The finishing piece.",
    description: "Handbags, clutches, totes, backpacks and travel bags, from everyday carry to evening.",
    image: "/images/categories/bags.webp",
    subcategories: [s("handbags", "Handbags"), s("clutches", "Clutches"), s("tote-bags", "Tote Bags"), s("backpacks", "Backpacks"), s("travel-bags", "Travel Bags")],
  },
  {
    id: "jewellery", slug: "jewellery", name: "Jewellery", department: "Accessories",
    tagline: "Small details, lasting impressions.",
    description: "Necklaces, earrings, bracelets, rings and sets to layer, stack or wear alone.",
    image: "/images/categories/jewellery.webp", sizeGuide: "rings",
    subcategories: [s("necklaces", "Necklaces"), s("earrings", "Earrings"), s("bracelets", "Bracelets"), s("rings", "Rings"), s("jewellery-sets", "Jewellery Sets")],
  },
  {
    id: "watches", slug: "watches", name: "Watches", department: "Accessories",
    tagline: "Time, well dressed.",
    description: "Classic and fashion watches for women and men.",
    image: "/images/categories/watches.webp",
    subcategories: [s("womens-watches", "Women's Watches"), s("mens-watches", "Men's Watches"), s("classic-watches", "Classic Watches"), s("fashion-watches", "Fashion Watches")],
  },
  {
    id: "hair-wigs", slug: "hair-wigs", name: "Hair & Wigs", department: "Hair & Beauty",
    tagline: "Length, texture and a finish that feels like yours.",
    description: "Human hair, synthetic and lace front wigs, closures, frontals and extensions.",
    image: "/images/categories/wigs.webp",
    subcategories: [s("human-hair", "Human Hair"), s("synthetic-wigs", "Synthetic Wigs"), s("lace-front-wigs", "Lace Front Wigs"), s("closures", "Closures"), s("frontals", "Frontals"), s("hair-extensions", "Hair Extensions")],
  },
  {
    id: "makeup", slug: "makeup", name: "Makeup", department: "Hair & Beauty",
    tagline: "Colour, finish and a steady hand.",
    description: "Foundation, concealer, powder, lipstick, eyeshadow, mascara and brushes.",
    image: "/images/categories/makeup.webp",
    subcategories: [s("foundation", "Foundation"), s("concealer", "Concealer"), s("powder", "Powder"), s("lipstick", "Lipstick"), s("eyeshadow", "Eyeshadow"), s("mascara", "Mascara"), s("brushes", "Brushes")],
  },
  {
    id: "makeup-kits", slug: "makeup-kits", name: "Makeup Kits", department: "Hair & Beauty",
    tagline: "Everything in one case.",
    description: "Professional, beginner and travel kits, plus gift sets.",
    image: "/images/categories/makeup-kits.webp",
    subcategories: [s("professional-kits", "Professional Kits"), s("beginner-kits", "Beginner Kits"), s("travel-kits", "Travel Kits"), s("makeup-gift-sets", "Makeup Gift Sets")],
  },
  {
    id: "beauty-skincare", slug: "beauty-skincare", name: "Beauty & Skincare", department: "Hair & Beauty",
    tagline: "Care that comes first.",
    description: "Skincare, body care, hair care and fragrances.",
    image: "/images/categories/skincare.webp",
    subcategories: [s("skincare", "Skincare"), s("body-care", "Body Care"), s("hair-care", "Hair Care"), s("fragrances", "Fragrances")],
  },
  {
    id: "accessories", slug: "accessories", name: "Accessories", department: "Accessories",
    tagline: "The last word in any outfit.",
    description: "Sunglasses, belts, scarves, wallets and more.",
    image: "/images/categories/accessories.webp",
    subcategories: [s("sunglasses", "Sunglasses"), s("belts", "Belts"), s("scarves", "Scarves"), s("wallets", "Wallets"), s("other-accessories", "Other Accessories")],
  },
];

import type { NavItem } from "@/types/category";
import { categoryHref } from "@/lib/categories";

const l = (label: string, href: string) => ({ label, href });

/** Primary navigation and mega-menu content. */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop", href: "/shop/",
    mega: {
      columns: [
        { title: "Fashion", links: [l("Women's Fashion", categoryHref("womens-fashion")), l("Men's Fashion", categoryHref("mens-fashion")), l("Clothing & Fabrics", categoryHref("clothing-fabrics")), l("Shoes", categoryHref("shoes")), l("Handbags", categoryHref("handbags"))] },
        { title: "Accessories", links: [l("Jewellery", categoryHref("jewellery")), l("Watches", categoryHref("watches")), l("Sunglasses & more", categoryHref("accessories"))] },
        { title: "Hair & Beauty", links: [l("Hair & Wigs", categoryHref("hair-wigs")), l("Makeup", categoryHref("makeup")), l("Makeup Kits", categoryHref("makeup-kits")), l("Beauty & Skincare", categoryHref("beauty-skincare"))] },
        { title: "Discover", links: [l("Shop all", "/shop/"), l("New arrivals", "/new-arrivals/"), l("All departments", "/categories/")] },
      ],
      features: [{ title: "The Signature Edit", text: "Pieces that make every moment memorable.", href: "/collections/signature-collection/", image: "/images/collections/signature.webp" }],
    },
  },
  {
    label: "Collections", href: "/collections/",
    mega: {
      columns: [
        { title: "Collections", links: [l("The Signature Edit", "/collections/signature-collection/"), l("Everyday Elegance", "/collections/everyday-elegance/"), l("The Evening Edit", "/collections/evening-edit/"), l("Modern Classics", "/collections/modern-classics/"), l("The Beauty Collection", "/collections/beauty-collection/"), l("Luxury Accessories", "/collections/luxury-accessories/")] },
      ],
      features: [{ title: "The Evening Edit", text: "For the hours after dark.", href: "/collections/evening-edit/", image: "/images/collections/evening-edit.webp" }],
    },
  },
  {
    label: "Women", href: categoryHref("womens-fashion"),
    mega: {
      columns: [
        { title: "Clothing", links: [l("Dresses", categoryHref("womens-fashion", "dresses")), l("Tops", categoryHref("womens-fashion", "tops")), l("Skirts", categoryHref("womens-fashion", "skirts")), l("Trousers", categoryHref("womens-fashion", "trousers")), l("Jumpsuits", categoryHref("womens-fashion", "jumpsuits"))] },
        { title: "Shoes", links: [l("Heels", categoryHref("shoes", "heels")), l("Sneakers", categoryHref("shoes", "sneakers")), l("Sandals", categoryHref("shoes", "sandals"))] },
        { title: "Bags", links: [l("Handbags", categoryHref("handbags", "handbags")), l("Clutches", categoryHref("handbags", "clutches")), l("Tote bags", categoryHref("handbags", "tote-bags"))] },
        { title: "Featured", links: [l("New arrivals", "/new-arrivals/"), l("The evening edit", "/collections/evening-edit/"), l("Everyday elegance", "/collections/everyday-elegance/")] },
      ],
      features: [{ title: "The evening edit", text: "Satin, shine and statement heels.", href: "/collections/evening-edit/", image: "/images/collections/evening-edit.webp" }],
    },
  },
  {
    label: "Men", href: categoryHref("mens-fashion"),
    mega: {
      columns: [
        { title: "Clothing", links: [l("Shirts", categoryHref("mens-fashion", "shirts")), l("T-shirts", categoryHref("mens-fashion", "t-shirts")), l("Trousers", categoryHref("mens-fashion", "trousers")), l("Suits", categoryHref("mens-fashion", "suits")), l("Jackets", categoryHref("mens-fashion", "jackets")), l("Traditional wear", categoryHref("mens-fashion", "traditional-wear"))] },
        { title: "Shoes", links: [l("Loafers", categoryHref("shoes", "loafers")), l("Sneakers", categoryHref("shoes", "sneakers")), l("Boots", categoryHref("shoes", "boots"))] },
        { title: "Accessories", links: [l("Watches", categoryHref("watches", "mens-watches")), l("Belts", categoryHref("accessories", "belts")), l("Wallets", categoryHref("accessories", "wallets"))] },
      ],
      features: [{ title: "Modern classics", text: "Timeless shapes, current details.", href: "/collections/modern-classics/", image: "/images/collections/modern-classics.webp" }],
    },
  },
  {
    label: "Beauty", href: categoryHref("makeup"),
    mega: {
      columns: [
        { title: "Makeup", links: [l("Foundation", categoryHref("makeup", "foundation")), l("Lipstick", categoryHref("makeup", "lipstick")), l("Eyeshadow", categoryHref("makeup", "eyeshadow")), l("Concealer", categoryHref("makeup", "concealer"))] },
        { title: "Makeup kits", links: [l("Professional kits", categoryHref("makeup-kits", "professional-kits")), l("Beginner kits", categoryHref("makeup-kits", "beginner-kits")), l("Travel kits", categoryHref("makeup-kits", "travel-kits")), l("Gift sets", categoryHref("makeup-kits", "makeup-gift-sets"))] },
        { title: "Skincare & care", links: [l("Skincare", categoryHref("beauty-skincare", "skincare")), l("Body care", categoryHref("beauty-skincare", "body-care")), l("Hair care", categoryHref("beauty-skincare", "hair-care")), l("Fragrances", categoryHref("beauty-skincare", "fragrances"))] },
        { title: "Hair & wigs", links: [l("Lace front wigs", categoryHref("hair-wigs", "lace-front-wigs")), l("Human hair", categoryHref("hair-wigs", "human-hair")), l("Closures", categoryHref("hair-wigs", "closures")), l("Extensions", categoryHref("hair-wigs", "hair-extensions"))] },
      ],
      features: [{ title: "The beauty collection", text: "Makeup, kits and care together.", href: "/collections/beauty-collection/", image: "/images/collections/beauty.webp" }],
    },
  },
  {
    label: "Accessories", href: categoryHref("accessories"),
    mega: {
      columns: [
        { title: "Jewellery", links: [l("Necklaces", categoryHref("jewellery", "necklaces")), l("Earrings", categoryHref("jewellery", "earrings")), l("Bracelets", categoryHref("jewellery", "bracelets")), l("Rings", categoryHref("jewellery", "rings"))] },
        { title: "Watches", links: [l("Women's watches", categoryHref("watches", "womens-watches")), l("Men's watches", categoryHref("watches", "mens-watches")), l("Fashion watches", categoryHref("watches", "fashion-watches"))] },
        { title: "More", links: [l("Sunglasses", categoryHref("accessories", "sunglasses")), l("Scarves", categoryHref("accessories", "scarves")), l("Belts", categoryHref("accessories", "belts")), l("Wallets", categoryHref("accessories", "wallets"))] },
        { title: "Bags", links: [l("Handbags", categoryHref("handbags", "handbags")), l("Clutches", categoryHref("handbags", "clutches")), l("Tote bags", categoryHref("handbags", "tote-bags"))] },
      ],
      features: [{ title: "Luxury accessories", text: "The finishing touches.", href: "/collections/luxury-accessories/", image: "/images/collections/accessories.webp" }],
    },
  },
  { label: "Journal", href: "/journal/" },
];

import { Catalogue } from "@/components/catalogue/Catalogue";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { getAllProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Shop all", description: "Browse fashion, shoes, bags, jewellery, watches, hair, wigs, makeup and beauty at Fashion Hub.", path: "/shop/" });

export default function ShopPage() {
  return (
    <>
      <CategoryHeader title="Shop all" tagline="Every department, one edit." description="Fashion, shoes, bags, jewellery, watches, hair, makeup and beauty. Filter by department, colour, size, price and more." crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} image="/images/categories/bags.webp" cta={{ label: "Explore Collection", href: "#products" }} />
      <div id="products" className="container-x section-y-sm scroll-mt-24"><Catalogue products={getAllProducts()} /></div>
    </>
  );
}

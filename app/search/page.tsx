import { Catalogue } from "@/components/catalogue/Catalogue";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { getAllProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Search", description: "Search the Fashion Hub catalogue.", path: "/search/" }), robots: { index: false, follow: true } };

export default function SearchPage() {
  return (
    <>
      <CategoryHeader title="Search" description="Search by product, department, colour, brand or keyword." crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div id="products" className="container-x section-y-sm scroll-mt-24"><Catalogue products={getAllProducts()} readQueryParam /></div>
    </>
  );
}

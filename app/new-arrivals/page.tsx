import { Catalogue } from "@/components/catalogue/Catalogue";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { getAllProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "New arrivals", description: "The latest fashion, beauty and lifestyle additions at Fashion Hub.", path: "/new-arrivals/" });

export default function NewArrivalsPage() {
  const arrivals = getAllProducts().filter((p) => p.newArrival);
  return (
    <>
      <CategoryHeader title="New arrivals" tagline="The new season edit." description="The latest additions across fashion, accessories, hair and beauty." crumbs={[{ label: "Home", href: "/" }, { label: "New arrivals" }]} image="/images/categories/women-hero.webp" cta={{ label: "Explore Collection", href: "#products" }} />
      <div id="products" className="container-x section-y-sm scroll-mt-24"><Catalogue products={arrivals} /></div>
    </>
  );
}

import { ProductGrid } from "@/components/catalogue/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRelatedProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (related.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="section-y-sm">
      <SectionHeading title="You may also like" />
      <h2 id="related-heading" className="sr-only">Related products</h2>
      <ProductGrid products={related} />
    </section>
  );
}

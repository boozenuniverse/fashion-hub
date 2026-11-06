import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

interface Props { products: Product[]; columns?: "catalogue" | "four" | "three"; priorityCount?: number }

const cols = {
  catalogue: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  four: "grid-cols-2 lg:grid-cols-4",
  three: "grid-cols-2 md:grid-cols-3",
};

export function ProductGrid({ products, columns = "four", priorityCount = 0 }: Props) {
  return (
    <ul className={`grid gap-x-4 gap-y-10 sm:gap-x-6 ${cols[columns]}`}>
      {products.map((p, i) => <li key={p.id}><ProductCard product={p} priority={i < priorityCount} /></li>)}
    </ul>
  );
}

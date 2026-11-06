import { Star } from "lucide-react";

/** Star rating row. Only rendered when a product has REAL rating data (product.rating). */
export function Stars({ value, count }: { value: number; count: number }) {
  const full = Math.round(value);
  return (
    <p className="flex items-center gap-1.5 text-[13px] text-muted">
      <span className="flex" aria-hidden="true">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`h-[15px] w-[15px] ${n <= full ? "fill-[#E0A030] text-[#E0A030]" : "text-line"}`} />)}</span>
      <span className="sr-only">Rated {value.toFixed(1)} out of 5 from {count} reviews</span>
      <span aria-hidden="true">({count})</span>
    </p>
  );
}

import { formatPrice } from "@/lib/currency";

interface Props { price: number; compareAt?: number; size?: "md" | "lg"; className?: string }

export function PriceTag({ price, compareAt, size = "md", className = "" }: Props) {
  const onSale = typeof compareAt === "number" && compareAt > price;
  return (
    <p className={`flex flex-wrap items-baseline gap-x-2.5 font-sans ${size === "lg" ? "text-[1.375rem]" : "text-[15px]"} ${className}`}>
      <span className={`font-semibold ${onSale ? "text-[#8A2E38]" : "text-ink"}`}><span className="sr-only">Price: </span>{formatPrice(price)}</span>
      {onSale && <span className="text-[0.875em] text-muted line-through"><span className="sr-only">Previous price: </span>{formatPrice(compareAt!)}</span>}
    </p>
  );
}

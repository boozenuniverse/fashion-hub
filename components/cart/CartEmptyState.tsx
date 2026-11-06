import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartEmptyState({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <ShoppingBag aria-hidden="true" className="h-10 w-10 text-taupe" strokeWidth={1.25} />
      <p className="mt-5 font-serif text-[1.75rem] text-ink">Your bag is empty</p>
      <p className="mt-2 max-w-xs text-muted">Add something you love and it will wait for you here.</p>
      <div className="mt-6" onClick={onNavigate}><Button href="/shop/">Start shopping</Button></div>
    </div>
  );
}

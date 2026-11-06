import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Wishlist", description: "Your saved Fashion Hub favourites.", path: "/wishlist/" }), robots: { index: false, follow: true } };

export default function WishlistPage() {
  return (
    <>
      <CategoryHeader title="Wishlist" description="Pieces you have saved. Your wishlist is stored in this browser only." crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <div className="container-x section-y-sm"><WishlistGrid /></div>
    </>
  );
}

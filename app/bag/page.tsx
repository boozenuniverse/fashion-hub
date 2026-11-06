import { BagView } from "@/components/cart/BagView";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Shopping bag", description: "Review the items in your Fashion Hub bag.", path: "/bag/" }), robots: { index: false, follow: true } };

export default function BagPage() {
  return (
    <>
      <CategoryHeader title="Your bag" description="Review your items, then continue to prepare an order enquiry." crumbs={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
      <div className="container-x section-y-sm"><BagView /></div>
    </>
  );
}

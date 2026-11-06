import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Order enquiry", description: "Prepare an order enquiry for Fashion Hub. No payment is taken on this website.", path: "/checkout/" }), robots: { index: false, follow: true } };

export default function CheckoutPage() {
  return (
    <>
      <CategoryHeader title="Order enquiry" description="Add your delivery details and prepare an enquiry to send to Fashion Hub. This is a demonstration checkout: there is no payment on this website." crumbs={[{ label: "Home", href: "/" }, { label: "Bag", href: "/bag/" }, { label: "Order enquiry" }]} />
      <div className="container-x section-y-sm"><CheckoutForm /></div>
    </>
  );
}

import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = { ...buildMetadata({ title: "Account", description: "Your Fashion Hub bag and wishlist.", path: "/account/" }), robots: { index: false, follow: true } };

export default function AccountPage() {
  return (
    <>
      <CategoryHeader title="Your account" description="Customer accounts are not available yet. Your bag and wishlist are saved privately in this browser." crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <div className="container-x section-y-sm">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-[10px] border border-line bg-paper p-6"><h2 className="text-[1.7rem]">Wishlist</h2><p className="mt-1 text-muted">Pieces you have saved on this device.</p><Button href="/wishlist/" variant="outline" size="sm" className="mt-4">View wishlist</Button></div>
          <div className="rounded-[10px] border border-line bg-paper p-6"><h2 className="text-[1.7rem]">Your bag</h2><p className="mt-1 text-muted">Review items and prepare an order enquiry.</p><Button href="/bag/" variant="outline" size="sm" className="mt-4">View bag</Button></div>
          <div className="rounded-[10px] border border-line bg-paper p-6 sm:col-span-2"><h2 className="text-[1.7rem]">Need help with an order?</h2><p className="mt-1 text-muted">Orders are arranged by enquiry. Contact the team and they will help you directly.</p><div className="mt-4 flex flex-wrap gap-3"><Button href="/contact/" size="sm">Contact us</Button><Button href="/order-enquiry/" variant="outline" size="sm">How ordering works</Button></div></div>
        </div>
      </div>
    </>
  );
}

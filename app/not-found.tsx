import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container-x section-y text-center">
      <p className="font-serif text-[1.5rem] italic text-wine">404</p>
      <h1 className="h-page mt-2">This page has slipped away</h1>
      <p className="lead mx-auto mt-4">The page you are looking for may have moved, or the link may be incorrect.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/">Back to home</Button><Button href="/shop/" variant="outline">Browse the shop</Button></div>
    </div>
  );
}

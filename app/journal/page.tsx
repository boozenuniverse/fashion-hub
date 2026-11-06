import { CategoryHeader } from "@/components/catalogue/CategoryHeader";
import { JournalIndex } from "@/components/editorial/JournalIndex";
import { getArticles } from "@/data/journal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Fashion Journal", description: "Style inspiration, beauty tips and fashion guides from Fashion Hub.", path: "/journal/" });

export default function JournalPage() {
  return (
    <>
      <CategoryHeader title="The Fashion Journal" tagline="Style, beauty and everything between." description="Ideas for getting dressed, practical guides, and notes on hair, makeup and accessories." crumbs={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      <div className="container-x section-y-sm"><JournalIndex articles={getArticles()} /></div>
    </>
  );
}

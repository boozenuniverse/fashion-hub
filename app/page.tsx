import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HeroSlider } from "@/components/home/hero/HeroSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { SignatureBanner } from "@/components/home/SignatureBanner";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: `${siteConfig.name} | ${siteConfig.tagline}`, description: siteConfig.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryTiles />
      <NewArrivals />
      <SignatureBanner />
      <FeaturedCollections />
    </>
  );
}

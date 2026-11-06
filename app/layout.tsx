import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { MobileShopSheet } from "@/components/layout/MobileShopSheet";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Header } from "@/components/layout/Header";
import { Newsletter } from "@/components/layout/Newsletter";
import { Providers } from "@/components/layout/Providers";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { ProductQuickView } from "@/components/product/ProductQuickView";
import { JsonLd } from "@/components/ui/JsonLd";
import { ToastViewport } from "@/components/ui/Toast";
import { siteConfig } from "@/config/site";
import { withBasePath } from "@/lib/paths";
import { absoluteUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}/`),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: absoluteUrl("/") },
  icons: { icon: withBasePath("/favicon.svg") },
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en_GH", title: siteConfig.name, description: siteConfig.description, url: absoluteUrl("/"), images: [{ url: absoluteUrl(siteConfig.ogImage) }] },
  twitter: { card: "summary_large_image", title: siteConfig.name, description: siteConfig.description, images: [absoluteUrl(siteConfig.ogImage)] },
};

export const viewport: Viewport = { themeColor: "#220707", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GH" className={`${cormorant.variable} ${playfair.variable} ${manrope.variable} ${inter.variable}`}>
      <body className="overflow-x-clip pb-[calc(58px+env(safe-area-inset-bottom))] lg:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-ink focus:px-4 focus:py-3 focus:text-cream">Skip to main content</a>
        <Providers>
          <AnnouncementBar />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Newsletter />
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <ProductQuickView />
          <ToastViewport />
          <MobileNavigation />
          <MobileShopSheet />
          <BottomTabBar />
          <BackToTop />
          <FloatingWhatsApp />
        </Providers>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}

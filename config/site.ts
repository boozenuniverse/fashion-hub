import { siteUrl } from "./deployment";

/**
 * Central business configuration. Empty strings are PLACEHOLDERS: add genuine details here and they
 * flow through the whole site (header, footer, contact page, enquiry channels, structured data).
 */
export const siteConfig = {
  name: "Fashion Hub",
  brandMark: "FASHION HUB",
  tagline: "Elegance Is An Everyday Affair.",
  description:
    "An exquisite destination for fashion, beauty and lifestyle essentials. Discover exceptional pieces, timeless elegance and everything you need to express your personal style.",
  url: siteUrl,
  locale: "en-GH",
  currency: "GHS" as const,
  logo: "/logo.svg",
  ogImage: "/images/brand/og.png",

  contact: {
    email: "founder.ppc@gmail.com", // PLACEHOLDER e.g. hello@yourdomain.com
    phone: "+233595196818", // PLACEHOLDER e.g. +233 20 000 0000
    whatsapp: "+233555071737", // PLACEHOLDER Ghana number, e.g. 0200000000 or +233200000000
    address: "Kumasi, Ghana", // from the design mockup; add a full address if you want one shown
    hours: "24/7", // PLACEHOLDER opening hours
  },

  social: {
    instagram: "", // PLACEHOLDER full profile URL
    facebook: "",
    tiktok: "",
    pinterest: "",
    youtube: "",
  },

  /** Announcement bar messages (rotated). Keep these truthful - no unverified offers. */
  announcements: [
    // From the design mockup. CONFIRM this offer (threshold and terms) before launch or change the text.
    "Complimentary Delivery on Orders Above GHS 500",
    "The new season edit: discover what's new.",
  ],

  /** Right-hand links in the desktop announcement bar. */
  topBarLinks: ["Shop with Confidence", "Fashion for Every You"],

  delivery: {
    enabled: true,
    defaultMessage:
      "Delivery fees and timing are confirmed by the Fashion Hub team when your order enquiry is received.",
  },

  returns: { summary: "Return conditions are set out in our returns policy." },

  checkout: { mode: "enquiry" as const },

  newsletter: {
    /** PLACEHOLDER: set to a provider form URL (Mailchimp, Brevo, etc.) to enable real sign-ups. */
    formAction: "",
  },

  sampleCatalogue: {
    enabled: true,
    notice:
      "Sample catalogue: products, prices and images shown are demonstration content and can be replaced in data/products.ts.",
  },

  /** Routes where the newsletter band is not shown. */
  hideNewsletterOn: ["/bag/", "/checkout/", "/order-enquiry/", "/wishlist/"],
};

export type SiteConfig = typeof siteConfig;

export const hasContact = {
  email: () => siteConfig.contact.email.trim() !== "",
  phone: () => siteConfig.contact.phone.trim() !== "",
  whatsapp: () => siteConfig.contact.whatsapp.trim() !== "",
};

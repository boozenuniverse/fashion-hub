/**
 * Hero slides. Each slide has its own copy, photography (desktop + mobile), text position/tone and a
 * transition (fade, fade-right, fade-left, drop, rise, flip). The photo, copy and sparkles sit on
 * separate 3D depth layers that follow the pointer. Replace the images in public/images/hero/ with real
 * photography at the same paths (desktop ~1920x650, mobile ~1100x740).
 */
export type HeroTransition = "fade" | "fade-right" | "fade-left" | "drop" | "rise" | "flip";

export interface HeroView {
  image: string;
  /** Side of the hero the copy sits on. */
  textSide: "left" | "right";
  /** "dark" = dark text on a light photo, "light" = light text on a dark photo. */
  tone: "dark" | "light";
}

export interface HeroSlide {
  id: string;
  transition: HeroTransition;
  eyebrow: string;
  title: string;
  subtitle: string;
  subtitleMobile?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  desktop: HeroView;
  mobile: HeroView;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "elegance", transition: "fade", eyebrow: "Fashion, Redefined",
    title: "The Art of Elegance",
    subtitle: "Discover timeless style, luxurious beauty and more \u2013 all in one place.", subtitleMobile: "Discover timeless style, luxurious beauty and more.",
    primary: { label: "Explore Collection", href: "/shop/" }, secondary: { label: "Shop Now", href: "/new-arrivals/" },
    desktop: { image: "/images/hero/slide-1-desktop.webp", textSide: "right", tone: "dark" },
    mobile: { image: "/images/hero/slide-1-mobile.webp", textSide: "left", tone: "light" },
    alt: "A woman in a burgundy satin gown with a sculpted rose shoulder, posed with her hand at her chin (sample artwork).",
  },
  {
    id: "evening", transition: "fade-right", eyebrow: "The Evening Edit",
    title: "Dressed for the Evening",
    subtitle: "Satin, shine and statement pieces for after dark.",
    primary: { label: "Shop the Edit", href: "/collections/evening-edit/" }, secondary: { label: "View Dresses", href: "/categories/womens-fashion/?sub=dresses" },
    desktop: { image: "/images/hero/slide-2-desktop.webp", textSide: "left", tone: "dark" },
    mobile: { image: "/images/hero/slide-2-mobile.webp", textSide: "left", tone: "light" },
    alt: "A woman in a burgundy off-the-shoulder satin dress, hand raised to her chin (sample artwork).",
  },
  {
    id: "signature", transition: "drop", eyebrow: "Luxury Collection",
    title: "The Signature Handbag",
    subtitle: "Crafted to carry every moment.", subtitleMobile: "Crafted to carry every moment.",
    primary: { label: "Shop Bags", href: "/categories/handbags/" }, secondary: { label: "The Signature Edit", href: "/collections/signature-collection/" },
    desktop: { image: "/images/hero/slide-3-desktop.webp", textSide: "left", tone: "light" },
    mobile: { image: "/images/hero/slide-3-mobile.webp", textSide: "left", tone: "light" },
    alt: "A burgundy leather handbag with a gold buckle on draped burgundy satin (sample artwork).",
  },
];

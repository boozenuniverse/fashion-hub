import type { Article } from "@/types/journal";

export const journalCategories = [
  "Fashion Trends", "Style Inspiration", "Beauty & Makeup", "Hair & Wig Inspiration",
  "Jewellery & Accessories", "Fashion Guides", "Lifestyle",
] as const;

/** SAMPLE editorial content, written as placeholder articles. Replace with your own stories. */
export const articles: Article[] = [
  {
    slug: "building-an-evening-wardrobe", title: "Building an evening wardrobe that lasts",
    excerpt: "Three considered pieces go further than ten impulse buys. Start with the dress, the shoe and the bag.",
    category: "Style Inspiration", date: "2026-10-14", author: "Fashion Hub Editorial",
    image: "/images/journal/building-an-evening-wardrobe.webp", imageAlt: "Sample editorial artwork of a dress silhouette.",
    relatedProductSlugs: ["satin-slip-dress", "pointed-stiletto-pumps", "evening-clutch"],
    blocks: [
      { type: "p", text: "An evening wardrobe does not need to be large. It needs to be right. The most useful approach is to choose a few pieces that move easily between occasions and to let accessories do the changing." },
      { type: "h2", text: "Start with a dress you trust" },
      { type: "p", text: "Look for a silhouette that feels like yours: a slip dress for movement, a wrap dress for definition. Fabric matters as much as cut, because a good drape forgives a long evening." },
      { type: "h2", text: "Choose a shoe you can stand in" },
      { type: "p", text: "A pointed pump in a neutral shade works with almost everything. If heels are not for you, a refined flat in a metallic finish carries the same weight." },
      { type: "quote", text: "Dress for the moment you want to remember, then wear it again." },
      { type: "h2", text: "Finish with one small bag" },
      { type: "list", items: ["Pick a metal tone and keep your jewellery consistent.", "Keep the bag small enough to disappear when you dance.", "Choose a finish that photographs well in low light."] },
    ],
  },
  {
    slug: "choosing-the-right-lace-front-wig", title: "How to choose a lace front wig",
    excerpt: "Texture, length, density and lace type all change how a wig looks and feels. A simple guide to deciding.",
    category: "Hair & Wig Inspiration", date: "2026-10-08", author: "Fashion Hub Editorial",
    image: "/images/journal/choosing-the-right-lace-front-wig.webp", imageAlt: "Sample editorial artwork of flowing hair.",
    relatedProductSlugs: ["body-wave-lace-front-wig", "lace-closure-4x4", "nourishing-hair-oil"],
    blocks: [
      { type: "p", text: "A wig should suit your routine as much as your face. Before you choose a length or texture, think about how often you will wear it and how much styling time you want." },
      { type: "h2", text: "Texture and length" },
      { type: "p", text: "Straight styles read sleek and polished, while body waves add movement. Longer lengths look dramatic but need more care, and they can change the price of a piece." },
      { type: "h2", text: "Density and lace" },
      { type: "p", text: "Density describes how full the hair looks. Lace type affects how the hairline blends with your skin. If you are unsure, ask for advice before ordering." },
      { type: "list", items: ["Decide where and how often you will wear it.", "Match the lace to your skin tone as closely as you can.", "Plan how you will store and care for it."] },
    ],
  },
  {
    slug: "a-simple-everyday-makeup-routine", title: "A simple everyday makeup routine",
    excerpt: "Five steps, a handful of products and about ten minutes. A routine for mornings that need to be quick.",
    category: "Beauty & Makeup", date: "2026-09-30", author: "Fashion Hub Editorial",
    image: "/images/journal/a-simple-everyday-makeup-routine.webp", imageAlt: "Sample editorial artwork of makeup tools.",
    relatedProductSlugs: ["soft-focus-foundation", "velvet-matte-lipstick", "precision-concealer"],
    blocks: [
      { type: "p", text: "Good makeup starts with skin that feels comfortable. Keep the routine short enough that you will actually do it." },
      { type: "h2", text: "The five steps" },
      { type: "list", items: ["Prepare skin with moisturiser.", "Apply a light layer of foundation where you need it.", "Conceal and blend.", "Add colour to the lips.", "Check the light, and stop."] },
      { type: "p", text: "Choose a shade in daylight, and test it along the jaw rather than on the hand. A finish that suits your skin will matter more than coverage." },
    ],
  },
  {
    slug: "the-jewellery-layering-guide", title: "The jewellery layering guide",
    excerpt: "How to combine chains, pearls and bangles so they look intentional, never crowded.",
    category: "Jewellery & Accessories", date: "2026-09-22", author: "Fashion Hub Editorial",
    image: "/images/journal/the-jewellery-layering-guide.webp", imageAlt: "Sample editorial artwork of a necklace.",
    relatedProductSlugs: ["gold-tone-chain-necklace", "pearl-drop-earrings", "slim-bangle-bracelet"],
    blocks: [
      { type: "p", text: "Layering is a question of proportion. Vary the length and weight, and keep the finish consistent." },
      { type: "h2", text: "Necklaces" },
      { type: "p", text: "Pair a short chain with a longer one, and leave a clear gap between them. Let one piece lead." },
      { type: "h2", text: "Earrings and bracelets" },
      { type: "p", text: "If your necklace is detailed, keep earrings simple. Stack slim bangles together and give a statement piece room alone." },
      { type: "quote", text: "When in doubt, take one piece off." },
    ],
  },
  {
    slug: "a-guide-to-fabrics-for-occasion-wear", title: "A guide to fabrics for occasion wear",
    excerpt: "Lace, satin, chiffon and Ankara behave differently. Know what each does before you commission a piece.",
    category: "Fashion Guides", date: "2026-09-15", author: "Fashion Hub Editorial",
    image: "/images/journal/a-guide-to-fabrics-for-occasion-wear.webp", imageAlt: "Sample editorial artwork of folded fabric.",
    relatedProductSlugs: ["french-lace-fabric", "satin-fabric-roll", "chiffon-georgette"],
    blocks: [
      { type: "p", text: "Fabric decides how a garment hangs, moves and photographs. Talk to your tailor about the fabric before you settle on a design." },
      { type: "h2", text: "What each fabric does" },
      { type: "list", items: ["Lace gives structure and detail, and often needs lining.", "Satin drapes and catches light, but shows marks easily.", "Chiffon is light and sheer, and is best layered.", "Ankara holds bold prints and a firm shape."] },
      { type: "p", text: "Ask how much fabric a design needs before you buy, and keep a little extra for fitting and mistakes." },
    ],
  },
  {
    slug: "dressing-well-in-the-heat", title: "Dressing well in the heat",
    excerpt: "Light fabrics, easy cuts and a few smart accessories keep a polished look comfortable.",
    category: "Lifestyle", date: "2026-09-05", author: "Fashion Hub Editorial",
    image: "/images/journal/dressing-well-in-the-heat.webp", imageAlt: "Sample editorial artwork of a shirt silhouette.",
    relatedProductSlugs: ["relaxed-linen-shirt", "square-frame-sunglasses", "printed-scarf"],
    blocks: [
      { type: "p", text: "Warm weather rewards simple decisions. Choose breathable fabrics and a relaxed shape, and keep the palette tight so everything works together." },
      { type: "h2", text: "What to reach for" },
      { type: "list", items: ["Linen and cotton blends over heavy synthetics.", "A good pair of sunglasses.", "A scarf that doubles as a hair wrap or bag accent."] },
      { type: "quote", text: "Comfort is part of elegance." },
    ],
  },
];

export const getArticles = () => [...articles].sort((a, b) => b.date.localeCompare(a.date));
export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
export const readingMinutes = (a: Article) => {
  const words = a.blocks.map((b) => (b.type === "list" ? b.items.join(" ") : b.text)).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

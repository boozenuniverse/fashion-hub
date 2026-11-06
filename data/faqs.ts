export interface FaqGroup { title: string; items: { q: string; a: string }[] }

/** FAQs reflect the enquiry-based model of the site. Update answers as policies are confirmed. */
export const faqGroups: FaqGroup[] = [
  {
    title: "Orders and enquiries",
    items: [
      { q: "How do I place an order?", a: "Add products to your bag and go to checkout. You will enter your delivery details and we prepare an order enquiry summary that you send to Fashion Hub by WhatsApp or email. The team then confirms availability, delivery and payment options." },
      { q: "Does the website take payment?", a: "No. This website does not process payments and does not place orders automatically. Payment is arranged with the Fashion Hub team after they confirm your enquiry." },
      { q: "How do I know my enquiry was received?", a: "A website like this cannot confirm that a message reached the business on its own. Your enquiry is only received once you send the prepared message and the Fashion Hub team replies." },
      { q: "Is my bag saved?", a: "Your bag and wishlist are saved in your own browser on this device. They are not saved to an account, so clearing your browser data removes them." },
    ],
  },
  {
    title: "Delivery",
    items: [
      { q: "Where do you deliver?", a: "Delivery areas and timings are confirmed by the Fashion Hub team when your enquiry is received. See the Shipping policy for the latest information." },
      { q: "How much does delivery cost?", a: "Delivery fees depend on your location and the items ordered, and are confirmed when your enquiry is received." },
    ],
  },
  {
    title: "Products and sizing",
    items: [
      { q: "How do I choose the right size?", a: "Use the Size guide for indicative measurements, and compare them with your own. If you are between sizes, choose the larger one or ask the team for advice before ordering." },
      { q: "Are the products on the website real stock?", a: "The current catalogue is sample content used to demonstrate the store. Real products, prices and photography are added before launch." },
      { q: "Can I order fabrics by the piece?", a: "Fabrics are listed per piece, with the piece length shown in the product details. Ask the team if you need a different quantity." },
    ],
  },
  {
    title: "Returns and care",
    items: [
      { q: "What is your returns policy?", a: "Return conditions are set out in the Returns policy page. Please read it before ordering." },
      { q: "How should I care for my wig or hair?", a: "Care advice depends on the hair type and product. Ask the team for guidance for the specific item you are considering." },
    ],
  },
];

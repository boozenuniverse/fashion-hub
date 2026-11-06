export interface PolicySection { heading: string; body: string[] }
export interface Policy { slug: string; title: string; intro: string; description: string; sections: PolicySection[] }

export const policyNotice =
  "Template content: this page is a starting draft with clearly marked placeholders. Fashion Hub should complete and review it, with legal advice where appropriate, before launch.";

export const policies: Record<"shipping" | "returns" | "privacy" | "terms", Policy> = {
  shipping: {
    slug: "shipping", title: "Shipping policy", description: "Delivery coverage, timing and charges for Fashion Hub orders.",
    intro: "How delivery works for orders arranged through Fashion Hub.",
    sections: [
      { heading: "How orders are arranged", body: ["Orders begin as an enquiry. After you send your enquiry, the Fashion Hub team confirms availability, delivery cost, timing and payment options with you directly."] },
      { heading: "Delivery coverage", body: ["[PLACEHOLDER: list the regions and towns you deliver to, and any pickup options.]"] },
      { heading: "Delivery times", body: ["[PLACEHOLDER: add estimated delivery times for each area, and how pre-order items are handled.]"] },
      { heading: "Delivery charges", body: ["Delivery charges depend on location and the items ordered, and are confirmed before you pay. [PLACEHOLDER: add any free-delivery threshold only if you offer one.]"] },
      { heading: "Receiving your order", body: ["Please make sure the delivery address and phone number you provide are correct and that someone can receive the order. [PLACEHOLDER: add what happens when a delivery cannot be completed.]"] },
    ],
  },
  returns: {
    slug: "returns", title: "Returns policy", description: "Return conditions and procedures for Fashion Hub purchases.",
    intro: "What to do if something is not right with your order.",
    sections: [
      { heading: "Return window", body: ["[PLACEHOLDER: state how many days customers have to request a return or exchange.]"] },
      { heading: "Eligible items", body: ["[PLACEHOLDER: describe the condition items must be in, and any exclusions, for example hair products, makeup, swimwear, custom-cut fabrics or sale items.]"] },
      { heading: "How to request a return", body: ["Contact Fashion Hub using the details on the Contact page with your order details. [PLACEHOLDER: add the steps, address and who pays return delivery.]"] },
      { heading: "Refunds and exchanges", body: ["[PLACEHOLDER: explain how refunds are issued, how long they take and when exchanges are offered.]"] },
      { heading: "Damaged or incorrect items", body: ["If an item arrives damaged or is not what you ordered, contact us as soon as possible with photos. [PLACEHOLDER: add the reporting window.]"] },
    ],
  },
  privacy: {
    slug: "privacy", title: "Privacy policy", description: "How Fashion Hub handles information on this website.",
    intro: "What information this website uses and where it goes.",
    sections: [
      { heading: "Information stored in your browser", body: ["This website stores your shopping bag, wishlist and recently viewed products in your browser's local storage on your device. This information stays on your device and is not sent to us. You can remove it by clearing your browser data."] },
      { heading: "Information you send us", body: ["When you send an order enquiry or contact message through WhatsApp or email, the details you include (such as your name, phone number, email and delivery address) are sent to Fashion Hub through that service and are subject to that service's own policies. This website does not store those details."] },
      { heading: "Newsletter", body: ["[PLACEHOLDER: describe your newsletter provider and how subscribers' emails are used once sign-up is connected.]"] },
      { heading: "Analytics and cookies", body: ["[PLACEHOLDER: state whether analytics or cookies are used. At the time of writing this website does not add analytics.]"] },
      { heading: "Your rights and contact", body: ["[PLACEHOLDER: describe how people can ask about, correct or delete their information, and the contact for privacy questions, in line with applicable Ghanaian data protection law.]"] },
    ],
  },
  terms: {
    slug: "terms", title: "Terms and conditions", description: "Terms for using the Fashion Hub website.",
    intro: "The terms that apply when you use this website.",
    sections: [
      { heading: "About these terms", body: ["By using this website you agree to these terms. [PLACEHOLDER: add the legal business name and registration details.]"] },
      { heading: "Enquiries, not automatic orders", body: ["Adding items to your bag and sending an enquiry does not create a contract. An order is only agreed when Fashion Hub confirms availability, price, delivery and payment with you."] },
      { heading: "Products and prices", body: ["Prices are shown in Ghana cedis (GHS). Product information, colours and availability may change and are confirmed when your enquiry is answered. Photographs may differ slightly from the item."] },
      { heading: "Payment", body: ["This website does not collect payment. [PLACEHOLDER: describe accepted payment methods and when payment is due.]"] },
      { heading: "Intellectual property", body: ["Content on this website, including text, design and images, belongs to Fashion Hub or its licensors and may not be copied without permission."] },
      { heading: "Changes and governing law", body: ["We may update these terms from time to time. [PLACEHOLDER: state the governing law and jurisdiction.]"] },
    ],
  },
};

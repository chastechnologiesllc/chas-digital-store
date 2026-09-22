export type FaqItem = {
  question: string;
  answer: string;
};

export const SITE_FAQS: FaqItem[] = [
  {
    question: "What is chAs Technologies LLC Digital Store?",
    answer:
      "It is the digital classroom store of chAs Technologies LLC. You can browse practical classes on AI, digital tools, and online business, pay securely, and receive access through Telegram after payment is verified.",
  },
  {
    question: "How do I get access after paying?",
    answer:
      "After checkout, your payment is verified on the server. Only then is Telegram access generated. You will land on an access page with a button to join the correct class classroom.",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "Checkout supports Paystack and Flutterwave. Available options depend on which providers are configured. Cards, bank, and other local methods shown by the selected provider may be used.",
  },
  {
    question: "Do I need a Telegram account?",
    answer:
      "Yes. Classes are delivered in Telegram. Install Telegram before or immediately after purchase so you can join the classroom from the access page.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refund terms are defined in the store policy placeholders. Replace [REFUND_POLICY] in the legal pages with the actual policy before taking live payments.",
  },
  {
    question: "Will more classes be added?",
    answer:
      "Yes. The catalog is designed so new classes can be added from the product configuration without rebuilding the store.",
  },
  {
    question: "Is this for people in Nigeria?",
    answer:
      "The store is designed first for Nigerian customers, with Naira pricing and local payment providers. International checkout can be enabled later through the same gateway architecture.",
  },
  {
    question: "Who do I contact for support?",
    answer:
      "Use the Contact page. Support details are stored as editable placeholders until the live email, phone, or Telegram handle is added to the site configuration.",
  },
];

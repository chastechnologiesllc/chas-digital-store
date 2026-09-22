import type { CategoryId } from "./categories";

export type DeliveryType = "telegram";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  categories: CategoryId[];
  description: string;
  longDescription: string;
  whoItsFor: string;
  format: string;
  price: number;
  currency: string;
  image: string;
  featured: boolean;
  active: boolean;
  skillLevel: SkillLevel;
  deliveryType: DeliveryType;
  telegramAccessId: string;
  duration: string;
  features: string[];
  benefits: string[];
  requirements?: string[];
  faqs: ProductFaq[];
  createdAt: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "ai-video-generator",
    slug: "ai-video-generator",
    name: "AI Video Generator Class",
    category: "video",
    categories: ["ai", "video", "content-creation"],
    description:
      "Learn how to use modern AI video tools to plan, generate, edit, and deliver video content without a traditional production studio.",
    longDescription:
      "This class walks you through practical AI video workflows used for education, marketing, product explainers, and social content. You will learn how to brief a generator, control style and pacing, fix weak outputs, and assemble a repeatable pipeline you can use for client work or your own digital products.",
    whoItsFor:
      "Creators, educators, freelancers, and business owners who want to produce video content faster using AI tools rather than a full studio setup.",
    format:
      "Self-paced digital class. Access is delivered to your Telegram instantly after checkout.",
    price: 45000,
    currency: "NGN",
    image: "/products/ai-video-generator.jpg",
    featured: true,
    active: true,
    skillLevel: "Intermediate",
    deliveryType: "telegram",
    telegramAccessId: "ai-video-generator",
    duration: "Self-paced",
    features: [
      "Plan video briefs that AI tools can actually follow",
      "Generate clips, scenes, and talking-head style outputs",
      "Control visual style, pacing, captions, and aspect ratios",
      "Fix weak generations instead of starting from scratch",
      "Assemble a simple post-production workflow",
      "Package videos for social, class, and product use",
    ],
    benefits: [
      "Produce video without expensive equipment",
      "Build a repeatable content system",
      "Turn AI output into something you can sell or teach with",
    ],
    requirements: [
      "A smartphone or computer with internet access",
      "Willingness to practise with current AI video tools",
      "No film-school background required",
    ],
    faqs: [
      {
        question: "Do I need a camera or studio?",
        answer:
          "No. The class is built around AI video generation and lightweight editing. A camera can help later, but it is not required to start.",
      },
      {
        question: "Will I get lifetime access?",
        answer:
          "You get immediate access to your classroom on Telegram after checkout. Any updates added to the classroom later are included for as long as it stays active.",
      },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "ai-music-generator",
    slug: "ai-music-generator",
    name: "AI Music Generator Class",
    category: "music",
    categories: ["ai", "music", "content-creation"],
    description:
      "Learn how to use modern AI music-generation tools to create music, experiment with sounds, and develop practical digital music workflows.",
    longDescription:
      "This class shows you how to go from a rough idea to usable tracks with AI music tools. You will learn prompting for genre, mood, and structure, how to iterate on weak drafts, and how to turn generated audio into content, product intros, and original digital assets.",
    whoItsFor:
      "Beginners, content creators, and digital entrepreneurs who want to create original audio without needing a full music-production background.",
    format:
      "Self-paced digital class. Access is delivered to your Telegram instantly after checkout.",
    price: 35000,
    currency: "NGN",
    image: "/products/ai-music-generator.jpg",
    featured: true,
    active: true,
    skillLevel: "Beginner",
    deliveryType: "telegram",
    telegramAccessId: "ai-music-generator",
    duration: "Self-paced",
    features: [
      "Write prompts that produce usable songs and loops",
      "Control genre, mood, tempo, and vocal direction",
      "Iterate on drafts instead of accepting the first output",
      "Export and organize tracks for content and products",
      "Use generated music legally and commercially with care",
      "Build a simple library of original audio assets",
    ],
    benefits: [
      "Create original music without a studio",
      "Score videos, ads, and digital products",
      "Develop a practical audio workflow you can reuse",
    ],
    requirements: [
      "Headphones or speakers",
      "A computer or smartphone with internet access",
      "No music-theory background required",
    ],
    faqs: [
      {
        question: "Do I need to play an instrument?",
        answer:
          "No. The class focuses on AI generation, listening, iteration, and practical use of finished tracks.",
      },
      {
        question: "Can I use the music commercially?",
        answer:
          "You will learn how to check each tool’s usage terms. Commercial use depends on the generator you choose and its current license.",
      },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "ai-apps-websites",
    slug: "ai-apps-websites",
    name: "AI App/Websites Class",
    category: "websites",
    categories: ["ai", "websites", "app-development", "digital-business"],
    description:
      "Learn how to use AI to plan, design, and ship websites and lightweight apps — from idea to a working digital product.",
    longDescription:
      "This class is a practical path from a product idea to a working website or simple app using AI-assisted development. You will learn how to specify what you want, generate and refine interfaces, connect pages, and publish something people can actually use or buy.",
    whoItsFor:
      "Aspiring builders, freelancers, and business owners who want to launch websites or simple apps without waiting on a full engineering team.",
    format:
      "Self-paced digital class. Access is delivered to your Telegram instantly after checkout.",
    price: 55000,
    currency: "NGN",
    image: "/products/ai-apps-websites.jpg",
    featured: true,
    active: true,
    skillLevel: "Intermediate",
    deliveryType: "telegram",
    telegramAccessId: "ai-apps-websites",
    duration: "Self-paced",
    features: [
      "Turn a vague idea into a clear product brief",
      "Use AI to generate layouts, copy, and working pages",
      "Connect multi-page websites and simple app flows",
      "Fix broken generations with precise follow-up prompts",
      "Publish and share a live project",
      "Position the result as a service or digital product",
    ],
    benefits: [
      "Ship real web projects faster",
      "Reduce dependence on a full development team for v1",
      "Open a path into freelance or product work",
    ],
    requirements: [
      "Comfort using a browser and basic files",
      "A computer is strongly recommended",
      "No computer-science degree required",
    ],
    faqs: [
      {
        question: "Is this a coding bootcamp?",
        answer:
          "No. It is a practical AI-assisted building class. You will work with tools that write and refine code, with enough understanding to steer them.",
      },
      {
        question: "Will I publish a live site?",
        answer:
          "Yes. The class is designed around leaving with a working website or lightweight app you can share.",
      },
    ],
    createdAt: "2026-01-20",
  },
  {
    id: "ai-pdfs-business",
    slug: "ai-pdfs-business",
    name: "AI for PDFs Business Class",
    category: "pdf-business",
    categories: ["ai", "pdf-business", "digital-business", "productivity"],
    description:
      "Learn how to research, write, design, and sell PDF products using AI — from ebooks and guides to templates and reports.",
    longDescription:
      "This class shows you how to build a digital PDF business with AI in the workflow. You will learn topic selection, outline design, drafting, visual layout, packaging, and selling PDFs as simple digital products people can buy and download.",
    whoItsFor:
      "People who want a low-overhead digital product business: guides, templates, reports, planners, and short books.",
    format:
      "Self-paced digital class. Access is delivered to your Telegram instantly after checkout.",
    price: 40000,
    currency: "NGN",
    image: "/products/ai-pdfs-business.jpg",
    featured: true,
    active: true,
    skillLevel: "Beginner",
    deliveryType: "telegram",
    telegramAccessId: "ai-pdfs-business",
    duration: "Self-paced",
    features: [
      "Find PDF product ideas people will actually buy",
      "Use AI to research, outline, and draft faster",
      "Design clean, readable layouts",
      "Package templates, checklists, and reports",
      "Price and present a simple offer",
      "Build a repeatable PDF production system",
    ],
    benefits: [
      "Start a digital product line with low overhead",
      "Turn knowledge into something sellable",
      "Reuse one system across many PDF offers",
    ],
    requirements: [
      "A computer or tablet for writing and layout",
      "A PDF reader",
      "No publishing experience required",
    ],
    faqs: [
      {
        question: "Do I need design software?",
        answer:
          "No dedicated design suite is required to start. The class covers practical tools and AI-assisted layout options.",
      },
      {
        question: "Is this only about ebooks?",
        answer:
          "No. You can apply the same system to templates, planners, reports, checklists, and short guides.",
      },
    ],
    createdAt: "2026-01-22",
  },
  {
    id: "survey-class",
    slug: "survey-class",
    name: "Survey Class",
    category: "surveys",
    categories: ["surveys", "digital-business", "productivity"],
    description:
      "Learn how to design, distribute, and use surveys to collect useful data for research, offers, and online business decisions.",
    longDescription:
      "This class covers practical survey design: asking clearer questions, choosing the right format, distributing surveys, and turning responses into decisions. It is built for people who need real answers from customers, students, or audiences — not academic theory.",
    whoItsFor:
      "Business owners, creators, researchers, and students who need cleaner data from forms and audience questions.",
    format:
      "Self-paced digital class. Access is delivered to your Telegram instantly after checkout.",
    price: 25000,
    currency: "NGN",
    image: "/products/survey-class.jpg",
    featured: true,
    active: true,
    skillLevel: "Beginner",
    deliveryType: "telegram",
    telegramAccessId: "survey-class",
    duration: "Self-paced",
    features: [
      "Write questions that people can actually answer",
      "Avoid leading, stacked, and useless questions",
      "Choose between forms, polls, and longer surveys",
      "Distribute surveys to the right audience",
      "Read results without getting lost in the noise",
      "Use survey data to shape offers and content",
    ],
    benefits: [
      "Stop guessing what your audience wants",
      "Collect cleaner, more useful responses",
      "Turn feedback into product and content decisions",
    ],
    requirements: [
      "Internet access and a Google or similar forms account",
      "An audience or a plan to find respondents",
      "No statistics background required",
    ],
    faqs: [
      {
        question: "Is this a statistics class?",
        answer:
          "No. It focuses on practical survey design and use. You will learn enough analysis to make decisions, not academic stats.",
      },
      {
        question: "What tools will we use?",
        answer:
          "The class uses widely available form and survey tools. You can follow along with common free options.",
      },
    ],
    createdAt: "2026-01-25",
  },
];

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((product) => product.active);
}

export function getFeaturedProducts(): Product[] {
  return getActiveProducts().filter((product) => product.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug && product.active);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id && product.active);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getActiveProducts().filter(
    (product) =>
      product.category === categoryId || product.categories.includes(categoryId as CategoryId),
  );
}

export function getUsedCategories() {
  const used = new Set<string>();
  for (const product of getActiveProducts()) {
    used.add(product.category);
    for (const category of product.categories) used.add(category);
  }
  return used;
}

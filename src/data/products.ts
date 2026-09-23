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
  catalogVisible?: boolean;
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
    name: "AI Music Starter — Oryn Soundz",
    category: "music",
    categories: ["ai", "music", "content-creation"],
    description:
      "A beginner-friendly Oryn Soundz program for creating music with AI, from your first prompt to a finished song workflow.",
    longDescription:
      "Start with the complete AI music creation workflow: write effective prompts, develop lyrics and songs, shape genre, vocals, mood, BPM, and structure, convert MP3 files to WAV, create cover art, and practise a repeatable beginner process with examples and assignments.",
    whoItsFor:
      "Beginners who want a practical first step into AI music creation and a clear workflow they can practise immediately.",
    format:
      "Self-paced digital class with practical lessons, examples, and assignments. Access is delivered after checkout.",
    price: 5000,
    currency: "NGN",
    image: "/products/ai-music-generator.jpg",
    featured: true,
    active: true,
    skillLevel: "Beginner",
    deliveryType: "telegram",
    telegramAccessId: "ai-music-generator",
    duration: "Self-paced",
    features: [
      "Create your first AI-assisted music ideas",
      "Write professional prompts for genre, vocals, mood, BPM, and structure",
      "Develop lyrics and turn an idea into a song",
      "Convert MP3 audio to WAV for a cleaner working file",
      "Create simple, strong cover art for a track",
      "Follow a complete beginner workflow from prompt to finished draft",
    ],
    benefits: [
      "Start creating without a traditional studio",
      "Understand the full beginner workflow instead of guessing",
      "Leave with practical exercises you can repeat",
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
          "No. The starter package is designed for complete beginners and teaches the process step by step.",
      },
      {
        question: "Can I use the music commercially?",
        answer:
          "The starter package focuses on building your skills and workflow; always check the terms of the tools you use before commercial release.",
      },
    ],
    createdAt: "2026-01-15",
  },
  {
    id: "oryn-soundz-artist-release",
    slug: "oryn-soundz-artist-release",
    name: "AI Artist & Release — Oryn Soundz",
    category: "music",
    categories: ["ai", "music", "content-creation", "digital-business"],
    description:
      "Build on the AI Music Starter with artist identity, branding, release preparation, music videos, and a practical artist portfolio.",
    longDescription:
      "Package 2 includes the complete AI Music Starter plus a guided artist-and-release workflow. You will shape your identity, prepare music for distribution, create supporting content, and organize a portfolio for your next release.",
    whoItsFor:
      "Creators who want to move from making individual AI-assisted songs to presenting themselves as a consistent artist and preparing releases professionally.",
    format:
      "Self-paced digital program with practical lessons, examples, and assignments. Includes everything in AI Music Starter.",
    price: 10000,
    currency: "NGN",
    image: "/products/ai-music-generator.jpg",
    featured: false,
    active: true,
    catalogVisible: false,
    skillLevel: "Intermediate",
    deliveryType: "telegram",
    telegramAccessId: "oryn-soundz-artist-release",
    duration: "Self-paced",
    features: [
      "Everything in AI Music Starter",
      "Define an AI artist identity and point of view",
      "Build a consistent artist brand and visual direction",
      "Prepare music distribution uploads, requirements, and metadata",
      "Claim and organize artist profiles where available",
      "Create AI music videos and repeatable music content",
      "Build an artist portfolio and release workflow",
    ],
    benefits: [
      "Move from isolated tracks to a recognizable artist project",
      "Prepare releases with fewer avoidable mistakes",
      "Create a portfolio that makes your work easier to present",
    ],
    requirements: [
      "Completion of, or willingness to follow, AI Music Starter",
      "A computer or smartphone with internet access",
      "A willingness to practise and refine your artist direction",
    ],
    faqs: [
      {
        question: "Does this include the starter package?",
        answer: "Yes. Package 2 unlocks everything in AI Music Starter plus the artist and release lessons.",
      },
      {
        question: "Will my release be approved or guaranteed to perform?",
        answer: "No. The program teaches preparation and workflow. Approval, reach, and performance depend on the relevant platform and audience.",
      },
    ],
    createdAt: "2026-02-01",
  },
  {
    id: "oryn-soundz-business-coaching",
    slug: "oryn-soundz-business-coaching",
    name: "AI Music Business Coaching — Oryn Soundz",
    category: "music",
    categories: ["ai", "music", "content-creation", "digital-business"],
    description:
      "Unlock the full Oryn Soundz pathway with artist development, release practice, live coaching, and a personalized 30/90-day roadmap.",
    longDescription:
      "Package 3 includes everything in AI Music Starter and AI Artist & Release, then adds practical business coaching. Learn how to organize your music business, build an audience, plan content and releases, read analytics, and create a personalized next-step roadmap.",
    whoItsFor:
      "Artists and creators who are ready to treat their music activity as a structured project and want guidance on their next 30 and 90 days.",
    format:
      "Self-paced digital program plus live coaching. Includes everything in AI Music Starter and AI Artist & Release.",
    price: 15000,
    currency: "NGN",
    image: "/products/ai-music-generator.jpg",
    featured: false,
    active: true,
    catalogVisible: false,
    skillLevel: "Advanced",
    deliveryType: "telegram",
    telegramAccessId: "oryn-soundz-business-coaching",
    duration: "Coaching program",
    features: [
      "Everything in AI Music Starter and AI Artist & Release",
      "Live coaching and practical music business education",
      "Explore monetization paths without income guarantees",
      "Build an audience with a repeatable content strategy",
      "Plan releases and review analytics for better decisions",
      "Strengthen personal branding and your music business system",
      "Create a personalized 30/90-day action roadmap",
    ],
    benefits: [
      "Replace scattered activity with a clear operating system",
      "Make better decisions from your goals, content, and analytics",
      "Leave with practical next steps for the next month and quarter",
    ],
    requirements: [
      "Completion of, or willingness to follow, the first two packages",
      "A current music idea, artist project, or content goal to work on",
      "Availability for the scheduled coaching format",
    ],
    faqs: [
      {
        question: "Does Package 3 include the earlier packages?",
        answer: "Yes. Package 3 unlocks the complete Oryn Soundz pathway plus business coaching.",
      },
      {
        question: "Do you guarantee income, streams, followers, verification, or approval?",
        answer: "No. Coaching provides education, planning, and feedback. Results depend on your work, decisions, platforms, and audience.",
      },
    ],
    createdAt: "2026-02-01",
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
  return PRODUCTS.filter((product) => product.active && product.catalogVisible !== false);
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

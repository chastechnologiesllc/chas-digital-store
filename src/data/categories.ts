export type CategoryId =
  | "ai"
  | "content-creation"
  | "music"
  | "video"
  | "websites"
  | "app-development"
  | "pdf-business"
  | "surveys"
  | "digital-business"
  | "productivity"
  | "other";

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  { id: "ai", label: "AI", description: "Practical classes on modern AI tools and workflows." },
  { id: "content-creation", label: "Content Creation", description: "Create digital content with AI-assisted pipelines." },
  { id: "music", label: "Music", description: "Generate and shape music with AI tools." },
  { id: "video", label: "Video", description: "Plan, generate, and edit video with AI." },
  { id: "websites", label: "Websites", description: "Build and ship websites with AI assistance." },
  { id: "app-development", label: "App Development", description: "Turn ideas into apps with modern AI tooling." },
  { id: "pdf-business", label: "PDF Business", description: "Build a digital product business around PDFs." },
  { id: "surveys", label: "Surveys", description: "Design, distribute, and use surveys professionally." },
  { id: "digital-business", label: "Digital Business", description: "Systems for selling digital products online." },
  { id: "productivity", label: "Productivity", description: "Work faster with digital and AI tools." },
  { id: "other", label: "Other", description: "Additional digital classes and products." },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

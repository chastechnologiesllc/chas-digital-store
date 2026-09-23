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
  { id: "music", label: "AI Music", description: "Explore AI music classes for creating songs, developing artists, and building music projects." },
  { id: "video", label: "AI Video", description: "Explore AI video classes for planning, generating, editing, and delivering content." },
  { id: "websites", label: "AI Apps & Websites", description: "Explore practical classes for building and shipping websites and lightweight apps with AI." },
  { id: "app-development", label: "App Development", description: "Turn ideas into apps with modern AI tooling." },
  { id: "pdf-business", label: "AI PDF Business", description: "Explore classes for researching, designing, and selling useful PDF products with AI." },
  { id: "surveys", label: "Surveys", description: "Design, distribute, and use surveys professionally." },
  { id: "digital-business", label: "Digital Business", description: "Systems for selling digital products online." },
  { id: "productivity", label: "Productivity", description: "Work faster with digital and AI tools." },
  { id: "other", label: "Other", description: "Additional digital classes and products." },
];

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

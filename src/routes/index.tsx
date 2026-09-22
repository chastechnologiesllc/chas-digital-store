import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero/hero-section";
import { CATEGORIES } from "@/data/categories";
import { getUsedCategories } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const used = getUsedCategories();
  const categories = CATEGORIES.filter((c) => used.has(c.id));

  return (
    <main id="main">
      <HeroSection />

      {/* Browse by Category */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Browse by category</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/classes"
              search={{ category: category.id }}
              className="rounded-lg bg-card p-4 shadow-[0_0_0_1px_rgb(238_241_244/0.08)] transition-colors hover:bg-surface-2"
            >
              <p className="font-medium">{category.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}

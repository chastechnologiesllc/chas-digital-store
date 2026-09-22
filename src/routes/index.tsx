import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero/hero-section";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories";
import { getActiveProducts, getUsedCategories } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const activeCount = getActiveProducts().length;
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Start with one class
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          Pick a skill, pay once, and get instant access to your classroom.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/classes">
            Explore Classes {activeCount > 0 ? `— ${activeCount} available` : ""}
          </Link>
        </Button>
      </section>
    </main>
  );
}

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

      {/* How It Works */}
      <section id="how-it-works" className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            Three steps from class to classroom
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Choose a class", body: "Browse the catalog and pick the skill you want to learn." },
              { step: "02", title: "Pay securely", body: "Complete checkout with Paystack or Flutterwave in Naira." },
              { step: "03", title: "Join on Telegram", body: "Get instant access to your classroom right after payment." },
            ].map((item) => (
              <li key={item.step} className="rounded-xl bg-background p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
                <p className="font-display text-sm text-accent">{item.step}</p>
                <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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

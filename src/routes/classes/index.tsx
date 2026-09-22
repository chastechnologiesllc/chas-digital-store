import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/products/product-card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/data/categories";
import { getActiveProducts, getProductsByCategory, getUsedCategories } from "@/data/products";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/classes/")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ClassesPage,
  head: () => ({
    meta: [
      { title: "Classes · chAs Technologies LLC Digital Store" },
      {
        name: "description",
        content: "Browse practical AI and digital classes from chAs Technologies LLC Digital Store.",
      },
    ],
  }),
});

function ClassesPage() {
  const { category } = Route.useSearch();
  const used = getUsedCategories();
  const filters = CATEGORIES.filter((item) => used.has(item.id));
  const products = category ? getProductsByCategory(category) : getActiveProducts();

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Catalog</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Classes</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Practical digital classes on AI, content, websites, PDF products, and surveys. New classes can be added from the product configuration without rebuilding the store.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to="/classes"
          className={cn(
            "rounded-full px-3 py-2 text-xs font-medium shadow-[0_0_0_1px_rgb(238_241_244/0.12)]",
            !category ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          All
        </Link>
        {filters.map((item) => (
          <Link
            key={item.id}
            to="/classes"
            search={{ category: item.id }}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-medium shadow-[0_0_0_1px_rgb(238_241_244/0.12)]",
              category === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="mt-16 rounded-xl bg-card p-10 text-center shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
          <Badge>Empty</Badge>
          <p className="mt-4 text-sm text-muted-foreground">No classes in this category yet.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

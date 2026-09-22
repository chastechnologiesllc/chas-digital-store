import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Send, ShieldCheck } from "lucide-react";
import { HeroSection } from "@/components/hero/hero-section";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CATEGORIES } from "@/data/categories";
import { SITE_FAQS } from "@/data/faq";
import { getActiveProducts, getFeaturedProducts, getUsedCategories } from "@/data/products";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const products = getFeaturedProducts();
  const activeCount = getActiveProducts().length;
  const used = getUsedCategories();
  const categories = CATEGORIES.filter((category) => used.has(category.id));

  return (
    <main id="main">
      <HeroSection />

      <section id="featured" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Featured classes</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Learn a skill you can use this week</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/classes">
              All classes
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Three steps from class to classroom</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", title: "Choose a class", body: "Open a class page, read the outline, and confirm it matches the skill you want." },
              { step: "02", title: "Pay securely", body: "Enter your details and complete checkout with Paystack or Flutterwave." },
              { step: "03", title: "Join on Telegram", body: "Your access link is ready immediately after payment is confirmed." },
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Browse by category</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Find the right class for where you are right now.
        </p>
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

      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Built for practical digital work</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {site.companyName} Digital Store is a catalog of applied classes — AI video, music, websites, PDF products, and surveys — not a generic lecture library.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><Lock className="mt-0.5 size-4 text-accent" /> Secure checkout with Paystack and Flutterwave.</li>
              <li className="flex gap-2"><Send className="mt-0.5 size-4 text-accent" /> Instant classroom access delivered to your Telegram.</li>
              <li className="flex gap-2"><ShieldCheck className="mt-0.5 size-4 text-accent" /> Self-paced classes you can revisit any time.</li>
            </ul>
          </div>
          <Accordion type="single" collapsible className="rounded-xl bg-background px-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
            {SITE_FAQS.slice(0, 4).map((item, index) => (
              <AccordionItem key={item.question} value={`q-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Start with one class</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
          Pick a skill, pay once, and get instant access to your classroom.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/classes">Explore Classes {activeCount > 0 ? `— ${activeCount} available` : ""}</Link>
        </Button>
      </section>
    </main>
  );
}

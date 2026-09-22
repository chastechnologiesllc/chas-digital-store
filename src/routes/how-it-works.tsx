import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BookOpen, CreditCard, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How It Works · chAs Technologies LLC Digital Store" },
      {
        name: "description",
        content:
          "Learn how to choose a class, pay securely, receive verified access, and learn through the chAs Technologies LLC Digital Store.",
      },
    ],
  }),
});

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Choose a class",
    body: "Browse the catalogue, compare class topics and levels, and open a class page to review what you will learn before checkout.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Start secure checkout",
    body: "Select your class and continue to checkout. Payments are initiated through Paystack or Flutterwave, trusted payment platforms that support secure card and transfer flows.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Payment is verified",
    body: "The store checks the payment result on the server before granting access. This keeps an unfinished or unverified payment from being treated as a completed order.",
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Receive classroom access",
    body: "After successful verification, your order reference and access instructions are generated. Where configured for the class, Telegram is used to connect you to the right classroom.",
  },
  {
    number: "05",
    icon: Sparkles,
    title: "Learn and put it to work",
    body: "Open your class materials, follow the practical workflow, and use what you learn to create, publish, or improve a real digital project.",
  },
] as const;

function HowItWorksPage() {
  return (
    <main id="main">
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">How it works</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            A clear path from choosing a class to using what you learn.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The store is designed to keep the journey simple: understand the class, complete a secure payment, receive verified access, and start learning without unnecessary steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/classes">
                Explore Classes
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">The learning journey</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Five simple stages</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Each stage has a clear purpose so you always know what is happening and what to do next.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm text-accent">{step.number}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Technology behind the experience</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Built for a dependable digital purchase</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Several services work together behind the scenes so the interface can stay simple while payments, orders, authentication, and delivery remain traceable.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Paystack and Flutterwave", "Payment providers handle the checkout experience and return a transaction result for server-side verification."],
              ["Server-side order checks", "Order and payment services record the transaction state before an access reference is issued."],
              ["Telegram classrooms", "Configured products can connect verified buyers to the correct Telegram group or channel."],
              ["PostgreSQL and PGlite", "Production data can use PostgreSQL, while the local preview path supports an offline-friendly PGlite fallback."],
              ["Authentication and access", "Better Auth and signed access flows help protect account and classroom entry points."],
              ["React and Vite", "The storefront interface is fast, responsive, and built from reusable React components for a consistent experience."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-xl bg-background p-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
                <div className="flex items-center gap-2">
                  <BadgeCheck size={17} className="text-accent" aria-hidden="true" />
                  <h3 className="font-medium">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Ready to choose your first class?</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Start with the catalogue, choose a practical skill, and follow the guided checkout flow when you are ready.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/classes">
            Browse the catalogue
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      { title: "How It Works · chAs Technologies LLC Digital Store" },
      {
        name: "description",
        content:
          "Learn how to choose a course, complete payment, and receive immediate access to your class.",
      },
    ],
  }),
});

function HowItWorksPage() {
  return (
    <main id="main">
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">How it works</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Start learning in a few simple steps.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Getting started is straightforward. Browse the available courses, choose the one that matches what you want to learn, and open the course page to review the description, level, and price.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Choose your course</h2>
            <p className="mt-3">
              Scroll through the course catalogue and select the course you want to take. Each course page explains what you will learn and gives you the information you need before you make your decision.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Pay for your course</h2>
            <p className="mt-3">
              When you are ready, continue to checkout and complete your payment securely. Follow the instructions on the payment page, then wait for your payment to be confirmed.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">Get added to your class immediately</h2>
            <p className="mt-3">
              Once your payment is successfully confirmed, you will be added to the class immediately. Your access instructions will be provided after checkout so you can begin learning without unnecessary delay.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)] sm:p-8">
          <h2 className="font-display text-2xl font-semibold">Ready to begin?</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Choose your course, complete your payment, and start your learning journey today.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/classes">
              Explore Classes
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

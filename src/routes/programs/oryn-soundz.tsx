import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";

export const Route = createFileRoute("/programs/oryn-soundz")({
  component: OrynSoundzPage,
  head: () => ({
    meta: [
      { title: "AI Music Courses · chAs Technologies LLC Digital Store" },
      {
        name: "description",
        content: "Choose a practical AI music course for your next creative step.",
      },
    ],
  }),
});

const starter = getProductBySlug("ai-music-generator");
const artistRelease = getProductBySlug("oryn-soundz-artist-release");
const businessCoaching = getProductBySlug("oryn-soundz-business-coaching");

const packages = [
  {
    name: "AI Music Starter",
    price: starter ? formatMoney(starter.price, starter.currency) : "₦5,000",
    slug: "ai-music-generator",
    label: "Package 1",
    description: "For beginners who want to learn how to create songs with AI from the first idea to a finished draft.",
    items: [
      "AI music creation and professional prompting",
      "Lyrics, genre, vocals, mood, BPM, and structure",
      "MP3 to WAV, cover art, and a complete beginner workflow",
    ],
  },
  {
    name: "AI Artist & Release",
    price: artistRelease ? formatMoney(artistRelease.price, artistRelease.currency) : "₦10,000",
    slug: "oryn-soundz-artist-release",
    label: "Package 2",
    description: "For students ready to develop an artist identity and prepare music for release.",
    items: [
      "Everything in Package 1",
      "Artist identity, branding, and portfolio",
      "Release preparation, metadata, videos, and content",
    ],
  },
  {
    name: "AI Music Business Coaching",
    price: businessCoaching ? formatMoney(businessCoaching.price, businessCoaching.currency) : "₦15,000",
    slug: "oryn-soundz-business-coaching",
    label: "Package 3",
    description: "For students who want guidance building a focused music project and business system.",
    items: [
      "Everything in Packages 1 and 2",
      "Live coaching, audience, content, and release strategy",
      "Analytics, personal branding, and a 30/90-day roadmap",
    ],
  },
] as const;

function OrynSoundzPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Welcome</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Welcome to your AI music journey
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Whether you are creating your first song, building an artist project, or taking your music more seriously, you can start with the package that fits your goal. Everything is kept practical, clear, and easy to follow.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          We have three packages for students in this class. Choose your package below to see what you will get and continue to payment.
        </p>
      </section>

      <section className="mt-12">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Choose your package</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Start where you are</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <article
              key={item.slug}
              className={index === 0
                ? "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(122_163_181/0.6)]"
                : "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]"}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-accent">{item.label}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{item.name}</h3>
              <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{item.price}</p>
              <p className="mt-4 min-h-16 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {item.items.map((value) => (
                  <li key={value} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 w-full">
                <Link to="/checkout/$slug" params={{ slug: item.slug }}>
                  View package and pay
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
        Each package provides training and practical guidance. Results depend on your practice, decisions, platforms, and audience.
      </p>
    </main>
  );
}

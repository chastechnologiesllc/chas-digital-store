import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";

export const Route = createFileRoute("/programs/oryn-soundz")({
  component: OrynSoundzPage,
  head: () => ({
    meta: [
      { title: "Oryn Soundz AI Music Training Program" },
      {
        name: "description",
        content: "Choose an Oryn Soundz AI music training package.",
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
    label: "Begin here",
    description: "Learn the complete beginner workflow for creating music with AI.",
    items: [
      "AI music creation and prompting",
      "Lyrics, genre, vocals, mood, BPM, and structure",
      "MP3 to WAV and cover-art creation",
    ],
  },
  {
    name: "AI Artist & Release",
    price: artistRelease ? formatMoney(artistRelease.price, artistRelease.currency) : "₦10,000",
    slug: "oryn-soundz-artist-release",
    label: "Includes Starter",
    description: "Build your artist identity and prepare your music for release.",
    items: [
      "Everything in AI Music Starter",
      "Artist identity and branding",
      "Release preparation, metadata, videos, and portfolio",
    ],
  },
  {
    name: "AI Music Business Coaching",
    price: businessCoaching ? formatMoney(businessCoaching.price, businessCoaching.currency) : "₦15,000",
    slug: "oryn-soundz-business-coaching",
    label: "Complete package",
    description: "Add coaching and a practical system for growing your music project.",
    items: [
      "Everything in Starter and Artist & Release",
      "Live coaching, audience, content, and release strategy",
      "Analytics, personal branding, and a 30/90-day roadmap",
    ],
  },
] as const;

function OrynSoundzPage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Oryn Soundz</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Choose your AI music package
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Start at ₦5,000, unlock more at ₦10,000, or choose the complete coaching package at ₦15,000.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold">
          <span>₦5,000</span>
          <ArrowRight className="size-4 text-accent" aria-hidden="true" />
          <span>₦10,000</span>
          <ArrowRight className="size-4 text-accent" aria-hidden="true" />
          <span>₦15,000</span>
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {packages.map((item, index) => (
          <article
            key={item.slug}
            className={index === 1
              ? "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(122_163_181/0.6)]"
              : "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]"}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-accent">{item.label}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">{item.name}</h2>
            <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{item.price}</p>
            <p className="mt-4 min-h-12 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
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
                Choose package
                <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
        The program provides training, practical guidance, and coaching where included. Results are not guaranteed.
      </p>
    </main>
  );
}

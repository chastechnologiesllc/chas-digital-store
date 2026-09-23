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
        content:
          "Choose the Oryn Soundz AI Music Starter, Artist & Release, or Business Coaching package.",
      },
      { property: "og:title", content: "Oryn Soundz AI Music Training Program" },
      {
        property: "og:description",
        content: "A practical three-package pathway for creating, releasing, and building with AI-assisted music.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

const starter = getProductBySlug("ai-music-generator");
const artistRelease = getProductBySlug("oryn-soundz-artist-release");
const businessCoaching = getProductBySlug("oryn-soundz-business-coaching");

const packages = [
  {
    number: "01",
    label: "For beginners",
    name: "AI Music Starter",
    price: starter ? formatMoney(starter.price, starter.currency) : "₦5,000",
    slug: "ai-music-generator",
    summary: "Start with the existing AI Music Generator class and learn a complete beginner workflow.",
    includes: [
      "AI music creation and professional prompting",
      "Lyrics and song development",
      "Genre, vocals, mood, BPM, and structure",
      "MP3 to WAV conversion and cover-art creation",
      "Beginner lessons, examples, and assignments",
    ],
    note: "This is the existing AI Music Generator class — it is not duplicated.",
    featured: false,
  },
  {
    number: "02",
    label: "Build your artist project",
    name: "AI Artist & Release",
    price: artistRelease ? formatMoney(artistRelease.price, artistRelease.currency) : "₦10,000",
    slug: "oryn-soundz-artist-release",
    summary: "Unlock Package 1 and build the identity, content, portfolio, and release workflow around your music.",
    includes: [
      "Everything in AI Music Starter",
      "AI artist identity and artist branding",
      "Distribution preparation, upload requirements, and metadata",
      "Artist profile claiming and release organization",
      "AI music videos, music content, portfolio, and release workflow",
    ],
    note: "Package 2 unlocks Package 1 plus the Artist & Release lessons.",
    featured: true,
  },
  {
    number: "03",
    label: "Build the business around it",
    name: "AI Music Business Coaching",
    price: businessCoaching ? formatMoney(businessCoaching.price, businessCoaching.currency) : "₦15,000",
    slug: "oryn-soundz-business-coaching",
    summary: "Unlock the complete pathway and add coaching for your music business, audience, content, and next steps.",
    includes: [
      "Everything in Packages 1 and 2",
      "Live coaching and music business education",
      "Monetization, audience building, and content strategy",
      "Release strategy, analytics, personal branding, and systems",
      "A personalized 30/90-day roadmap",
    ],
    note: "Package 3 unlocks everything plus business coaching. No income or platform-result guarantees are made.",
    featured: false,
  },
] as const;

function OrynSoundzPage() {
  return (
    <main id="main">
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Oryn Soundz</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            AI Music Training Program
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A simple, practical pathway for beginners and growing artists. Start with music creation, continue into artist and release preparation, then add business coaching when you are ready.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-medium">
            <span className="rounded-full bg-card px-4 py-2 shadow-[0_0_0_1px_rgb(238_241_244/0.1)]">₦5,000</span>
            <ArrowRight className="size-4 text-accent" aria-hidden="true" />
            <span className="rounded-full bg-card px-4 py-2 shadow-[0_0_0_1px_rgb(238_241_244/0.1)]">₦10,000</span>
            <ArrowRight className="size-4 text-accent" aria-hidden="true" />
            <span className="rounded-full bg-card px-4 py-2 shadow-[0_0_0_1px_rgb(238_241_244/0.1)]">₦15,000</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Choose your package</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Go step by step or unlock the full pathway</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Every package is practical and beginner-friendly. You will work through lessons, see examples, and complete assignments that turn each idea into a usable music or artist asset.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.number}
              className={item.featured
                ? "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(122_163_181/0.55)]"
                : "flex h-full flex-col rounded-2xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]"}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-sm text-accent">{item.number}</p>
                {item.featured ? <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">Most complete next step</span> : null}
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{item.name}</h3>
              <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{item.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {item.includes.map((include) => (
                  <li key={include} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{include}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
              <Button asChild className="mt-auto w-full" size="lg">
                <Link to="/classes/$slug" params={{ slug: item.slug }}>
                  View package
                  <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">How the lessons work</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Learn, practise, submit, improve</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Each package is organized around short lessons, clear demonstrations, and assignments. You can apply the lesson to a real song, artist idea, release draft, or business decision instead of only collecting information.
            </p>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p><strong className="text-foreground">Lessons:</strong> Follow one practical topic at a time, from prompting and songwriting to release planning and business systems.</p>
            <p><strong className="text-foreground">Examples:</strong> Review examples of prompts, lyrics, metadata, content ideas, portfolio structure, and planning documents.</p>
            <p><strong className="text-foreground">Assignments:</strong> Create your own prompt set, song draft, artist profile direction, release checklist, content plan, or 30/90-day roadmap.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight">Start at the level that fits you</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Begin with the existing AI Music Starter class, add artist and release training when you are ready, or choose the complete pathway with business coaching. The program supports progress; it does not promise guaranteed income, streams, followers, verification, distribution approval, or any other platform result.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/classes/$slug" params={{ slug: "ai-music-generator" }}>
            Start with AI Music Starter
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </main>
  );
}

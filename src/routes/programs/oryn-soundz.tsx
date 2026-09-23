import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { getLocalizedPrice, getCountryLabel, type PricingCountry } from "@/lib/pricing";
import { getPricingCountryFn } from "@/lib/payments/functions";

export const Route = createFileRoute("/programs/oryn-soundz")({
  component: OrynSoundzPage,
  head: () => ({
    meta: [
      { title: "Oryn Soundz AI Music Program · chAs Technologies LLC Digital Store" },
      {
        name: "description",
        content: "Follow the Oryn Soundz journey from creating AI music to building an artist project and music business.",
      },
    ],
  }),
});

const packageContent = [
  {
    slug: "ai-music-generator",
    label: "Package 1",
    eyebrow: "Start creating",
    name: "AI Music Starter",
    fallbackPrice: "₦5,000",
    humanDescription: "Your first step from a blank idea to a finished AI-assisted song you can actually be proud of.",
    items: ["AI music creation and professional prompting", "Song development, lyrics, genre, vocals, mood, BPM, and structure", "MP3 to WAV, cover art, and a repeatable beginner workflow"],
    cta: "Start learning",
    tone: "border-[#7aa3b5]/60 bg-[#16242a]",
  },
  {
    slug: "oryn-soundz-artist-release",
    label: "Package 2",
    eyebrow: "Become an artist",
    name: "AI Artist & Release",
    fallbackPrice: "₦10,000",
    humanDescription: "Turn your strongest songs into a recognizable artist project with a clear release path and portfolio.",
    items: ["Everything in AI Music Starter", "Artist identity, branding, profiles, and portfolio", "Distribution preparation, music videos, content, and release workflow"],
    cta: "Build your artist project",
    tone: "border-[#b38a45]/45 bg-[#211b15]",
  },
  {
    slug: "oryn-soundz-business-coaching",
    label: "Package 3",
    eyebrow: "Build with guidance",
    name: "AI Music Business Coaching",
    fallbackPrice: "₦15,000",
    humanDescription: "Get the complete pathway plus live coaching to turn your music activity into a focused, practical system.",
    items: ["Everything in Packages 1 and 2", "Live coaching, music business, audience, content, and release strategy", "Analytics, monetization education, and a personal 30/90-day roadmap"],
    cta: "Get live coaching",
    tone: "border-[#c99c50]/70 bg-[#2a2012]",
  },
] as const;

function OrynSoundzPage() {
  const detectCountry = getPricingCountryFn;
  const [country, setCountry] = useState<PricingCountry>("NG");

  useEffect(() => {
    detectCountry().then(setCountry).catch(() => undefined);
  }, [detectCountry]);

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <section className="relative mt-6 overflow-hidden rounded-3xl border border-[#b38a45]/30 bg-[#100d0a] shadow-[0_0_0_1px_rgb(238_241_244/0.08)] sm:mt-10">
        <img src="/products/oryn-soundz-cover.jpg" alt="Oryn Soundz studio cover" className="absolute inset-0 size-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,12,0.97)_0%,rgba(8,9,12,0.78)_48%,rgba(8,9,12,0.35)_100%)]" />
        <div className="relative grid min-h-[390px] items-end gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="max-w-2xl">
            <Badge className="border border-[#d7a947]/35 bg-[#d7a947]/12 text-[#f0c766]"><Sparkles className="mr-1 size-3" /> Oryn Soundz presents</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">Your music journey starts here.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/72 sm:text-lg">You do not need to have everything figured out. Start with the song, grow into the artist, and get the guidance to build a music project that keeps moving.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/75">
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2">Create</span>
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2">Build</span>
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2">Release</span>
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-2">Grow</span>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-md lg:justify-self-end">
            <img src="/products/oryn-soundz-profile.jpg" alt="Oryn Soundz" className="size-16 rounded-full object-cover ring-2 ring-[#d7a947]" />
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#f0c766]">Created by</p>
              <p className="mt-1 font-display text-xl font-semibold text-white">Oryn Soundz</p>
              <p className="mt-1 text-sm text-white/60">AI music creator and guide</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Choose your next step</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Three packages. One clear progression.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Each package builds on the one before it, so you can start at the level that feels right and upgrade when your music is ready for more.</p>
          <p className="mt-3 text-xs text-accent">Showing prices for {getCountryLabel(country)}. Your final payment total is confirmed at checkout.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packageContent.map((item, index) => {
            const product = getProductBySlug(item.slug);
            return (
              <Link
                key={item.slug}
                to="/programs/oryn-soundz/$slug"
                params={{ slug: item.slug }}
                aria-label={`Open full details for ${item.name}`}
                className={`group flex h-full flex-col rounded-2xl border p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.05)] transition duration-200 hover:-translate-y-1 hover:border-[#f0c766]/70 hover:shadow-[0_0_28px_rgb(240_199_102/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f0c766] ${item.tone}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#f0c766]">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-white/60">{item.eyebrow}</p>
                  </div>
                  {index === 2 ? <Badge className="border border-[#d7a947]/35 bg-[#d7a947]/15 text-[#f0c766]">Premium</Badge> : null}
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">{item.name}</h3>
                <p className="mt-3 min-h-20 text-sm leading-relaxed text-white/70">{item.humanDescription}</p>
                <p className="mt-5 font-display text-3xl font-semibold tabular-nums text-white">{product ? formatMoney(getLocalizedPrice(product, country).amount, getLocalizedPrice(product, country).currency) : item.fallbackPrice}</p>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
                  {item.items.map((value) => <p key={value} className="flex gap-2 text-sm leading-relaxed text-white/72"><Check className="mt-0.5 size-4 shrink-0 text-[#f0c766]" />{value}</p>)}
                </div>
                <div className="mt-auto flex flex-col gap-3 pt-7">
                  <span className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-medium text-[#111318] transition group-hover:bg-[#f0c766]">See full package <ArrowRight className="size-4" /></span>
                  <span className="text-center text-xs font-medium text-white/60">Open the package page to continue to payment</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">The journey</p>
        <div className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-4">
          {[["01", "Learn to create music"], ["02", "Become an artist"], ["03", "Release with intention"], ["04", "Build with guidance"]].map(([number, label]) => <div key={number} className="flex gap-3"><span className="font-display text-sm font-semibold text-accent">{number}</span><span>{label}</span></div>)}
        </div>
      </section>
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">Training gives you practical tools and guidance. Streams, approval, followers, reach, and income are never guaranteed and depend on your work, platforms, audience, and current rules.</p>
    </main>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check, Copy, Send, Sparkles } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { getLocalizedPrice, getCountryLabel, type PricingCountry } from "@/lib/pricing";
import { getPricingCountryFn, initializePaymentFn } from "@/lib/payments/functions";

const packageMeta = {
  "ai-music-generator": {
    label: "Package 1", eyebrow: "Start creating", accent: "#7aa3b5", outcome: "Create → Improve → Prepare",
    intro: "This is the friendly starting point for complete beginners. You will move from your first idea to a finished AI-assisted music project, without needing a studio or music-theory background.",
    modules: [["AI Music Foundation", "Understand what AI music is, how generators work, and how genres, vocals, instrumentals, lyrics, BPM, mood, and song structure fit together."], ["Realistic AI Song Creation", "Turn an idea into lyrics, a structured prompt, multiple generations, and a stronger final version using accessible tools."], ["Professional AI Music Prompting", "Learn to describe genre, rhythm, groove, instruments, vocals, delivery, energy, mood, structure, and production clearly."], ["Song Development", "Strengthen hooks, verses, choruses, transitions, repetition, flow, and energy through practical exercises."], ["Audio Preparation", "Understand MP3 versus WAV, file organization, naming, mastering basics, and why converting MP3 to WAV does not restore lost quality."], ["Cover Art and Beginner Workflow", "Create a visual concept, prepare artwork, and finish a complete project with lyrics, prompt, song, WAV version, cover art, and organized files."]],
  },
  "oryn-soundz-artist-release": {
    label: "Package 2", eyebrow: "Become an artist", accent: "#8b7cf6", outcome: "Create → Brand → Prepare → Release",
    intro: "Package 2 builds on the Starter. You keep the creative foundation, then shape it into a recognizable artist project with a release-ready system and portfolio.",
    modules: [["Building Your AI Artist", "Choose an artist name, direction, genre identity, visual identity, biography, and a point of view people can recognize."], ["Artist Branding", "Create a practical artist-brand checklist covering colors, typography, profile image, banner artwork, cover style, and social identity."], ["Music Distribution", "Understand distributors, streaming platforms, free and paid models, revenue shares, requirements, upload flow, and changing platform rules."], ["Release Requirements and Artist Profiles", "Prepare WAV audio, artwork, metadata, release information, and learn how supported artist-profile systems work without promises of approval or verification."], ["AI Music Videos and Content", "Turn a song into scenes, short clips, a video, teasers, lyric content, announcements, and a repeatable release-content system."], ["Artist Portfolio and Release Project", "Finish with an artist identity, song, artwork, metadata, bio, distribution information, content plan, and portfolio."]],
  },
  "oryn-soundz-business-coaching": {
    label: "Package 3", eyebrow: "Build with guidance", accent: "#f0c766", outcome: "Create → Build → Release → Promote → Analyze → Improve",
    intro: "This is the premium path for students who want to stop treating every song as an isolated project. It includes Packages 1 and 2, plus implementation-focused business education and live coaching.",
    modules: [["Understanding the Music Business", "See how artists, songwriters, producers, distributors, platforms, publishers, licensing, rights, royalties, and revenue streams connect."], ["Monetization Education", "Explore legitimate pathways such as streaming, YouTube, licensing, sync, music for creators and businesses, and artist services without income guarantees."], ["Audience and Release Strategy", "Find your niche, tell your artist story, build community, plan pre-release and post-release content, and create a practical release calendar."], ["Music Data and Analytics", "Read streams, listeners, locations, engagement, views, watch time, saves, shares, followers, and platform analytics to improve future decisions."], ["Personal Brand and Music System", "Build a consistent online presence and a repeatable system from idea to song, artwork, content, release, promotion, analytics, and improvement."], ["Live Coaching and Personal Roadmap", "Get guidance reviewing prompts, music, branding, artwork, profiles, release preparation, portfolios, content strategy, distribution questions, and your next 30/90 days."]],
  },
} as const;

type PackageSlug = keyof typeof packageMeta;

export const Route = createFileRoute("/programs/oryn-soundz/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    const meta = packageMeta[params.slug as PackageSlug];
    if (!product || !meta) throw notFound();
    return { product, meta };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.product.name ?? "Oryn Soundz Package"} · chAs Technologies LLC Digital Store` }, { name: "description", content: loaderData?.product.description ?? "Oryn Soundz AI Music package details." }] }),
  component: PackageDetailPage,
});

function PackageDetailPage() {
  const { product, meta } = Route.useLoaderData();
  const initialize = useServerFn(initializePaymentFn);
  const [copied, setCopied] = useState(false);
  const [country, setCountry] = useState<PricingCountry | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const localizedPrice = country ? getLocalizedPrice(product, country) : null;

  useEffect(() => { getPricingCountryFn().then(setCountry).catch(() => undefined); }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  async function startPayment(event: FormEvent) {
    event.preventDefault();
    if (!country || !localizedPrice) { toast.error("Still detecting your country. Please try again in a moment."); return; }
    setSubmitting(true);
    try {
      const result = await initialize({ data: { productId: product.id, name, email, phone: phone || undefined, gateway: "paystack", country } });
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open Paystack.");
      setSubmitting(false);
    }
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6">
      <Link to="/programs/oryn-soundz" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to all packages</Link>
      <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          <section className="relative overflow-hidden rounded-3xl border border-[#b38a45]/30 bg-[#100d0a] p-6 sm:p-10"><img src="/products/oryn-soundz-cover.jpg" alt="Oryn Soundz studio cover" className="absolute inset-0 size-full object-cover opacity-30" /><div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,9,12,0.98)_0%,rgba(8,9,12,0.84)_65%,rgba(8,9,12,0.44)_100%)]" /><div className="relative"><div className="flex flex-wrap items-center gap-2"><Badge className="border border-white/20 bg-white/10" style={{ color: meta.accent }}><Sparkles className="mr-1 size-3" /> {meta.label}</Badge><span className="text-sm text-white/60">{meta.eyebrow}</span></div><h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{product.name}</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">{meta.intro}</p><div className="mt-6 flex flex-wrap gap-2"><Badge variant="outline" className="border-white/20 text-white/75">{product.skillLevel}</Badge><Badge variant="outline" className="border-white/20 text-white/75">{product.duration}</Badge><Badge variant="outline" className="border-white/20 text-white/75">{meta.outcome}</Badge></div></div></section>
          <div className="mt-6 flex flex-wrap gap-3"><Button type="button" variant="outline" size="sm" onClick={copyLink}><Copy />{copied ? "Package link copied" : "Copy package link"}</Button><Button asChild variant="outline" size="sm"><Link to="/programs/oryn-soundz">Compare packages</Link></Button></div>
          <section className="mt-12"><p className="text-xs uppercase tracking-[0.18em] text-accent">What is inside</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">A practical path, not random lessons.</h2><div className="mt-6 space-y-3">{meta.modules.map(([title, description], index) => <article key={title} className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="flex gap-4"><span className="font-display text-sm font-semibold" style={{ color: meta.accent }}>{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div></div></article>)}</div></section>
          <section className="mt-12 grid gap-8 md:grid-cols-2"><div><h2 className="font-display text-2xl font-semibold">Your outcome</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{meta.outcome}. {product.longDescription}</p></div><div><h2 className="font-display text-2xl font-semibold">You will practise</h2><ul className="mt-3 space-y-3 text-sm text-muted-foreground">{product.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{feature}</li>)}</ul></div></section>
          <section className="mt-12"><h2 className="font-display text-2xl font-semibold">A good fit if…</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.whoItsFor}</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.format}</p>{product.requirements?.length ? <ul className="mt-5 space-y-2 text-sm text-muted-foreground">{product.requirements.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{item}</li>)}</ul> : null}</section>
          <section className="mt-12"><h2 className="font-display text-2xl font-semibold">Questions students ask</h2><Accordion type="single" collapsible className="mt-4">{product.faqs.map((item, index) => <AccordionItem key={item.question} value={`faq-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent>{item.answer}</AccordionContent></AccordionItem>)}</Accordion></section>
        </div>
        <aside className="h-fit lg:sticky lg:top-24"><form onSubmit={startPayment} className="rounded-2xl border border-[#b38a45]/35 bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.06)]"><img src="/products/oryn-soundz-profile.jpg" alt="Oryn Soundz" className="size-14 rounded-full object-cover ring-2 ring-[#d7a947]" /><p className="mt-5 text-xs uppercase tracking-[0.16em] text-accent">{meta.label}</p><h2 className="mt-2 font-display text-2xl font-semibold">Make your payment</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Enter your details, then Paystack will open securely to complete your payment.</p><div className="mt-5 space-y-3"><div className="space-y-1.5"><Label htmlFor="package-name">Full name</Label><Input id="package-name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></div><div className="space-y-1.5"><Label htmlFor="package-email">Email address</Label><Input id="package-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></div><div className="space-y-1.5"><Label htmlFor="package-phone">Phone number <span className="text-muted-foreground">(optional)</span></Label><Input id="package-phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" /></div></div><p className="mt-6 font-display text-3xl font-semibold tabular-nums">{localizedPrice ? formatMoney(localizedPrice.amount, localizedPrice.currency) : "Checking local price…"}</p><p className="mt-2 text-xs text-muted-foreground">{country ? `Price for ${getCountryLabel(country)}` : "Detecting your country"}</p><Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting || !localizedPrice}>{submitting ? "Opening Paystack…" : "Make payment with Paystack"}<ArrowRight /></Button><p className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"><Send className="size-3" /> Secure payment handled by Paystack</p></form></aside>
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">Results depend on your practice, decisions, platforms, audience, and current rules. No streams, followers, approval, verification, reach, or income are guaranteed.</p>
    </main>
  );
}


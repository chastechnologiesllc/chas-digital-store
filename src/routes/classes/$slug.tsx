import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Copy, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getCategory } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { getLocalizedPrice, type PricingCountry } from "@/lib/pricing";
import { getPricingCountryFn, initializePaymentFn } from "@/lib/payments/functions";

export const Route = createFileRoute("/classes/$slug")({
  loader: ({ params }) => {
    if (params.slug === "ai-music-generator") {
      throw redirect({ to: "/programs/oryn-soundz" });
    }
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Class"} · chAs Technologies LLC Digital Store` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: loaderData?.product.name ?? "Class" },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);
  const initialize = useServerFn(initializePaymentFn);
  const [copied, setCopied] = useState(false);
  const [country, setCountry] = useState<PricingCountry | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const localizedPrice = country ? getLocalizedPrice(product, country) : null;

  useEffect(() => { getPricingCountryFn().then(setCountry).catch(() => undefined); }, []);

  async function startPayment(event: FormEvent) {
    event.preventDefault();
    if (!country) { toast.error("Still detecting your country. Please try again in a moment."); return; }
    setSubmitting(true);
    try {
      const result = await initialize({ data: { productId: product.id, name, email, gateway: "paystack", country } });
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to open secure payment.");
      setSubmitting(false);
    }
  }

  const copyClassLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 sm:pb-16 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent">{category?.label ?? product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{product.longDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="outline" size="sm" onClick={copyClassLink}>
              <Copy />
              {copied ? "Class link copied" : "Copy class link"}
            </Button>
            {product.slug === "ai-music-generator" ? (
              <Button asChild variant="outline" size="sm">
                <Link to="/programs/oryn-soundz">View Oryn Soundz packages</Link>
              </Button>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-xl bg-surface">
            <img
              src={product.image}
              alt=""
              className="aspect-[16/9] w-full object-cover outline outline-1 -outline-offset-1 outline-white/10"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{product.skillLevel}</Badge>
            <Badge variant="outline" className="gap-1">
              <Send className="size-3" />
              Online delivery
            </Badge>
            <Badge variant="outline">{product.duration}</Badge>
            <Badge variant="outline">{product.format.split(" ")[0]} format</Badge>
          </div>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">What you will learn</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Who it is for</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.whoItsFor}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Key benefits</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Course format</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.format}</p>
            {product.requirements?.length ? (
              <div className="mt-6">
                <h3 className="text-sm font-medium">Requirements</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  {product.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">FAQ</h2>
            <Accordion type="single" collapsible className="mt-4">
              {product.faqs.map((item, index) => (
                <AccordionItem key={item.question} value={`p-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="hidden lg:block">
          <form id="class-payment-form" onSubmit={startPayment} className="sticky top-24 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
              {localizedPrice ? formatMoney(localizedPrice.amount, localizedPrice.currency) : "Checking local price…"}
            </p>
            <div className="mt-4 space-y-3"><div className="space-y-1.5"><Label htmlFor="class-name">Full name</Label><Input id="class-name" required minLength={2} value={name} onChange={(event) => setName(event.target.value)} /></div><div className="space-y-1.5"><Label htmlFor="class-email">Email address</Label><Input id="class-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></div></div>
            <Separator className="my-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Delivery: Telegram</li>
              <li>Level: {product.skillLevel}</li>
              <li>Instant access after checkout</li>
            </ul>
            <Button type="submit" className="mt-5 w-full" size="lg" disabled={submitting || !localizedPrice}>
              {submitting ? "Opening secure payment…" : "Make payment"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Secure online payment. Access is issued after payment verification.
            </p>
          </form>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold tabular-nums">
            {localizedPrice ? formatMoney(localizedPrice.amount, localizedPrice.currency) : "Checking…"}
          </p>
          <Button type="submit" form="class-payment-form" disabled={submitting || !localizedPrice}>
            {submitting ? "Opening…" : "Make payment"}
          </Button>
        </div>
      </div>
    </main>
  );
}

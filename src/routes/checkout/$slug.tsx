import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getProductBySlug } from "@/data/products";
import { getGatewaysFn, getPricingCountryFn, initializePaymentFn } from "@/lib/payments/functions";
import type { GatewayId, GatewayInfo } from "@/lib/payments/types";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getLocalizedPrice, getCountryLabel, type PricingCountry } from "@/lib/pricing";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Checkout · ${loaderData?.product.name ?? "Class"}` }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { product } = Route.useLoaderData();
  const initialize = useServerFn(initializePaymentFn);
  const loadGateways = useServerFn(getGatewaysFn);
  const loadCountry = useServerFn(getPricingCountryFn);
  const [gateways, setGateways] = useState<GatewayInfo[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gateway, setGateway] = useState<GatewayId>("paystack");
  const [submitting, setSubmitting] = useState(false);
  const [country, setCountry] = useState<PricingCountry | null>(null);

  const localizedPrice = country ? getLocalizedPrice(product, country) : null;

  useEffect(() => {
    loadGateways()
      .then((items) => {
        setGateways(items);
        const first = items.find((item) => item.enabled);
        if (first) setGateway(first.id);
      })
      .catch(() => {
        setGateways([
          { id: "paystack", name: "Paystack", description: "Cards and local methods.", live: false, enabled: true },
          { id: "flutterwave", name: "Flutterwave", description: "Cards and local methods.", live: false, enabled: true },
        ]);
      });
  }, [loadGateways]);

  useEffect(() => {
    loadCountry().then(setCountry).catch(() => undefined);
  }, [loadCountry]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!country) {
      toast.error("Still detecting your country. Please try again in a moment.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await initialize({
        data: {
          productId: product.id,
          name,
          email,
          phone: phone || undefined,
          gateway,
          country,
        },
      });
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start checkout.");
      setSubmitting(false);
    }
  }

  const selected = gateways.find((item) => item.id === gateway);

  return (
    <main id="main" className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form onSubmit={onSubmit} className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Checkout</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Get access</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Enter your details and complete a secure checkout. You will be taken straight to your classroom once payment is confirmed.
        </p>

        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="Recommended for payment receipts"
            />
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium">Payment method</legend>
          <RadioGroup
            className="mt-3 grid gap-3"
            value={gateway}
            onValueChange={(value) => setGateway(value as GatewayId)}
          >
            {gateways.map((item) => (
              <label
                key={item.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg bg-card p-4 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]",
                  gateway === item.id && "shadow-[0_0_0_1px_rgb(122_163_181/0.55)]",
                )}
              >
                <RadioGroupItem value={item.id} className="mt-1" />
                <span>
                  <span className="block text-sm font-medium">Pay with {item.name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
                  {!item.live ? (
                    <span className="mt-2 block text-xs text-accent">Demo mode until provider keys are configured.</span>
                  ) : null}
                </span>
              </label>
            ))}
          </RadioGroup>
        </fieldset>

        <Button type="submit" size="lg" className="mt-8 w-full sm:w-auto" disabled={submitting || !country}>
          {submitting ? "Starting checkout…" : localizedPrice ? `Pay ${formatMoney(localizedPrice.amount, localizedPrice.currency)}` : "Detecting local price…"}
        </Button>
        {selected && !selected.live ? (
          <p className="mt-3 text-xs text-muted-foreground">
            Live {selected.name} keys are not configured, so this checkout uses a demo confirmation step.
          </p>
        ) : null}
      </form>

      <aside className="h-fit rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
        <p className="text-xs text-muted-foreground">Selected class</p>
        <h2 className="mt-1 font-display text-xl font-semibold">{product.name}</h2>
        <img
          src={product.image}
          alt=""
          className="mt-4 aspect-video w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-white/10"
        />
        <p className="mt-4 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-5 font-display text-2xl font-semibold tabular-nums">
          {localizedPrice ? formatMoney(localizedPrice.amount, localizedPrice.currency) : "Checking local price…"}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{country ? `Price for ${getCountryLabel(country)}` : "Detecting your country"}</p>
        <Link to={product.slug === "ai-music-generator" || product.slug.startsWith("oryn-soundz-") ? "/programs/oryn-soundz/$slug" : "/classes/$slug"} params={{ slug: product.slug }} className="mt-4 inline-block text-sm text-accent hover:underline">
          Back to package details
        </Link>
      </aside>
    </main>
  );
}

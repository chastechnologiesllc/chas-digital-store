import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCategory } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { formatMoney } from "@/lib/format";

export const Route = createFileRoute("/classes/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Class"} · chAs Technologies LLC Digital Store` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const category = getCategory(product.category);

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 sm:pb-16 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent">{category?.label ?? product.category}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{product.longDescription}</p>

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
              Telegram delivery
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
          <div className="sticky top-24 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
              {formatMoney(product.price, product.currency)}
            </p>
            <Separator className="my-4" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Delivery: Telegram classroom</li>
              <li>Level: {product.skillLevel}</li>
              <li>Access after verified payment</li>
            </ul>
            <Button asChild className="mt-5 w-full" size="lg">
              <Link to="/checkout/$slug" params={{ slug: product.slug }}>
                Get Access
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              You will complete checkout before any Telegram invite is created.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold tabular-nums">
            {formatMoney(product.price, product.currency)}
          </p>
          <Button asChild>
            <Link to="/checkout/$slug" params={{ slug: product.slug }}>
              Get Access
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

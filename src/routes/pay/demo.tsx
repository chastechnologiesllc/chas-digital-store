import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { completeDemoPaymentFn, getOrderFn } from "@/lib/payments/functions";
import type { PublicOrder } from "@/lib/payments/types";
import { formatMoney, majorFromKobo } from "@/lib/format";
import { toast } from "sonner";

const searchSchema = z.object({
  reference: z.string(),
  gateway: z.string().optional(),
});

export const Route = createFileRoute("/pay/demo")({
  validateSearch: (search) => searchSchema.parse(search),
  component: DemoPayPage,
  head: () => ({ meta: [{ title: "Demo checkout · chAs Technologies LLC Digital Store" }] }),
});

function DemoPayPage() {
  const { reference, gateway } = Route.useSearch();
  const navigate = useNavigate();
  const getOrder = useServerFn(getOrderFn);
  const complete = useServerFn(completeDemoPaymentFn);
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getOrder({ data: { reference } })
      .then(setOrder)
      .catch(() => toast.error("This payment session could not be found."));
  }, [getOrder, reference]);

  async function finish(outcome: "success" | "failed" | "cancelled") {
    setBusy(true);
    try {
      const result = await complete({ data: { reference, outcome } });
      await navigate({ to: "/access/$reference", params: { reference: result.reference } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Demo payment failed.");
      setBusy(false);
    }
  }

  return (
    <main id="main" className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Demo checkout</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">Confirm this payment</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Live {gateway ?? "payment"} keys are not configured yet. This step simulates the provider so you can test the full access flow. Real charges never happen in demo mode.
      </p>
      {order ? (
        <div className="mt-8 rounded-xl bg-card p-5 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
          <p className="text-sm text-muted-foreground">{order.productName}</p>
          <p className="mt-2 font-display text-2xl font-semibold tabular-nums">
            {formatMoney(majorFromKobo(order.amount), order.currency)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Reference {order.reference}</p>
        </div>
      ) : null}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button disabled={busy || !order} onClick={() => finish("success")}>
          Pay successfully
        </Button>
        <Button disabled={busy || !order} variant="outline" onClick={() => finish("failed")}>
          Simulate failure
        </Button>
        <Button disabled={busy || !order} variant="ghost" onClick={() => finish("cancelled")}>
          Cancel
        </Button>
      </div>
    </main>
  );
}

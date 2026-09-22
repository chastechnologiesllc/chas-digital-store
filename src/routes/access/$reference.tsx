import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { verifyPaymentFn } from "@/lib/payments/functions";
import type { PublicOrder } from "@/lib/payments/types";
import { formatMoney, majorFromKobo } from "@/lib/format";

const searchSchema = z.object({
  transaction_id: z.string().optional(),
  status: z.string().optional(),
});

export const Route = createFileRoute("/access/$reference")({
  validateSearch: (search) => searchSchema.parse(search),
  component: AccessPage,
  head: () => ({ meta: [{ title: "Access · chAs Technologies LLC Digital Store" }] }),
});

function AccessPage() {
  const { reference } = Route.useParams();
  const { transaction_id: transactionId } = Route.useSearch();
  const verify = useServerFn(verifyPaymentFn);
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);

  async function runVerify() {
    setBusy(true);
    setError(null);
    try {
      const result = await verify({
        data: { reference, transactionId },
      });
      setOrder(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not be verified.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void runVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, transactionId]);

  const product = order ? getProductById(order.productId) : undefined;

  return (
    <main id="main" className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      {busy && !order ? (
        <div className="flex flex-col items-center text-center">
          <LoaderCircle className="size-8 animate-spin text-accent" />
          <h1 className="mt-4 font-display text-2xl font-semibold">Verifying payment</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access is only issued after the server confirms this transaction.
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl bg-card p-6 text-center shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
          <CircleAlert className="mx-auto size-8 text-destructive" />
          <h1 className="mt-3 font-display text-2xl font-semibold">We could not verify this order</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-6" onClick={() => void runVerify()}>
            Retry verification
          </Button>
        </div>
      ) : null}

      {order?.status === "paid" ? (
        <div className="rounded-xl bg-card p-6 text-center shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
          <CheckCircle2 className="mx-auto size-8 text-success" />
          <h1 className="mt-3 font-display text-2xl font-semibold">Access is ready</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Hi {order.customerName.split(" ")[0]}, your payment for {order.productName} is verified.
          </p>
          <p className="mt-4 font-display text-xl font-semibold tabular-nums">
            {formatMoney(majorFromKobo(order.amount), order.currency)}
          </p>
          {!order.live ? (
            <p className="mt-3 text-xs text-accent">This was a demo payment. Configure live keys before taking real orders.</p>
          ) : null}
          {order.telegramInviteUrl && order.telegramInviteUrl !== "https://t.me/" ? (
            <Button asChild size="lg" className="mt-6">
              <a href={order.telegramInviteUrl} target="_blank" rel="noreferrer">
                <Send />
                Open Telegram classroom
              </a>
            </Button>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              Payment is confirmed. Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CLASS_CHATS to generate a one-time classroom invite automatically. Save this reference for support.
            </p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">Reference {order.reference}</p>
        </div>
      ) : null}

      {order && order.status !== "paid" && !busy ? (
        <div className="rounded-xl bg-card p-6 text-center shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
          <CircleAlert className="mx-auto size-8 text-muted-foreground" />
          <h1 className="mt-3 font-display text-2xl font-semibold">
            {order.status === "cancelled" ? "Checkout was cancelled" : order.status === "failed" ? "Payment did not go through" : "Payment is still pending"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {order.failureReason || "Telegram access is not granted until a successful, verified payment."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => void runVerify()} variant="outline">
              Retry verification
            </Button>
            {product ? (
              <Button asChild>
                <Link to="/checkout/$slug" params={{ slug: product.slug }}>
                  Try again
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}

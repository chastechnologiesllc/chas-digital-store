import { createFileRoute } from "@tanstack/react-router";
import { verifyPayment } from "@/lib/payments/service.server";

export const Route = createFileRoute("/api/payments/flutterwave/verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const reference = url.searchParams.get("tx_ref") || url.searchParams.get("reference");
        const transactionId = url.searchParams.get("transaction_id") || undefined;
        if (!reference) {
          return Response.json({ error: "reference is required." }, { status: 400 });
        }
        try {
          const order = await verifyPayment(reference, { transactionId });
          return Response.json(order);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Verification failed.";
          return Response.json({ error: message }, { status: 400 });
        }
      },
      POST: async ({ request }) => {
        const body = (await request.json()) as { reference?: string; transactionId?: string };
        if (!body.reference) {
          return Response.json({ error: "reference is required." }, { status: 400 });
        }
        try {
          const order = await verifyPayment(body.reference, { transactionId: body.transactionId });
          return Response.json(order);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Verification failed.";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});

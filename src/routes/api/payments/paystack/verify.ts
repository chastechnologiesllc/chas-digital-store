import { createFileRoute } from "@tanstack/react-router";
import { verifyPayment } from "@/lib/payments/service.server";

export const Route = createFileRoute("/api/payments/paystack/verify")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const reference = url.searchParams.get("reference");
        if (!reference) {
          return Response.json({ error: "reference is required." }, { status: 400 });
        }
        try {
          const order = await verifyPayment(reference);
          return Response.json(order);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Verification failed.";
          return Response.json({ error: message }, { status: 400 });
        }
      },
      POST: async ({ request }) => {
        const body = (await request.json()) as { reference?: string };
        if (!body.reference) {
          return Response.json({ error: "reference is required." }, { status: 400 });
        }
        try {
          const order = await verifyPayment(body.reference);
          return Response.json(order);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Verification failed.";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});

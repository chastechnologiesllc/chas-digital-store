import { createFileRoute } from "@tanstack/react-router";
import { handleGatewayWebhook } from "@/lib/payments/service.server";
import { verifyPaystackSignature } from "@/lib/payments/paystack.server";

export const Route = createFileRoute("/api/payments/paystack/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-paystack-signature");
        if (!verifyPaystackSignature(raw, signature)) {
          return Response.json({ error: "Invalid signature." }, { status: 401 });
        }
        try {
          const payload = JSON.parse(raw) as {
            event?: string;
            data?: { reference?: string };
          };
          const reference = payload.data?.reference;
          if (reference && payload.event === "charge.success") {
            await handleGatewayWebhook("paystack", reference);
          }
          return Response.json({ received: true });
        } catch {
          return Response.json({ received: true });
        }
      },
    },
  },
});

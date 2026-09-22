import { createFileRoute } from "@tanstack/react-router";
import { handleGatewayWebhook } from "@/lib/payments/service.server";
import { verifyFlutterwaveSignature } from "@/lib/payments/flutterwave.server";

export const Route = createFileRoute("/api/payments/flutterwave/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature =
          request.headers.get("verif-hash") || request.headers.get("flutterwave-signature");
        if (!verifyFlutterwaveSignature(signature)) {
          return Response.json({ error: "Invalid signature." }, { status: 401 });
        }
        try {
          const payload = (await request.json()) as {
            event?: string;
            data?: { tx_ref?: string; id?: number; status?: string };
          };
          const reference = payload.data?.tx_ref;
          if (reference && payload.data?.status === "successful") {
            await handleGatewayWebhook("flutterwave", reference, {
              transactionId: payload.data.id ? String(payload.data.id) : undefined,
            });
          }
          return Response.json({ received: true });
        } catch {
          return Response.json({ received: true });
        }
      },
    },
  },
});

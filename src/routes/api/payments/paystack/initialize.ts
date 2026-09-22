import { createFileRoute } from "@tanstack/react-router";
import { initializePayment } from "@/lib/payments/service.server";

export const Route = createFileRoute("/api/payments/paystack/initialize")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            productId?: string;
            email?: string;
            name?: string;
            phone?: string;
          };
          if (!body.productId || !body.email || !body.name) {
            return Response.json({ error: "productId, name, and email are required." }, { status: 400 });
          }
          const result = await initializePayment(
            {
              productId: body.productId,
              email: body.email,
              name: body.name,
              phone: body.phone,
              gateway: "paystack",
            },
            request.url,
          );
          return Response.json(result);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to start payment.";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});

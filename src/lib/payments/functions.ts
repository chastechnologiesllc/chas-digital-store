import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { listGateways } from "./config.server";
import { getOrderByReference, toPublicOrder } from "./orders.server";
import { completeDemoPayment, initializePayment, verifyPayment } from "./service.server";
import { getRequest } from "@tanstack/react-start/server";
import { getPricingCountryFromHeaders } from "@/lib/pricing";

export const getPricingCountryFn = createServerFn({ method: "GET" }).handler(async () => {
  return getPricingCountryFromHeaders(getRequest().headers);
});

export const getGatewaysFn = createServerFn({ method: "GET" }).handler(async () => {
  return listGateways();
});

export const initializePaymentFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      productId: z.string().min(1),
      name: z.string().min(2).max(80),
      email: z.string().email(),
      phone: z.string().max(20).optional(),
      gateway: z.enum(["paystack", "flutterwave"]),
      country: z.enum(["NG", "US"]).optional(),
    }),
  )
  .handler(async ({ data }) => {
    return initializePayment(data);
  });

export const verifyPaymentFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      reference: z.string().min(4),
      transactionId: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    return verifyPayment(data.reference, { transactionId: data.transactionId });
  });

export const getOrderFn = createServerFn({ method: "GET" })
  .validator(z.object({ reference: z.string().min(4) }))
  .handler(async ({ data }) => {
    const order = await getOrderByReference(data.reference);
    if (!order) throw new Error("Order not found.");
    return toPublicOrder(order);
  });

export const completeDemoPaymentFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      reference: z.string().min(4),
      outcome: z.enum(["success", "failed", "cancelled"]),
    }),
  )
  .handler(async ({ data }) => {
    return completeDemoPayment(data.reference, data.outcome);
  });

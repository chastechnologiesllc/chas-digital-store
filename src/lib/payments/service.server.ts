import { getProductById } from "@/data/products";
import { koboFromMajor } from "@/lib/format";
import {
  createPendingOrder,
  getOrderByReference,
  markOrderStatus,
  recordPaymentEvent,
  toPublicOrder,
} from "./orders.server";
import { generateTelegramAccess } from "./telegram.server";
import { getPublicOrigin, isGatewayLive } from "./config.server";
import { initializePaystack, verifyPaystack } from "./paystack.server";
import { initializeFlutterwave, verifyFlutterwave } from "./flutterwave.server";
import type {
  GatewayId,
  InitializeInput,
  InitializeResult,
  PublicOrder,
  VerificationResult,
} from "./types";

export async function initializePayment(
  input: InitializeInput,
  requestUrl?: string,
): Promise<InitializeResult> {
  const product = getProductById(input.productId);
  if (!product) {
    throw new Error("This class is not available.");
  }
  if (!product.active) {
    throw new Error("This class is not currently for sale.");
  }
  if (product.price <= 0) {
    throw new Error("This class does not have a valid price.");
  }

  const live = isGatewayLive(input.gateway);
  const order = await createPendingOrder({
    productId: product.id,
    productName: product.name,
    customerName: input.name.trim(),
    customerEmail: input.email.trim().toLowerCase(),
    customerPhone: input.phone?.trim() || undefined,
    amount: koboFromMajor(product.price),
    currency: product.currency,
    gateway: input.gateway,
    live,
  });

  const origin = getPublicOrigin(requestUrl);
  const checkout =
    input.gateway === "paystack"
      ? await initializePaystack(order, origin)
      : await initializeFlutterwave(order, origin);

  await recordPaymentEvent(order.id, input.gateway, "initialized");
  return { reference: order.reference, checkoutUrl: checkout.checkoutUrl, live };
}

async function applyVerification(reference: string, result: VerificationResult, gatewayRef?: string) {
  const order = await getOrderByReference(reference);
  if (!order) return null;
  if (order.status === "paid") {
    if (order.telegramAccessStatus !== "generated") {
      await generateTelegramAccess(order);
    }
    return getOrderByReference(reference);
  }

  if (result.ok) {
    const paid = await markOrderStatus(reference, {
      status: "paid",
      gatewayReference: gatewayRef ?? order.gatewayReference,
      paidAt: new Date().toISOString(),
      failureReason: null,
    });
    if (paid) {
      await recordPaymentEvent(paid.id, paid.gateway, "paid");
      await generateTelegramAccess(paid);
    }
    return getOrderByReference(reference);
  }

  if (result.status === "failed" || result.status === "cancelled") {
    await markOrderStatus(reference, {
      status: result.status,
      failureReason: result.reason ?? result.status,
      gatewayReference: gatewayRef ?? order.gatewayReference,
    });
    await recordPaymentEvent(order.id, order.gateway, result.status);
  }

  return getOrderByReference(reference);
}

export async function verifyPayment(
  reference: string,
  extra?: { transactionId?: string },
): Promise<PublicOrder> {
  const order = await getOrderByReference(reference);
  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status === "paid") {
    if (order.telegramAccessStatus !== "generated") {
      await generateTelegramAccess(order);
    }
    const latest = await getOrderByReference(reference);
    return toPublicOrder(latest ?? order);
  }

  if (!order.live) {
    return toPublicOrder(order);
  }

  const result =
    order.gateway === "paystack"
      ? await verifyPaystack(reference, order)
      : await verifyFlutterwave(reference, order, extra?.transactionId);

  const updated = await applyVerification(reference, result);
  return toPublicOrder(updated ?? order);
}

export async function completeDemoPayment(
  reference: string,
  outcome: "success" | "failed" | "cancelled",
): Promise<PublicOrder> {
  const order = await getOrderByReference(reference);
  if (!order) throw new Error("Order not found.");
  if (order.live) throw new Error("Live payments cannot be completed in demo mode.");
  if (order.status === "paid") return toPublicOrder(order);

  if (outcome === "success") {
    const paid = await markOrderStatus(reference, {
      status: "paid",
      paidAt: new Date().toISOString(),
      failureReason: null,
      gatewayReference: `demo_${reference}`,
    });
    if (paid) {
      await recordPaymentEvent(paid.id, paid.gateway, "demo_paid");
      await generateTelegramAccess(paid);
    }
  } else {
    await markOrderStatus(reference, {
      status: outcome === "cancelled" ? "cancelled" : "failed",
      failureReason: outcome === "cancelled" ? "Demo checkout cancelled." : "Demo payment failed.",
    });
    await recordPaymentEvent(order.id, order.gateway, `demo_${outcome}`);
  }

  const latest = await getOrderByReference(reference);
  if (!latest) throw new Error("Order not found.");
  return toPublicOrder(latest);
}

export async function handleGatewayWebhook(
  gateway: GatewayId,
  reference: string,
  extra?: { transactionId?: string },
): Promise<void> {
  const order = await getOrderByReference(reference);
  if (!order) return;
  if (order.status === "paid") return;
  if (!order.live) return;

  const result =
    gateway === "paystack"
      ? await verifyPaystack(reference, order)
      : await verifyFlutterwave(reference, order, extra?.transactionId);

  await applyVerification(reference, result, extra?.transactionId);
}

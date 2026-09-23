import { createHmac } from "node:crypto";
import { getPaystackSecret } from "./config.server";
import type { Order, VerificationResult } from "./types";

type PaystackInitResponse = {
  status: boolean;
  message: string;
  data?: { authorization_url: string; reference: string };
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    id: number;
  };
};

export async function initializePaystack(
  order: Order,
  origin: string,
): Promise<{ checkoutUrl: string }> {
  const secret = getPaystackSecret();
  if (!secret) {
    throw new Error("Paystack is not configured. Add PAYSTACK_SECRET_KEY in Vercel before accepting payments.");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: order.customerEmail,
      amount: order.amount,
      currency: order.currency,
      reference: order.reference,
      callback_url: `${origin}/access/${encodeURIComponent(order.reference)}`,
      metadata: {
        orderId: order.id,
        productId: order.productId,
        customerName: order.customerName,
      },
    }),
  });

  const json = (await response.json()) as PaystackInitResponse;
  if (!response.ok || !json.status || !json.data?.authorization_url) {
    throw new Error(json.message || "Paystack could not start this payment.");
  }
  return { checkoutUrl: json.data.authorization_url };
}

export async function verifyPaystack(reference: string, order: Order): Promise<VerificationResult> {
  const secret = getPaystackSecret();
  if (!secret) {
    return { ok: false, status: "pending", reason: "Paystack is not configured." };
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secret}` } },
  );
  const json = (await response.json()) as PaystackVerifyResponse;
  if (!response.ok || !json.status || !json.data) {
    return { ok: false, status: "pending", reason: json.message || "Verification failed." };
  }

  const amountMatch = Number(json.data.amount) === order.amount;
  const currencyMatch = json.data.currency?.toUpperCase() === order.currency.toUpperCase();
  const paid = json.data.status === "success";

  if (json.data.status === "abandoned") {
    return { ok: false, status: "cancelled", reason: "Checkout was abandoned.", gatewayStatus: json.data.status };
  }
  if (json.data.status === "failed") {
    return { ok: false, status: "failed", reason: "Payment failed.", gatewayStatus: json.data.status };
  }
  if (!paid) {
    return { ok: false, status: "pending", reason: "Payment is not complete yet.", gatewayStatus: json.data.status };
  }
  if (!amountMatch) {
    return { ok: false, status: "failed", reason: "Amount mismatch.", amountMatch, currencyMatch, gatewayStatus: json.data.status };
  }
  if (!currencyMatch) {
    return { ok: false, status: "failed", reason: "Currency mismatch.", amountMatch, currencyMatch, gatewayStatus: json.data.status };
  }

  return {
    ok: true,
    status: "paid",
    amountMatch,
    currencyMatch,
    gatewayStatus: json.data.status,
  };
}

export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  const secret = getPaystackSecret();
  if (!secret || !signature) return false;
  const hash = createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash === signature;
}

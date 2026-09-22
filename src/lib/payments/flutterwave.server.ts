import { env } from "@/lib/env.server";
import { getFlutterwaveSecret } from "./config.server";
import { majorFromKobo } from "@/lib/format";
import type { Order, VerificationResult } from "./types";

type FlutterwaveInitResponse = {
  status: string;
  message: string;
  data?: { link: string };
};

type FlutterwaveVerifyResponse = {
  status: string;
  message: string;
  data?: {
    id: number;
    tx_ref: string;
    amount: number;
    currency: string;
    status: string;
  };
};

export async function initializeFlutterwave(
  order: Order,
  origin: string,
): Promise<{ checkoutUrl: string }> {
  const secret = getFlutterwaveSecret();
  if (!secret) {
    return {
      checkoutUrl: `${origin}/pay/demo?reference=${encodeURIComponent(order.reference)}&gateway=flutterwave`,
    };
  }

  const response = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: order.reference,
      amount: majorFromKobo(order.amount),
      currency: order.currency,
      redirect_url: `${origin}/access/${encodeURIComponent(order.reference)}`,
      customer: {
        email: order.customerEmail,
        name: order.customerName,
        phonenumber: order.customerPhone || undefined,
      },
      customizations: {
        title: "chAs Technologies LLC Digital Store",
        description: order.productName,
      },
      meta: {
        orderId: order.id,
        productId: order.productId,
      },
    }),
  });

  const json = (await response.json()) as FlutterwaveInitResponse;
  if (!response.ok || json.status !== "success" || !json.data?.link) {
    throw new Error(json.message || "Flutterwave could not start this payment.");
  }
  return { checkoutUrl: json.data.link };
}

export async function verifyFlutterwave(
  reference: string,
  order: Order,
  transactionId?: string,
): Promise<VerificationResult> {
  const secret = getFlutterwaveSecret();
  if (!secret) {
    return { ok: false, status: "pending", reason: "Flutterwave is not configured." };
  }

  const url = transactionId
    ? `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`
    : `https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${encodeURIComponent(reference)}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const json = (await response.json()) as FlutterwaveVerifyResponse;
  if (!response.ok || json.status !== "success" || !json.data) {
    return { ok: false, status: "pending", reason: json.message || "Verification failed." };
  }

  const expected = majorFromKobo(order.amount);
  const amountMatch = Math.abs(Number(json.data.amount) - expected) < 0.01;
  const currencyMatch = json.data.currency?.toUpperCase() === order.currency.toUpperCase();
  const paid = json.data.status === "successful";

  if (json.data.status === "cancelled") {
    return { ok: false, status: "cancelled", reason: "Payment was cancelled.", gatewayStatus: json.data.status };
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

  return { ok: true, status: "paid", amountMatch, currencyMatch, gatewayStatus: json.data.status };
}

export function verifyFlutterwaveSignature(signature: string | null): boolean {
  const hash = env("FLUTTERWAVE_WEBHOOK_HASH") || env("FLUTTERWAVE_SECRET_HASH");
  if (!hash || !signature) return false;
  return hash === signature;
}

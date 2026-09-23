import { env } from "@/lib/env.server";
import { getRequest } from "@tanstack/react-start/server";
import type { GatewayId, GatewayInfo } from "./types";

export function getPaystackSecret(): string | undefined {
  return env("PAYSTACK_SECRET_KEY");
}

export function getTelegramBotToken(): string | undefined {
  return env("TELEGRAM_BOT_TOKEN");
}

export function isGatewayLive(gateway: GatewayId): boolean {
  return gateway === "paystack" && Boolean(getPaystackSecret());
}

export function listGateways(): GatewayInfo[] {
  return [
    {
      id: "paystack",
      name: "Paystack",
      description: "Cards, bank transfer, USSD, and local methods.",
      live: isGatewayLive("paystack"),
      enabled: true,
    },
  ];
}

export function getPublicOrigin(requestUrl?: string): string {
  const configured = env("APP_URL") || env("SITE_URL");
  if (configured) return configured.replace(/\/$/, "");

  try {
    const request = getRequest();
    const url = new URL(request.url);
    const host = request.headers.get("x-forwarded-host") || url.host;
    const proto = (request.headers.get("x-forwarded-proto") || url.protocol.replace(":", "")).replace(/:$/, "");
    return `${proto}://${host}`;
  } catch {
    if (requestUrl) {
      try {
        const url = new URL(requestUrl);
        return `${url.protocol}//${url.host}`;
      } catch {
        /* fall through */
      }
    }
  }

  return "http://127.0.0.1:8080";
}

export function parseTelegramChats(): Record<string, string> {
  const raw = env("TELEGRAM_CLASS_CHATS");
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

import { getProductById } from "@/data/products";
import { getTelegramBotToken, parseTelegramChats } from "./config.server";
import { saveTelegramAccess } from "./orders.server";
import type { Order } from "./types";

type TelegramInviteResponse = {
  ok: boolean;
  description?: string;
  result?: { invite_link: string };
};

export async function generateTelegramAccess(order: Order): Promise<string | null> {
  if (order.status !== "paid") return null;
  if (order.telegramInviteUrl) return order.telegramInviteUrl;

  const product = getProductById(order.productId);
  const chats = parseTelegramChats();
  const chatId = chats[order.productId] || chats[product?.telegramAccessId ?? ""] || product?.telegramAccessId;
  const token = getTelegramBotToken();

  if (!token || !chatId || !/^-?\d+/.test(chatId)) {
    const demoUrl = `https://t.me/`;
    await saveTelegramAccess(order.reference, "generated", demoUrl);
    return demoUrl;
  }

  try {
    const expire = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
    const response = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        name: `${order.productName} · ${order.reference}`,
        expire_date: expire,
        member_limit: 1,
      }),
    });
    const json = (await response.json()) as TelegramInviteResponse;
    if (!json.ok || !json.result?.invite_link) {
      await saveTelegramAccess(order.reference, "failed", null);
      return null;
    }
    await saveTelegramAccess(order.reference, "generated", json.result.invite_link);
    return json.result.invite_link;
  } catch {
    await saveTelegramAccess(order.reference, "failed", null);
    return null;
  }
}

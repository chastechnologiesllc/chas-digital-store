import { randomBytes, randomUUID } from "node:crypto";
import { getSql } from "@/lib/db";
import type { Order, OrderStatus, PublicOrder, TelegramAccessStatus } from "./types";

type OrderRow = {
  id: string;
  reference: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  amount: number;
  currency: string;
  gateway: string;
  status: string;
  live: boolean;
  telegram_access_status: string;
  telegram_invite_url: string | null;
  gateway_reference: string | null;
  failure_reason: string | null;
  created_at: string;
  paid_at: string | null;
  updated_at: string;
};

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1;
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    reference: row.reference,
    productId: row.product_id,
    productName: row.product_name,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    amount: Number(row.amount),
    currency: row.currency,
    gateway: row.gateway as Order["gateway"],
    status: row.status as OrderStatus,
    live: asBool(row.live),
    telegramAccessStatus: row.telegram_access_status as TelegramAccessStatus,
    telegramInviteUrl: row.telegram_invite_url,
    gatewayReference: row.gateway_reference,
    failureReason: row.failure_reason,
    createdAt: row.created_at,
    paidAt: row.paid_at,
    updatedAt: row.updated_at,
  };
}

export function toPublicOrder(order: Order): PublicOrder {
  return {
    reference: order.reference,
    productId: order.productId,
    productName: order.productName,
    customerName: order.customerName,
    amount: order.amount,
    currency: order.currency,
    gateway: order.gateway,
    status: order.status,
    live: order.live,
    telegramAccessStatus: order.telegramAccessStatus,
    telegramInviteUrl: order.status === "paid" ? order.telegramInviteUrl : null,
    failureReason: order.failureReason,
  };
}

export function newReference(): string {
  return `chas_${Date.now().toString(36)}_${randomBytes(8).toString("hex")}`;
}

export async function createPendingOrder(input: {
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  currency: string;
  gateway: Order["gateway"];
  live: boolean;
}): Promise<Order> {
  const sql = await getSql();
  const id = randomUUID();
  const reference = newReference();
  const rows = await sql<OrderRow>`
    insert into orders (
      id, reference, product_id, product_name, customer_name, customer_email,
      customer_phone, amount, currency, gateway, status, live
    ) values (
      ${id}, ${reference}, ${input.productId}, ${input.productName}, ${input.customerName},
      ${input.customerEmail}, ${input.customerPhone ?? null}, ${input.amount}, ${input.currency},
      ${input.gateway}, ${"pending"}, ${input.live}
    )
    returning *
  `;
  return mapOrder(rows[0]);
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  const sql = await getSql();
  const rows = await sql<OrderRow>`select * from orders where reference = ${reference} limit 1`;
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function recordPaymentEvent(orderId: string, gateway: string, eventType: string) {
  const sql = await getSql();
  await sql`
    insert into payment_events (id, order_id, gateway, event_type)
    values (${randomUUID()}, ${orderId}, ${gateway}, ${eventType})
  `;
}

export async function markOrderStatus(
  reference: string,
  patch: {
    status: OrderStatus;
    gatewayReference?: string | null;
    failureReason?: string | null;
    paidAt?: string | null;
    telegramAccessStatus?: TelegramAccessStatus;
    telegramInviteUrl?: string | null;
  },
): Promise<Order | null> {
  const sql = await getSql();
  const rows = await sql<OrderRow>`
    update orders set
      status = ${patch.status},
      gateway_reference = coalesce(${patch.gatewayReference ?? null}, gateway_reference),
      failure_reason = ${patch.failureReason ?? null},
      paid_at = coalesce(${patch.paidAt ?? null}, paid_at),
      telegram_access_status = coalesce(${patch.telegramAccessStatus ?? null}, telegram_access_status),
      telegram_invite_url = coalesce(${patch.telegramInviteUrl ?? null}, telegram_invite_url),
      updated_at = now()
    where reference = ${reference}
    returning *
  `;
  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function saveTelegramAccess(
  reference: string,
  status: TelegramAccessStatus,
  url: string | null,
): Promise<void> {
  const sql = await getSql();
  await sql`
    update orders set
      telegram_access_status = ${status},
      telegram_invite_url = ${url},
      updated_at = now()
    where reference = ${reference}
  `;
}

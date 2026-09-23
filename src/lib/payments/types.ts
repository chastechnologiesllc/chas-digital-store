export type GatewayId = "paystack" | "flutterwave";
export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";
export type TelegramAccessStatus = "not_generated" | "generated" | "failed";

export type Order = {
  id: string;
  reference: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  amount: number;
  currency: string;
  gateway: GatewayId;
  status: OrderStatus;
  live: boolean;
  telegramAccessStatus: TelegramAccessStatus;
  telegramInviteUrl: string | null;
  gatewayReference: string | null;
  failureReason: string | null;
  createdAt: string;
  paidAt: string | null;
  updatedAt: string;
};

export type PublicOrder = {
  reference: string;
  productId: string;
  productName: string;
  customerName: string;
  amount: number;
  currency: string;
  gateway: GatewayId;
  status: OrderStatus;
  live: boolean;
  telegramAccessStatus: TelegramAccessStatus;
  telegramInviteUrl: string | null;
  failureReason: string | null;
};

export type GatewayInfo = {
  id: GatewayId;
  name: string;
  description: string;
  live: boolean;
  enabled: boolean;
};

export type InitializeInput = {
  productId: string;
  name: string;
  email: string;
  phone?: string;
  gateway: GatewayId;
  country?: "NG" | "US";
};

export type InitializeResult = {
  reference: string;
  checkoutUrl: string;
  live: boolean;
};

export type VerificationResult = {
  ok: boolean;
  status: OrderStatus;
  reason?: string;
  amountMatch?: boolean;
  currencyMatch?: boolean;
  gatewayStatus?: string;
};

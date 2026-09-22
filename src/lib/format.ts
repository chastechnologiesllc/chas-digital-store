export function formatMoney(amount: number, currency = "NGN"): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-NG")}`;
  }
}

export function koboFromMajor(amount: number): number {
  return Math.round(amount * 100);
}

export function majorFromKobo(kobo: number): number {
  return kobo / 100;
}

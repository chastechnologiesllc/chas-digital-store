import type { Product } from "@/data/products";

export type PricingCountry = "NG" | "US";

type LocalPrice = { amount: number; currency: "NGN" | "USD" };

const packagePrices: Record<string, Record<PricingCountry, LocalPrice>> = {
  "ai-music-generator": {
    NG: { amount: 5000, currency: "NGN" },
    US: { amount: 20, currency: "USD" },
  },
  "oryn-soundz-artist-release": {
    NG: { amount: 10000, currency: "NGN" },
    US: { amount: 50, currency: "USD" },
  },
  "oryn-soundz-business-coaching": {
    NG: { amount: 15000, currency: "NGN" },
    US: { amount: 75, currency: "USD" },
  },
};

export function normalizePricingCountry(value: string | null | undefined): PricingCountry {
  return value?.toUpperCase() === "US" ? "US" : "NG";
}

export function getPricingCountryFromHeaders(headers: Headers): PricingCountry {
  return normalizePricingCountry(
    headers.get("x-vercel-ip-country") ??
      headers.get("x-country-code") ??
      headers.get("cf-ipcountry"),
  );
}

export function getLocalizedPrice(product: Product, country: PricingCountry): LocalPrice {
  return packagePrices[product.slug]?.[country] ?? { amount: product.price, currency: product.currency as "NGN" | "USD" };
}

export function getCountryLabel(country: PricingCountry): string {
  return country === "US" ? "United States" : "Nigeria";
}

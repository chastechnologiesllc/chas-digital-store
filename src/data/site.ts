/**
 * Editable store configuration.
 * Replace any value wrapped in [BRACKETS] with real company details
 * before going live. Do not invent founder or company history here.
 */
export const site = {
  companyName: "chAs Technologies LLC",
  storeName: "chAs Technologies LLC Digital Store",
  shortName: "chAs",
  tagline: "Learn. Build. Create. Earn with AI.",
  description:
    "Practical digital classes designed to help you understand today's AI tools, digital opportunities, and modern online business systems.",
  locale: "en-NG",
  defaultCurrency: "NGN",
  defaultCountry: "NG",
  /** Production URL — update before launch. Used for OG / canonical tags. */
  url: "https://your-domain.example",
  contact: {
    email: "[COMPANY_EMAIL]",
    phone: "[COMPANY_PHONE]",
    whatsapp: "[COMPANY_WHATSAPP]",
    telegram: "[COMPANY_TELEGRAM]",
    address: "[COMPANY_ADDRESS]",
    hours: "[SUPPORT_HOURS]",
  },
  social: {
    x: "[COMPANY_X_URL]",
    instagram: "[COMPANY_INSTAGRAM_URL]",
    linkedin: "[COMPANY_LINKEDIN_URL]",
    youtube: "[COMPANY_YOUTUBE_URL]",
  },
} as const;

export function isPlaceholder(value: string): boolean {
  return value.startsWith("[") && value.endsWith("]");
}

export function displayContact(value: string, fallback: string): string {
  return isPlaceholder(value) ? fallback : value;
}

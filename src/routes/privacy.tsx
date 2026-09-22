import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy · chAs Technologies LLC Digital Store" }] }),
});

function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This is a placeholder privacy notice for {site.companyName}. Replace [PRIVACY_POLICY] with the legal text that will apply once the store is live.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Checkout collects name, email, and optional phone so a payment can be created and Telegram access can be issued after verification. Payment card details are entered on Paystack or Flutterwave, not on this website.
        </p>
        <p>[PRIVACY_POLICY]</p>
      </div>
    </main>
  );
}

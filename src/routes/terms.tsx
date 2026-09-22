import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({ meta: [{ title: "Terms · chAs Technologies LLC Digital Store" }] }),
});

function TermsPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Placeholder terms of sale for {site.storeName}. Replace [TERMS_OF_SALE] and [REFUND_POLICY] before accepting live payments.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Digital classes are delivered through Telegram after a payment is verified on the server. Access is not granted from a client-side success message alone.
        </p>
        <p>[TERMS_OF_SALE]</p>
        <p>[REFUND_POLICY]</p>
      </div>
    </main>
  );
}

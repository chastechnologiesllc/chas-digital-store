import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy · chAs Technologies LLC Digital Store" }] }),
});

function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy Notice</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().getFullYear()} · {site.companyName}
      </p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-medium text-foreground">What we collect</h2>
          <p className="mt-2">
            When you purchase a class, we collect your name, email address, and optionally your phone number. This information is used to process your order and deliver your classroom access.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Payment information</h2>
          <p className="mt-2">
            Card details and bank information are entered directly on Paystack or Flutterwave — not on this website. We do not store or handle your payment credentials.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">How we use your data</h2>
          <p className="mt-2">
            Your contact details are used only to process your purchase and provide support. We do not sell or share your personal information with third parties outside of payment processing.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Contact</h2>
          <p className="mt-2">
            For any privacy-related questions, reach us via the Contact page.
          </p>
        </section>
      </div>
    </main>
  );
}

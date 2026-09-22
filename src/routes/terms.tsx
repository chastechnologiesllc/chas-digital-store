import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({ meta: [{ title: "Terms · chAs Technologies LLC Digital Store" }] }),
});

function TermsPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms of Sale</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().getFullYear()} · {site.companyName}
      </p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-medium text-foreground">Digital products</h2>
          <p className="mt-2">
            All purchases on {site.storeName} are for digital educational products. Access is delivered after payment is confirmed. By completing a purchase you acknowledge the digital nature of the product.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Refunds</h2>
          <p className="mt-2">
            Due to the immediate digital delivery of our classes, all sales are final unless otherwise stated at the time of purchase. If you experience a technical issue accessing your class, contact us and we will resolve it promptly.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Access</h2>
          <p className="mt-2">
            Classroom access is personal and non-transferable. Sharing access links or credentials with others is not permitted and may result in removal from the classroom.
          </p>
        </section>
        <section>
          <h2 className="font-medium text-foreground">Contact</h2>
          <p className="mt-2">
            For any questions about these terms or a specific order, reach us via the Contact page.
          </p>
        </section>
      </div>
    </main>
  );
}

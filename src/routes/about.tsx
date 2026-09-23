import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { isPlaceholder, site } from "@/data/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · chAs Technologies LLC Digital Store" },
      { name: "description", content: "About the chAs Technologies LLC Digital Store." },
    ],
  }),
});

function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">About</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">{site.companyName}</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{site.description}</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {site.storeName} is a catalog of practical digital classes focused on AI, digital tools, online business, and modern technology. Every class is designed to be immediately actionable — you learn by doing, not just watching.
        </p>
        <p>
          Current classes cover AI video, AI music, AI apps and websites, PDF product businesses, and online survey opportunities. New classes are added regularly as the catalog grows.
        </p>
      </div>
      <dl className="mt-10 grid gap-4 rounded-xl bg-card p-5 text-sm shadow-[0_0_0_1px_rgb(238_241_244/0.08)] sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Legal name</dt>
          <dd className="mt-1">{site.companyName}</dd>
        </div>
        {!isPlaceholder(site.contact.address) && (
          <div>
            <dt className="text-muted-foreground">Address</dt>
            <dd className="mt-1">{site.contact.address}</dd>
          </div>
        )}
        {!isPlaceholder(site.contact.email) && (
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-1">{site.contact.email}</dd>
          </div>
        )}
        {!isPlaceholder(site.contact.hours) && (
          <div>
            <dt className="text-muted-foreground">Hours</dt>
            <dd className="mt-1">{site.contact.hours}</dd>
          </div>
        )}
      </dl>
      <Button asChild className="mt-8">
        <Link to="/classes">Explore Classes</Link>
      </Button>
    </main>
  );
}

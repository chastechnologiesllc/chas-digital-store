import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { displayContact, isPlaceholder, site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · chAs Technologies LLC Digital Store" },
      { name: "description", content: "Contact chAs Technologies LLC Digital Store." },
    ],
  }),
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (isPlaceholder(site.contact.email)) {
      toast.message("Support email is still a placeholder.", {
        description: "Replace [COMPANY_EMAIL] in the site configuration, then this form can open a real message.",
      });
      return;
    }
    const subject = encodeURIComponent(`Store enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <main id="main" className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Talk to the store</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Use this page for class and payment questions. Live contact values live in the site configuration so they can be filled in without a rebuild.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="mt-1">{displayContact(site.contact.email, "[COMPANY_EMAIL]")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="mt-1">{displayContact(site.contact.phone, "[COMPANY_PHONE]")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Telegram</dt>
            <dd className="mt-1">{displayContact(site.contact.telegram, "[COMPANY_TELEGRAM]")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">WhatsApp</dt>
            <dd className="mt-1">{displayContact(site.contact.whatsapp, "[COMPANY_WHATSAPP]")}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Hours</dt>
            <dd className="mt-1">{displayContact(site.contact.hours, "[SUPPORT_HOURS]")}</dd>
          </div>
        </dl>
      </div>
      <form onSubmit={onSubmit} className="rounded-xl bg-card p-6 shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" required value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <Button type="submit">Send message</Button>
        </div>
      </form>
    </main>
  );
}

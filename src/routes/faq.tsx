import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE_FAQS } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ · chAs Technologies LLC Digital Store" },
      { name: "description", content: "Frequently asked questions about classes, payments, and Telegram access." },
    ],
  }),
});

function FaqPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">FAQ</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Questions, answered</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Payments, Telegram delivery, and how new classes are added.
      </p>
      <Accordion type="single" collapsible className="mt-10">
        {SITE_FAQS.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-base">{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/content";

import { renderText } from "./Placeholder";

/** shadcn Accordion with `line` dividers. Visible text — no FAQ schema. */
export function FAQ({ faqs, idPrefix = "faq" }: { faqs: Faq[]; idPrefix?: string }) {
  return (
    <Accordion type="single" collapsible className="measure border-t border-line">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={`${idPrefix}-${i}`}
          value={`${idPrefix}-${i}`}
          className="border-b border-line"
        >
          <AccordionTrigger className="min-h-11 py-4 font-display text-[1.0625rem] leading-[1.4] font-semibold text-ink no-underline hover:no-underline **:data-[slot=accordion-trigger-icon]:text-orange-500">
            {renderText(faq.q)}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[0.9375rem] leading-[1.62] text-body">
            {renderText(faq.a)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

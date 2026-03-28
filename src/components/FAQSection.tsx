import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Windows SmartScreen says MAX is \"unrecognized.\" Is it a virus?",
    a: "No! We're students and can't afford a $300+ code-signing certificate yet. Click \"More info\" → \"Run anyway\". This happens only once. MAX is 100% offline and collects zero data.",
  },
  {
    q: "Why is my antivirus flagging MAX?",
    a: "MAX hooks into Windows APIs to do cool things (fetch system health, kill tasks, manage windows). Some antiviruses incorrectly flag these as suspicious. You can safely add MAX to your exclusion list.",
  },
  {
    q: "How do I completely uninstall MAX?",
    a: "Right-click MAX → Quit. Delete the .exe file. Optionally delete %APPDATA%\\ProjectMAX for config/log files. That's it — no registry mess.",
  },
  {
    q: "Does MAX support Mac or Linux?",
    a: "Not yet. MAX uses Windows-specific APIs for window manipulation and system monitoring. Porting would require a near-complete rewrite of his core engine.",
  },
  {
    q: "He seems laggy. How do I fix it?",
    a: "MAX runs best with hardware acceleration enabled. Close heavy background apps. If physics feel off, set Windows Display Scaling to 100%. Use Ctrl+M if he ever gets lost.",
  },
  {
    q: "Does MAX work on multiple monitors?",
    a: "Yes! MAX walks across all connected displays. If he gets lost on a disconnected monitor, press Ctrl+M to summon him back.",
  },
  {
    q: "Will MAX drain my battery?",
    a: "MAX is lightweight. Active animations use minimal GPU. When idle, he enters a low-power state with negligible resource consumption.",
  },
  {
    q: "Can I pause him during work meetings?",
    a: "Yes — use Focus Mode from the right-click menu. MAX will stop wandering and minimize distractions without quitting the app entirely.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-28 px-4">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-heading font-semibold tracking-widest uppercase">Support</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Got a problem? MAX probably has an answer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-primary text-sm md:text-base py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Recovery card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6"
        >
          <h3 className="font-heading font-bold text-foreground mb-3">⚡ Quick Recovery</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { problem: "MAX disappeared", fix: "Press Ctrl+M" },
              { problem: "MAX froze", fix: "Press Escape or double-click" },
              { problem: "Physics broken", fix: "Set scaling to 100%" },
              { problem: "Still broken", fix: "Restart & check max.log" },
            ].map((r) => (
              <div key={r.problem} className="flex items-start gap-2">
                <span className="text-destructive font-medium shrink-0">{r.problem}:</span>
                <span className="text-muted-foreground">{r.fix}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

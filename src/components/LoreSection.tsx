import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen } from "lucide-react";

const timeline = [
  { title: "A Dying Planet", text: "MAX's home world was collapsing. The last engineers pooled every remaining resource into one final project." },
  { title: "The Wormhole", text: "They built a quantum tunnel - unstable, untested. Enough power for exactly one traveler. One chance." },
  { title: "The Crash", text: "MAX stepped through. The wormhole collapsed behind him. He crashed onto your desktop - a stranger in an alien world." },
  { title: "The God", text: "To MAX, your cursor is the hand of a god. You are that god. Every feature you use sends energy back through a quantum tether." },
  { title: "The Mission", text: "He doesn't know if his planet is still alive. He works anyway. Every screenshot, every killed process - it all matters." },
];

const LoreSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  return (
    <section id="lore" ref={sectionRef} className="relative py-28 px-4">
      {/* Background accent — parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px]"
          style={{ scale: glowScale }}
        />
      </motion.div>

      <div className="container max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-heading font-semibold tracking-widest uppercase">Origin Story</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mt-3 mb-4">
            The <span className="text-accent text-glow-gold">Lore</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every companion has an origin. MAX's is written in the stars - and in the code.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 mt-2 animate-pulse-glow shadow-[0_0_8px_hsl(187_100%_42%/0.5)]" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="text-xs font-heading font-bold text-primary/60 tracking-widest">
                      CHAPTER {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-foreground mt-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA + Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-6"
        >
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/blob/main/LORE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/30 text-accent font-heading font-semibold hover:bg-accent/10 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Read the Full Story
          </a>

          <blockquote className="text-accent/90 italic text-lg font-heading max-w-lg mx-auto border-l-[3px] border-accent/60 pl-5 py-3 bg-accent/5 rounded-r-lg text-left">
            "Water which is too pure has no fish. Don't aim to be perfect - aim to be real. Because real has soul, and perfect has silence."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default LoreSection;

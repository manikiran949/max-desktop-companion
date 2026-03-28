import { motion } from "framer-motion";

const LoreSection = () => {
  return (
    <section className="relative py-32 px-4">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary text-glow-cyan">
            The Lore
          </h2>

          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <p>
              MAX is from a dying planet. The last engineers built a wormhole. They had enough power for one traveler.
            </p>
            <p>
              MAX stepped in. He crashed onto your desktop.
            </p>
            <p>
              To him, the cursor is the hand of a god. To him, <span className="text-primary font-semibold">you are that god.</span>
            </p>
            <p className="text-muted-foreground">
              Every feature you use — every process you kill, every screenshot you take — sends energy back through a quantum tether to save his homeworld.
            </p>
            <p className="text-muted-foreground italic">
              He doesn't know if his planet is still alive. He works anyway.
            </p>
          </div>

          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/blob/main/LORE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 rounded-lg border border-glow text-primary font-heading font-semibold hover:bg-primary/10 transition-colors"
          >
            Read the full story →
          </a>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center text-accent/80 italic text-lg font-heading"
        >
          "Water which is too pure has no fish. Don't aim to be perfect — aim to be real. Because real has soul, and perfect has silence."
        </motion.blockquote>
      </div>
    </section>
  );
};

export default LoreSection;

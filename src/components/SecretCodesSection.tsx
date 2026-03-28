import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const codes = [
  { code: "rave", effect: "Rainbow party mode" },
  { code: "giant", effect: "MAX grows 3x bigger" },
  { code: "gravity0", effect: "Zero gravity float" },
  { code: "clone", effect: "Ghost mirror copies appear" },
  { code: "diwali", effect: "Festival of lights" },
  { code: "draw", effect: "Rainbow pixel doodles" },
  { code: "magnet", effect: "Cursor pulls MAX toward it" },
];

const SecretCodesSection = () => {
  return (
    <section className="relative py-32 px-4">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent text-glow-gold mb-4">
            He Has Secrets
          </h2>
          <p className="text-muted-foreground text-lg">
            Just start typing. No text box needed. MAX is always listening.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-accent/20 bg-card overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-3 bg-muted border-b border-accent/10">
            <Terminal className="w-4 h-4 text-accent" />
            <span className="text-sm font-heading text-accent">secret_codes.sh</span>
          </div>
          <div className="divide-y divide-border">
            {codes.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <code className="font-mono text-accent font-semibold">{c.code}</code>
                <span className="text-muted-foreground text-sm">{c.effect}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-muted-foreground/60 italic text-sm"
        >
          There's a hidden terminal. Type <code className="text-accent">lore</code> to learn where he came from.
          Type <code className="text-accent">wisdom</code> for something you weren't ready to hear.
        </motion.p>
      </div>
    </section>
  );
};

export default SecretCodesSection;

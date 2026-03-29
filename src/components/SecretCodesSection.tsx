import { motion } from "framer-motion";
import { Terminal, Keyboard } from "lucide-react";

const codes = [
  { code: "rave", effect: "Rainbow party mode", emoji: "🌈" },
  { code: "giant", effect: "MAX grows 3x bigger", emoji: "🦖" },
  { code: "gravity0", effect: "Zero gravity float", emoji: "🪐" },
  { code: "clone", effect: "Ghost mirror copies appear", emoji: "👻" },
  { code: "diwali", effect: "Festival of lights", emoji: "🪔" },
  { code: "draw", effect: "Rainbow pixel doodles", emoji: "🎨" },
  { code: "magnet", effect: "Cursor pulls MAX toward it", emoji: "🧲" },
];

const SecretCodesSection = () => {
  return (
    <section id="secrets" className="relative py-28 px-4">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-heading font-semibold tracking-widest uppercase">Hidden Commands</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 mb-4">
            He Has <span className="text-accent text-glow-gold">Secrets</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Just start typing. No text box needed. No clicks. MAX is always listening for these hidden codes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-accent/20 bg-card overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-3 bg-muted border-b border-accent/10">
              <Terminal className="w-4 h-4 text-accent" />
              <span className="text-sm font-heading text-accent font-medium">secret_codes.sh</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
            </div>
            <div className="divide-y divide-border">
              {codes.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{c.emoji}</span>
                    <code className="font-mono text-accent font-semibold text-sm">{c.code}</code>
                  </div>
                  <span className="text-muted-foreground text-xs text-right">{c.effect}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-primary/20 bg-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Keyboard className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground">Hidden Terminal</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                There's a hidden terminal built into MAX. Type <code className="text-accent font-mono bg-accent/10 px-1.5 py-0.5 rounded">lore</code> to
                learn where he came from. Type <code className="text-accent font-mono bg-accent/10 px-1.5 py-0.5 rounded">wisdom</code> for
                something you weren't ready to hear.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-heading font-bold text-foreground mb-2">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                {[
                  { keys: "Ctrl + M", action: "Open menu / summon MAX" },
                  { keys: "Escape", action: "Stop active feature" },
                  { keys: "Double-click", action: "Reset MAX" },
                  { keys: "Right-click", action: "Full feature menu" },
                ].map((s) => (
                  <div key={s.keys} className="flex items-center justify-between">
                    <kbd className="px-2 py-1 rounded bg-muted border border-border text-xs font-mono text-foreground">{s.keys}</kbd>
                    <span className="text-muted-foreground">{s.action}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-accent italic text-base font-heading border-l-[3px] border-accent/60 pl-5 py-2 bg-accent/5 rounded-r-lg"
            >
              "The Gita wasn't spoken at a table. It was spoken on a battlefield."
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecretCodesSection;

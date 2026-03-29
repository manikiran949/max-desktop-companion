import { motion } from "framer-motion";
import { Download, MousePointer, Sparkles, Rocket } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Download & Run",
    desc: "56MB one-click installer. No Python, no dependencies, no setup. Just run the .exe.",
  },
  {
    icon: MousePointer,
    step: "02",
    title: "He Appears",
    desc: "MAX crashes onto your desktop. He stands on your windows, follows your cursor, and makes himself at home.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Right-Click = Power",
    desc: "45+ features in one menu: screenshots, GIF recording, kill processes, WiFi passwords, system stats, and more.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Discover Secrets",
    desc: "Type hidden codes anywhere - no text box needed. Trigger rave mode, zero gravity, ghost clones, and a hidden terminal.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Up and Running in <span className="text-primary text-glow-cyan">30 Seconds</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No accounts. No cloud. No configuration. Just a companion.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 relative z-10 icon-glow-hover cursor-default"
                >
                  <s.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <span className="text-xs font-heading font-bold text-primary/60 tracking-widest mb-2">
                  STEP {s.step}
                </span>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import { motion } from "framer-motion";
import {
  Monitor, Camera, Cpu, Gamepad2, Palette, Wifi,
  HardDrive, Zap, Timer, Crosshair, LayoutGrid, Shield
} from "lucide-react";

const categories = [
  {
    title: "He Moves",
    icon: Gamepad2,
    items: ["Push windows", "Ride your cursor", "Swing from edges", "Tunnel through windows", "Climb walls", "Bellyflop", "Rope walk", "Surf windows"],
  },
  {
    title: "He's Useful",
    icon: Camera,
    items: ["Screenshots", "GIF recording", "Color picker", "WiFi passwords", "IP info", "Disk usage", "Battery health", "Live system stats"],
  },
  {
    title: "System Power",
    icon: Cpu,
    items: ["Kill frozen apps", "Uninstall apps", "Clean temp files", "Window arrange", "Pin windows", "Focus mode", "Startup manager", "Bloat finder"],
  },
  {
    title: "Personality",
    icon: Palette,
    items: ["13 expressions", "Clipboard reactions", "Idle animations", "Cursor dodge", "App-aware moods", "Seasonal outfits", "Wisdom quotes", "Hidden terminal"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-32 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary text-glow-cyan mb-4">
            45+ Features. One Right-Click.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A tiny guardian with the power of a full toolkit.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={item}
              className="rounded-xl border border-glow bg-card p-8 box-glow-cyan hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-primary/10">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((feat) => (
                  <span key={feat} className="px-3 py-1.5 text-sm rounded-md bg-muted text-muted-foreground">
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

import { motion } from "framer-motion";
import { Gamepad2, Camera, Cpu, Palette, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "He Moves",
    subtitle: "Physics-based fun on your desktop",
    icon: Gamepad2,
    color: "primary",
    quote: "Not all battles are fought for victory.",
    items: [
      { name: "Push", desc: "Shove windows off screen" },
      { name: "Ride", desc: "Jump on your cursor" },
      { name: "Swing", desc: "Pendulum from window edges" },
      { name: "Tunnel", desc: "Dig through windows" },
      { name: "Climb", desc: "Scale window edges" },
      { name: "Bellyflop", desc: "Launch & splat" },
      { name: "Rope Walk", desc: "Tightrope between windows" },
      { name: "Surf", desc: "Ride moving windows" },
    ],
  },
  {
    title: "He's Useful",
    subtitle: "Tools Windows should've had built in",
    icon: Camera,
    color: "accent",
    quote: "Wheat is wheat, even when people think it is grass.",
    items: [
      { name: "Screenshot", desc: "One-click capture" },
      { name: "GIF Record", desc: "Screen to GIF" },
      { name: "Color Picker", desc: "Any pixel, any app" },
      { name: "WiFi Password", desc: "Saved passwords instantly" },
      { name: "IP Info", desc: "Local + public IP" },
      { name: "Disk Info", desc: "All drives at a glance" },
      { name: "Battery Health", desc: "Status & power plan" },
      { name: "System Stats", desc: "Live CPU, RAM, disk" },
    ],
  },
  {
    title: "System Power",
    subtitle: "Take control of your machine",
    icon: Cpu,
    color: "primary",
    quote: "The Gita wasn't spoken at a table.",
    items: [
      { name: "Kill Process", desc: "End frozen apps" },
      { name: "Uninstall", desc: "Remove from registry" },
      { name: "Temp Clean", desc: "Wipe temp files" },
      { name: "Window Arrange", desc: "Grid tile windows" },
      { name: "Pin Window", desc: "Always on top" },
      { name: "Focus Mode", desc: "Kill distractions" },
      { name: "Startup Manager", desc: "Control boot apps" },
      { name: "Bloat Finder", desc: "Find memory hogs" },
    ],
  },
  {
    title: "Personality",
    subtitle: "He's alive — not a tool",
    icon: Palette,
    color: "accent",
    quote: "I wanted something with a soul.",
    items: [
      { name: "13 Expressions", desc: "Happy, scared, love, dizzy…" },
      { name: "Clipboard React", desc: "Code? He wears glasses" },
      { name: "Idle Animations", desc: "Nap, wave, stretch, fish" },
      { name: "Cursor Dodge", desc: "Pounce & evade" },
      { name: "App-Aware", desc: "Different per app" },
      { name: "Seasonal", desc: "Holiday outfits" },
      { name: "Wisdom Quotes", desc: "3 AM philosopher" },
      { name: "Hidden Terminal", desc: "Type to discover" },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-28 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-heading font-semibold tracking-widest uppercase">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mt-3 mb-4">
            45+ Features. <span className="text-primary text-glow-cyan">One Right-Click.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A tiny guardian with the power of a full toolkit. Everything accessible from a single right-click menu — no menus to memorize, no apps to install.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={item}
              className={`rounded-2xl border bg-card overflow-hidden ${
                cat.color === "accent" ? "border-accent/20" : "border-primary/20"
              }`}
            >
              {/* Header */}
              <div className="p-8 pb-0">
                <div className="flex items-start gap-4 mb-2">
                  <div className={`p-3 rounded-xl ${
                    cat.color === "accent" ? "bg-accent/10" : "bg-primary/10"
                  }`}>
                    <cat.icon className={`w-7 h-7 ${
                      cat.color === "accent" ? "text-accent" : "text-primary"
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{cat.subtitle}</p>
                  </div>
                </div>
                <p className={`text-xs italic mt-3 ${
                  cat.color === "accent" ? "text-accent/60" : "text-primary/60"
                }`}>"{cat.quote}"</p>
              </div>

              {/* Features grid */}
              <div className="p-8 pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {cat.items.map((feat) => (
                    <div
                      key={feat.name}
                      className="group rounded-xl bg-muted/50 border border-border/50 p-4 hover:border-primary/30 hover:bg-muted transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <ChevronRight className="w-3.5 h-3.5 text-primary/50 group-hover:text-primary transition-colors" />
                        <span className="font-heading font-semibold text-sm text-foreground">{feat.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-5.5">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

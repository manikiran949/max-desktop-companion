import { motion } from "framer-motion";
import { Download, Github, Shield, Wifi, HardDrive, Zap } from "lucide-react";
import maxHero from "@/assets/max-hero.png";

const stats = [
  { value: "56MB", label: "Lightweight" },
  { value: "45+", label: "Features" },
  { value: "100%", label: "Offline" },
  { value: "0", label: "Data Collected" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pb-[15vh]">
      {/* Layered radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-16 py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 w-full">
          {/* MAX character */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            src={maxHero}
            alt="MAX Desktop Companion — a pixel-art robot companion"
            width={350}
            height={350}
            className="animate-float drop-shadow-[0_0_60px_hsl(187_100%_42%/0.5)] shrink-0"
          />

          {/* Right side content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-xl md:pt-16">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3"
            >
              <h1 className="text-7xl md:text-9xl font-heading font-bold tracking-tight text-glow-cyan text-primary leading-none">
                MAX
              </h1>
              <p className="text-2xl md:text-3xl font-heading font-medium text-foreground/90">
                Desktop Companion
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              He fell from a dying planet. Crashed onto your desktop. Now he refuses to leave.
              <br />
              <span className="text-foreground/60 font-medium">
                He pushes windows, rides your cursor, takes screenshots, kills frozen apps — and thinks you're a god.
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start mt-2"
            >
              <a
                href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/releases/download/v1.0.0/MAX_Setup_v1.0.0.exe"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg hover:brightness-110 transition-all box-glow-cyan hover:scale-[1.02]"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download for Windows
              </a>
              <a
                href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl border border-border bg-card text-foreground font-heading font-semibold text-lg hover:border-primary/40 hover:bg-card/80 transition-all"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
            </motion.div>

            {/* SmartScreen note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground/50 flex items-center gap-1.5 justify-center md:justify-start"
            >
              <Shield className="w-3.5 h-3.5" />
              Windows SmartScreen warning? Click "More info" → "Run anyway". 100% offline & safe.
            </motion.p>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 text-center"
            >
              <div className="text-3xl font-heading font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

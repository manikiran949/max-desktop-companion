import { motion } from "framer-motion";
import { Download, Github, Star } from "lucide-react";
import maxHero from "@/assets/max-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Radial glow behind MAX */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center gap-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          {/* MAX character */}
          <motion.img
            src={maxHero}
            alt="MAX Desktop Companion"
            width={280}
            height={280}
            className="animate-float drop-shadow-[0_0_40px_hsl(187_100%_42%/0.4)]"
          />

          <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tight text-glow-cyan text-primary">
            MAX
          </h1>
          <p className="text-xl md:text-2xl font-heading text-foreground/80 max-w-2xl">
            Desktop Companion
          </p>
          <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
            He fell from a dying planet. Crashed onto your desktop. Now he refuses to leave.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-lg hover:brightness-110 transition-all box-glow-cyan"
          >
            <Download className="w-5 h-5" />
            Download for Windows
          </a>
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-glow bg-secondary text-secondary-foreground font-heading font-semibold text-lg hover:bg-secondary/80 transition-all"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mt-4"
        >
          {["56MB · One-click install", "100% Offline", "Zero Data Collection", "Free Forever"].map((badge) => (
            <span key={badge} className="px-4 py-1.5 rounded-full border border-glow bg-muted text-sm text-muted-foreground font-medium">
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground/60 max-w-md mt-2"
        >
          Windows SmartScreen warning? Click "More info" → "Run anyway". We're students — no $300 code signing certificate yet.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;

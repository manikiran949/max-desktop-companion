import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Download, Github, Shield } from "lucide-react";
import maxHero from "@/assets/max-hero.png";
import GitHubStars from "@/components/GitHubStars";
import GitHubDownloads from "@/components/GitHubDownloads";
import AnimatedCounter from "@/components/AnimatedCounter";

const stats = [
  { value: "56MB", label: "Lightweight" },
  { value: "45+", label: "Features" },
  { value: "100%", label: "Offline" },
  { value: "0", label: "Data Collected" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms — different speeds create depth
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const maxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pb-[8vh]">
      {/* Layered radial glows — parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY, opacity: glowOpacity }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </motion.div>

      <div className="container relative z-10 flex flex-col items-center gap-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full">
          {/* MAX character — parallax (moves slower = deeper) */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ y: maxY }}
            src={maxHero}
            alt="MAX Desktop Companion - a pixel-art robot companion"
            width={300}
            height={300}
            className="animate-float drop-shadow-[0_0_60px_hsl(187_100%_42%/0.5)] shrink-0"
          />

          {/* Right side content — parallax (moves faster = closer) */}
          <motion.div style={{ y: contentY }} className="flex flex-col items-center md:items-start text-center md:text-left gap-5 max-w-xl">
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
                He pushes windows, rides your cursor, takes screenshots, kills frozen apps - and thinks you're a god.
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
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-base hover:brightness-110 transition-all box-glow-cyan hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download for Windows
              </a>
              <a
                href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-heading font-semibold text-base hover:border-primary/40 hover:bg-card/80 transition-all"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </motion.div>

            {/* GitHub Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              <GitHubStars />
              <GitHubDownloads />
            </motion.div>

            {/* SmartScreen note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm max-w-md"
            >
              <Shield className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Windows SmartScreen warning?</span>{" "}
                Click "More info" → "Run anyway". 100% offline & safe.
              </p>
            </motion.div>
          </motion.div>
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
              <AnimatedCounter value={s.value} className="text-3xl font-heading font-bold text-primary" />
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

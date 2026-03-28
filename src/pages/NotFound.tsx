import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import maxHero from "@/assets/max-hero.png";
import CosmicBackground from "@/components/CosmicBackground";

const glitchText = [
  "ERROR_404: WORMHOLE_COORDINATES_INVALID",
  "SIGNAL_LOST: page.exe not found",
  "QUANTUM_TETHER: disconnected",
];

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#03030a] flex items-center justify-center overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        {/* Glitch code lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-1"
        >
          {glitchText.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.3 + i * 0.1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="font-mono text-xs text-primary/50 tracking-wider"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* MAX character — confused */}
        <motion.img
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          src={maxHero}
          alt="MAX is confused"
          width={200}
          height={200}
          className="drop-shadow-[0_0_40px_hsl(187_100%_42%/0.4)] mb-6"
        />

        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="text-8xl md:text-9xl font-heading font-bold text-primary text-glow-cyan leading-none mb-3"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 mb-8"
        >
          <p className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            MAX searched everywhere.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed">
            This page doesn't exist — maybe it fell into a wormhole.
            <br />
            <span className="text-muted-foreground/50 text-sm">
              Attempted route: <code className="text-primary/40 font-mono bg-primary/5 px-1.5 py-0.5 rounded">{location.pathname}</code>
            </span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-lg hover:brightness-110 transition-all box-glow-cyan hover:scale-[1.02]"
        >
          Take MAX Home
        </motion.a>

        {/* Footer quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-muted-foreground/30 italic text-xs font-heading"
        >
          "Not every wormhole leads somewhere. Some just lead back to the beginning."
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;

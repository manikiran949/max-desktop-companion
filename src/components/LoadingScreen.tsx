import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import maxHero from "@/assets/max-hero.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("done");
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase === "loading" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#03030a]"
        >
          {/* Pulsing glow behind MAX */}
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[100px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* MAX image with glow-up animation */}
          <motion.img
            src={maxHero}
            alt="MAX loading"
            width={150}
            height={150}
            className="relative z-10 object-contain drop-shadow-[0_0_40px_hsl(187_100%_42%/0.7)]"
            initial={{ opacity: 0, scale: 0.6, filter: "brightness(0.2)" }}
            animate={{
              opacity: 1,
              scale: [0.6, 1.05, 1],
              filter: [
                "brightness(0.2)",
                "brightness(1.6) drop-shadow(0 0 30px hsl(187 100% 42% / 0.9))",
                "brightness(1) drop-shadow(0 0 20px hsl(187 100% 42% / 0.5))"
              ],
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Text */}
          <motion.div
            className="relative z-10 mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.p
              className="font-heading text-lg text-primary text-glow-cyan tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              INITIALIZING...
            </motion.p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="relative z-10 mt-6 w-48 h-1 rounded-full bg-muted overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary rounded-full shadow-[0_0_10px_hsl(187_100%_42%/0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

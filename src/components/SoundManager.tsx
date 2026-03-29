import { useEffect, useState, useCallback, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const STORAGE_KEY = "max-sound-enabled";

/**
 * SoundManager — Uses Web Audio API to generate synthetic sci-fi sounds.
 * No audio files needed — everything is procedurally generated.
 */
const SoundManager = () => {
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? saved === "true" : true; // On by default
    } catch {
      return true;
    }
  });
  const ctxRef = useRef<AudioContext | null>(null);

  // Lazily create AudioContext (browsers require user gesture)
  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // Hover sound: soft high-frequency blip
  const playHover = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }, [enabled, getCtx]);

  // Click sound: deeper two-note confirmation chord
  const playClick = useCallback(() => {
    if (!enabled) return;
    try {
      const ctx = getCtx();

      // Note 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(600, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.15);

      // Note 2 (harmony)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(900, ctx.currentTime + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.04, ctx.currentTime + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.05);
      osc2.stop(ctx.currentTime + 0.2);
    } catch {}
  }, [enabled, getCtx]);

  useEffect(() => {
    if (!enabled) return;

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button']");
      if (interactiveEl) playHover();
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, [role='button']");
      if (interactiveEl) playClick();
    };

    document.addEventListener("mouseenter", handleHover, true);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("mouseenter", handleHover, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [enabled, playHover, playClick]);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {}
    // Play a confirmation sound when enabling
    if (next) {
      setTimeout(() => {
        try {
          const ctx = getCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(500, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.2);
        } catch {}
      }, 50);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 p-2.5 rounded-full bg-card/80 border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all backdrop-blur-md"
      title={enabled ? "Mute sounds" : "Enable sounds"}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </motion.button>
  );
};

export default SoundManager;

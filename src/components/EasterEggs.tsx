import { useEffect, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface EasterEgg {
  code: string;
  name: string;
  emoji: string;
  activate: () => void;
}

const EasterEggs = () => {
  const bufferRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const triggerRave = useCallback(() => {
    const overlay = document.createElement("div");
    overlay.className = "ee-rave-overlay";
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.classList.add("ee-rave-fadeout");
      setTimeout(() => overlay.remove(), 500);
    }, 3000);
  }, []);

  const triggerGravity = useCallback(() => {
    document.body.classList.add("ee-zero-gravity");
    setTimeout(() => document.body.classList.remove("ee-zero-gravity"), 4000);
  }, []);


  const triggerMatrix = useCallback(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "ee-matrix-canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*MAX";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    setTimeout(() => {
      clearInterval(interval);
      canvas.classList.add("ee-matrix-fadeout");
      setTimeout(() => canvas.remove(), 500);
    }, 4000);
  }, []);

  const eggs: EasterEgg[] = [
    { code: "rave", name: "RAVE MODE", emoji: "🌈", activate: triggerRave },
    { code: "gravity0", name: "ZERO GRAVITY", emoji: "🪐", activate: triggerGravity },
    { code: "matrix", name: "MATRIX RAIN", emoji: "💊", activate: triggerMatrix },
  ];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Skip if user is typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      bufferRef.current += e.key.toLowerCase();

      // Reset buffer after 2s of inactivity
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        bufferRef.current = "";
      }, 2000);

      // Check for matches
      for (const egg of eggs) {
        if (bufferRef.current.endsWith(egg.code)) {
          bufferRef.current = "";
          egg.activate();
          toast({
            title: `${egg.emoji} ${egg.name} ACTIVATED`,
            description: "You found a hidden code! Just like in the real MAX app.",
          });
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimeout(timerRef.current);
    };
  }, [eggs]);

  return null; // Pure side-effect component
};

export default EasterEggs;

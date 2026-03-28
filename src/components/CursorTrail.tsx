import { useEffect, useRef } from "react";

/**
 * CursorTrail — Subtle cyan sparkle particles that follow the mouse cursor.
 * Ties the website experience to the product (MAX follows your cursor on the desktop).
 *
 * Uses a lightweight canvas that only renders when the mouse is moving.
 * Particles have a short life with quick fade-out for an elegant feel.
 */

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number; // for subtle color variation
}

const MAX_SPARKS = 50;
const SPAWN_RATE = 2; // sparks per frame while moving

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const sparksRef = useRef<Spark[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastMouseRef = useRef({ x: -100, y: -100 });
  const isMovingRef = useRef(false);
  const movingTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMovingRef.current = true;
      clearTimeout(movingTimeoutRef.current);
      movingTimeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 100);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    const frame = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Spawn sparks when mouse is moving
      if (isMovingRef.current && mx > 0 && my > 0) {
        const dx = mx - lastMouseRef.current.x;
        const dy = my - lastMouseRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Spawn proportional to movement speed (but capped)
        const count = Math.min(SPAWN_RATE, Math.floor(speed / 3) + 1);

        for (let i = 0; i < count && sparksRef.current.length < MAX_SPARKS; i++) {
          const angle = Math.random() * Math.PI * 2;
          const velocity = 0.3 + Math.random() * 1.2;
          sparksRef.current.push({
            x: mx + (Math.random() - 0.5) * 8,
            y: my + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 0.3, // slight upward drift
            alpha: 0.6 + Math.random() * 0.4,
            size: 1 + Math.random() * 2,
            life: 0,
            maxLife: 20 + Math.random() * 30,
            hue: 180 + Math.random() * 20, // cyan range (180-200)
          });
        }
      }
      lastMouseRef.current = { x: mx, y: my };

      // Update and draw sparks
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.01; // tiny gravity
        s.life++;

        const progress = s.life / s.maxLife;
        const currentAlpha = s.alpha * (1 - progress * progress); // quadratic fade

        if (s.life >= s.maxLife || currentAlpha < 0.01) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        const currentSize = s.size * (1 - progress * 0.5); // shrink over life

        // Glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, ${currentAlpha * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 70%, ${currentAlpha})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 90%, ${currentAlpha * 0.8})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(movingTimeoutRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-canvas"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;

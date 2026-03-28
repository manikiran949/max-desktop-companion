import { useEffect, useRef } from "react";

/*
 * CosmicBackground — A refined, premium starfield
 *
 * Design philosophy: the original CSS stars looked great because they were
 * TINY, CRISP, and spread across three depth-layers drifting at different
 * speeds. This canvas version recreates that clean aesthetic and adds:
 *   • Mouse-driven parallax across all layers (closer = more movement)
 *   • Gentle per-star twinkling
 *   • Rare, elegant shooting stars
 *   • Soft nebula glow clouds that breathe
 *   • Constellation lines that appear near the cursor
 *
 * Rule: LESS IS MORE. Every element earns its place.
 */

// ─── Tuning ──────────────────────────────────────────────────────────────────
const LAYERS = [
  { count: 180, sizeMin: 0.3, sizeMax: 0.8,  alphaMin: 0.25, alphaMax: 0.6,  speed: 0.08, parallax: 0.008 },  // distant — dense, tiny, like the CSS tile layer
  { count: 100, sizeMin: 0.5, sizeMax: 1.2,  alphaMin: 0.35, alphaMax: 0.8,  speed: 0.18, parallax: 0.018 },  // mid
  { count: 50,  sizeMin: 0.7, sizeMax: 1.6,  alphaMin: 0.45, alphaMax: 1.0,  speed: 0.35, parallax: 0.035 },  // close
];

const NEBULA_COUNT = 4;
const SHOOTING_STAR_MIN_INTERVAL = 4500;
const SHOOTING_STAR_MAX_INTERVAL = 10000;
const CONSTELLATION_RADIUS = 200;  // px around cursor
const CONSTELLATION_LINE_DIST = 130; // max distance between connected stars

// ─── Types ───────────────────────────────────────────────────────────────────
interface Star {
  // position in tile-space (0..tileW, 0..tileH for the layer)
  tx: number;
  ty: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string; // rgb string like "255,255,255"
  layer: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  width: number;
  tailLength: number;
  color: string;
}

interface Nebula {
  x: number;  // 0..1 normalised
  y: number;
  radius: number;
  hue1: string;
  hue2: string;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  driftAngle: number;
  driftSpeed: number;
}

// ─── Color Palette (restrained, space-authentic) ─────────────────────────────
const STAR_COLORS_WEIGHTED = [
  { c: "255,255,255", w: 40 },    // pure white (most common)
  { c: "220,235,255", w: 20 },    // blue-white
  { c: "187,255,255", w: 15 },    // cyan hint
  { c: "255,240,220", w: 10 },    // warm white
  { c: "200,215,255", w: 10 },    // cool steel
  { c: "255,220,200", w: 5 },     // slight amber
];

const SHOOTING_STAR_COLORS = [
  "200,230,255",   // ice-white
  "187,255,255",   // soft cyan
  "255,255,255",   // pure white
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

function weightedPickColor(): string {
  const total = STAR_COLORS_WEIGHTED.reduce((s, c) => s + c.w, 0);
  let r = Math.random() * total;
  for (const entry of STAR_COLORS_WEIGHTED) {
    r -= entry.w;
    if (r <= 0) return entry.c;
  }
  return STAR_COLORS_WEIGHTED[0].c;
}

// ─── Entity factories ────────────────────────────────────────────────────────
function createLayerStars(layerIndex: number, w: number, h: number): Star[] {
  const cfg = LAYERS[layerIndex];
  const stars: Star[] = [];
  for (let i = 0; i < cfg.count; i++) {
    stars.push({
      tx: Math.random() * w,
      ty: Math.random() * h,
      size: rand(cfg.sizeMin, cfg.sizeMax),
      baseAlpha: rand(cfg.alphaMin, cfg.alphaMax),
      twinkleSpeed: rand(0.4, 2.5),
      twinkleOffset: Math.random() * Math.PI * 2,
      color: weightedPickColor(),
      layer: layerIndex,
    });
  }
  return stars;
}

function createNebula(): Nebula {
  const hues = [
    { h1: "0,200,170", h2: "0,100,180" },     // cyan → deep blue
    { h1: "80,40,160",  h2: "40,20,120" },     // purple core
    { h1: "0,150,200",  h2: "60,30,140" },     // blue → violet
  ];
  const h = hues[Math.floor(Math.random() * hues.length)];
  return {
    x: rand(0.15, 0.85),
    y: rand(0.15, 0.85),
    radius: rand(0.2, 0.4), // normalised to viewport
    hue1: h.h1,
    hue2: h.h2,
    baseAlpha: rand(0.04, 0.07),
    pulseSpeed: rand(0.15, 0.4),
    pulseOffset: Math.random() * Math.PI * 2,
    driftAngle: Math.random() * Math.PI * 2,
    driftSpeed: rand(0.02, 0.06),
  };
}

function createShootingStar(w: number, h: number): ShootingStar {
  // Always streak diagonally from upper area
  const startX = rand(-50, w * 0.7);
  const startY = rand(-50, h * 0.15);
  const angle = rand(0.35, 0.9); // ~20–50 degrees
  const speed = rand(12, 22);
  return {
    x: startX,
    y: startY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: 1,
    decay: rand(0.004, 0.01),
    width: rand(1.0, 1.8),
    tailLength: rand(60, 140),
    color: SHOOTING_STAR_COLORS[Math.floor(Math.random() * SHOOTING_STAR_COLORS.length)],
  };
}

// ─── Component ───────────────────────────────────────────────────────────────
const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 }); // start offscreen
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[][]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const nextShootingRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const scrollRef = useRef(0);
  const driftRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Setup ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const oldW = sizeRef.current.w;
      sizeRef.current = { w, h };

      // Only regenerate on first load or significant resize
      if (oldW === 0 || Math.abs(w - oldW) > 200) {
        starsRef.current = LAYERS.map((_, i) => createLayerStars(i, w, h));
        nebulasRef.current = Array.from({ length: NEBULA_COUNT }, createNebula);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    let lastTime = 0;

    // ── Main animation loop ──
    const frame = (timestamp: number) => {
      const { w, h } = sizeRef.current;
      const dt = lastTime === 0 ? 1 : Math.min((timestamp - lastTime) / 16.667, 3);
      lastTime = timestamp;
      driftRef.current = timestamp;

      // Smooth the mouse position (lerp for butter)
      const lerp = 0.08;
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerp;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerp;
      const smx = smoothMouseRef.current.x;
      const smy = smoothMouseRef.current.y;

      // Normalised mouse offset from center (-0.5 .. 0.5)
      const nmx = (smx / w) - 0.5;
      const nmy = (smy / h) - 0.5;

      ctx.clearRect(0, 0, w, h);

      // ═══════════════════════════════════════════════════════════════════════
      // 1. NEBULA GLOW (bottom layer — soft, blurred radial gradients)
      // ═══════════════════════════════════════════════════════════════════════
      for (const neb of nebulasRef.current) {
        neb.driftAngle += neb.driftSpeed * 0.005 * dt;
        const pulse = Math.sin(timestamp * 0.0005 * neb.pulseSpeed + neb.pulseOffset);
        const alpha = neb.baseAlpha * (0.7 + pulse * 0.3);
        const r = neb.radius * Math.max(w, h) * (0.95 + pulse * 0.05);

        const cx = neb.x * w + Math.cos(neb.driftAngle) * 40 - nmx * w * 0.02;
        const cy = neb.y * h + Math.sin(neb.driftAngle) * 25 - nmy * h * 0.02;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${neb.hue1},${alpha})`);
        grad.addColorStop(0.5, `rgba(${neb.hue2},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${neb.hue2},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }

      // ═══════════════════════════════════════════════════════════════════════
      // 2. STAR LAYERS (3 depth layers, each drifting + mouse parallax)
      // ═══════════════════════════════════════════════════════════════════════
      // Collect visible positions for constellation lines
      const visibleStars: { x: number; y: number; alpha: number; size: number }[] = [];

      for (let li = 0; li < LAYERS.length; li++) {
        const cfg = LAYERS[li];
        const layer = starsRef.current[li];
        if (!layer) continue;

        // Layer drift: slow continuous upward movement (like original CSS spacePan)
        const driftY = (timestamp * cfg.speed * 0.01) % h;
        // Mouse parallax offset
        const px = -nmx * w * cfg.parallax * 40;
        const py = -nmy * h * cfg.parallax * 40;

        for (const star of layer) {
          // Position with drift + parallax + wrap
          let sx = ((star.tx + px) % w + w) % w;
          let sy = ((star.ty - driftY + py) % h + h) % h;

          // Twinkle
          const twinkle = Math.sin(timestamp * 0.001 * star.twinkleSpeed + star.twinkleOffset);
          const alpha = star.baseAlpha * (0.55 + twinkle * 0.45);

          // Draw the star as a crisp pixel-perfect dot
          if (star.size <= 1) {
            // Tiny stars: use fillRect for pixel-crispness
            ctx.globalAlpha = alpha;
            ctx.fillStyle = `rgb(${star.color})`;
            const s = Math.max(0.5, star.size);
            ctx.fillRect(sx - s / 2, sy - s / 2, s, s);
            ctx.globalAlpha = 1;
          } else {
            // Slightly larger stars: small arc + faint halo
            ctx.beginPath();
            ctx.arc(sx, sy, star.size * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${star.color},${alpha})`;
            ctx.fill();

            // Subtle glow halo (only on the biggest stars)
            if (star.size > 1.3) {
              ctx.beginPath();
              ctx.arc(sx, sy, star.size * 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${star.color},${alpha * 0.06})`;
              ctx.fill();
            }
          }

          // Track for constellation (only close-layer stars near cursor)
          if (li >= 1) {
            const dx = sx - smx;
            const dy = sy - smy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONSTELLATION_RADIUS) {
              visibleStars.push({ x: sx, y: sy, alpha, size: star.size });
            }
          }
        }
      }

      // ═══════════════════════════════════════════════════════════════════════
      // 3. CONSTELLATION LINES (appear near cursor)
      // ═══════════════════════════════════════════════════════════════════════
      if (visibleStars.length > 1) {
        ctx.lineCap = "round";
        for (let i = 0; i < visibleStars.length; i++) {
          for (let j = i + 1; j < visibleStars.length; j++) {
            const a = visibleStars[i];
            const b = visibleStars[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONSTELLATION_LINE_DIST) {
              // Fade based on distance between stars AND distance from cursor
              const distFade = 1 - dist / CONSTELLATION_LINE_DIST;
              const cursorDistA = Math.sqrt((a.x - smx) ** 2 + (a.y - smy) ** 2);
              const cursorDistB = Math.sqrt((b.x - smx) ** 2 + (b.y - smy) ** 2);
              const cursorFade = 1 - Math.max(cursorDistA, cursorDistB) / CONSTELLATION_RADIUS;
              const lineAlpha = distFade * cursorFade * 0.15;

              if (lineAlpha > 0.005) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(187,255,255,${lineAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      // ═══════════════════════════════════════════════════════════════════════
      // 4. SHOOTING STARS (rare, elegant streaks)
      // ═══════════════════════════════════════════════════════════════════════
      if (timestamp > nextShootingRef.current) {
        shootingRef.current.push(createShootingStar(w, h));
        nextShootingRef.current = timestamp + rand(SHOOTING_STAR_MIN_INTERVAL, SHOOTING_STAR_MAX_INTERVAL);
      }

      for (let i = shootingRef.current.length - 1; i >= 0; i--) {
        const ss = shootingRef.current[i];
        ss.x += ss.vx * dt;
        ss.y += ss.vy * dt;
        ss.alpha -= ss.decay * dt;

        if (ss.alpha <= 0 || ss.x > w + 200 || ss.y > h + 200) {
          shootingRef.current.splice(i, 1);
          continue;
        }

        // Tail — single gradient line
        const tailX = ss.x - (ss.vx / Math.sqrt(ss.vx ** 2 + ss.vy ** 2)) * ss.tailLength;
        const tailY = ss.y - (ss.vy / Math.sqrt(ss.vx ** 2 + ss.vy ** 2)) * ss.tailLength;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(${ss.color},0)`);
        grad.addColorStop(0.7, `rgba(${ss.color},${ss.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${ss.color},${ss.alpha * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        const headR = ss.width * 3;
        const headGrad = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, headR);
        headGrad.addColorStop(0, `rgba(255,255,255,${ss.alpha * 0.9})`);
        headGrad.addColorStop(0.4, `rgba(${ss.color},${ss.alpha * 0.3})`);
        headGrad.addColorStop(1, `rgba(${ss.color},0)`);
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, headR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ═══════════════════════════════════════════════════════════════════════
      // 5. CURSOR GLOW (subtle proximity light)
      // ═══════════════════════════════════════════════════════════════════════
      if (smx > 0 && smy > 0) {
        const glowR = 200;
        const glowGrad = ctx.createRadialGradient(smx, smy, 0, smx, smy, glowR);
        glowGrad.addColorStop(0, "rgba(0,200,170,0.018)");
        glowGrad.addColorStop(0.5, "rgba(0,200,170,0.006)");
        glowGrad.addColorStop(1, "rgba(0,200,170,0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(smx - glowR, smy - glowR, glowR * 2, glowR * 2);
      }

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cosmic-bg-canvas"
      aria-hidden="true"
    />
  );
};

export default CosmicBackground;

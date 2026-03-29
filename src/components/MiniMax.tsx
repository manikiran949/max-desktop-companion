import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import maxHero from "@/assets/max-hero.png";

const MiniMax = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [dir, setDir] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const [jump, setJump] = useState(false);
  const lastScrollRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const posRef = useRef(20);
  const [posX, setPosX] = useState(20);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      const delta = latest - lastScrollRef.current;
      if (Math.abs(delta) > 2) {
        setWalking(true);
        setDir(delta > 0 ? 1 : -1);

        // Move position based on scroll delta
        const maxX = window.innerWidth - 80;
        posRef.current = Math.max(20, Math.min(maxX, posRef.current + delta * 0.5));
        setPosX(posRef.current);

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setWalking(false), 200);
      }
      lastScrollRef.current = latest;
    });
    return () => {
      unsub();
      clearTimeout(timerRef.current);
    };
  }, [scrollY]);

  const handleClick = () => {
    if (jump) return;
    setJump(true);
    setTimeout(() => setJump(false), 600);
  };

  return (
    <motion.div
      className="fixed bottom-2 z-[60] pointer-events-auto cursor-pointer select-none"
      animate={{ x: posX }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onClick={handleClick}
      title="Click me!"
    >
      <motion.img
        src={maxHero}
        alt="Mini MAX companion"
        width={50}
        height={50}
        className="object-contain drop-shadow-[0_0_12px_hsl(187_100%_42%/0.6)]"
        animate={{
          scaleX: dir,
          y: jump ? [0, -40, 0] : walking ? [0, -5, 0] : 0,
          rotate: jump ? [0, 360] : 0,
        }}
        transition={{
          y: jump
            ? { duration: 0.5, ease: "easeOut" }
            : { repeat: walking ? Infinity : 0, duration: 0.3 },
          rotate: { duration: 0.5 },
          scaleX: { duration: 0.15 },
        }}
      />
    </motion.div>
  );
};

export default MiniMax;

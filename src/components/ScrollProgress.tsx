import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — A thin glowing progress bar fixed at the very top of the page.
 * Gives users a sense of how far they've scrolled through the site.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

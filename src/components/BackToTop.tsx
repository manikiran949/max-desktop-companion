import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!launching) setShow(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [launching]);

  const handleClick = () => {
    setLaunching(true);
    setShow(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 150);
    setTimeout(() => setLaunching(false), 1200);
  };

  return (
    <>
      <AnimatePresence>
        {show && !launching && (
          <motion.button
            key="btn"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary/20 border border-primary/30 text-primary backdrop-blur-md shadow-[0_0_20px_hsl(187_100%_42%/0.3)] hover:bg-primary/30 transition-colors"
            aria-label="Back to top"
          >
            <Rocket className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {launching && (
          <motion.div
            key="rocket"
            initial={{ opacity: 1, bottom: 24, right: 24 }}
            animate={{ bottom: "110vh", opacity: [1, 1, 0], scale: [1.1, 1.3, 0.6] }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="fixed z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(187_100%_42%/0.8)]"
            style={{ right: 24 }}
          >
            <Rocket className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackToTop;

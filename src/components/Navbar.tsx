import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Secrets", href: "#secrets" },
  { label: "Lore", href: "#lore" },
  { label: "FAQ", href: "#faq" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect which section is currently in view
      const sections = links.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-heading font-bold text-xl text-primary text-glow-cyan">
          MAX
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l) => {
            const sectionId = l.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute -bottom-0.5 left-1 right-1 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/releases/download/v1.0.0/MAX_Setup_v1.0.0.exe"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-heading font-semibold hover:brightness-110 transition-all"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-4"
        >
          {links.map((l) => {
            const sectionId = l.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/releases/download/v1.0.0/MAX_Setup_v1.0.0.exe"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-heading font-semibold"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

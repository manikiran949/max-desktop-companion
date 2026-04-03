import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, MessageSquare, Heart, ExternalLink } from "lucide-react";

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["40%", "-10%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 1]);

  return (
    <footer ref={footerRef} className="relative border-t border-border overflow-hidden">
      {/* Parallax glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY, opacity: glowOpacity }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </motion.div>

      {/* CTA band */}
      <div className="relative py-20 px-4">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Don't let his planet <span className="text-primary text-glow-cyan">die.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Star the repo. Report a bug. Share with a friend. Every action sends energy back through the quantum tether.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold hover:brightness-110 transition-all box-glow-cyan"
            >
              <Heart className="w-4 h-4" />
              Star on GitHub
            </a>
            <a
              href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/issues/new?template=bug_report.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-heading font-semibold hover:border-primary/30 transition-all"
            >
              Report a Bug
            </a>
            <a
              href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/issues/new?template=feature_request.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-heading font-semibold hover:border-primary/30 transition-all"
            >
              Request a Feature
            </a>
          </div>

          {/* Share buttons */}
          <div className="flex gap-4 justify-center pt-2">
            {[
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/intent/tweet?text=A%20tiny%20guardian%20from%20a%20dying%20planet%20crashed%20onto%20my%20desktop.%20Now%20he%20lives%20here.%20%F0%9F%9A%80&url=https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion" },
              { icon: MessageSquare, label: "Reddit", href: "https://reddit.com/submit?url=https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion" },
              { icon: ExternalLink, label: "LinkedIn", href: "https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                aria-label={`Share on ${s.label}`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-8 px-4">
        <div className="container max-w-4xl flex items-center justify-center text-xs text-muted-foreground/50 text-center gap-2">
          <p>
            No data collected · 100% offline · Free forever
          </p>
          <span className="text-muted-foreground/20">·</span>
          <Link to="/privacy" className="hover:text-primary transition-colors underline underline-offset-4">
            Privacy Policy
          </Link>
        </div>

        <blockquote className="container max-w-xl mx-auto mt-6 text-primary/70 italic text-sm font-heading border-l-[3px] border-primary/40 pl-4 py-2 bg-primary/5 rounded-r-lg text-left">
          "It is important to do kind things in secret, so strangers can still believe the universe is gentle."
        </blockquote>
      </div>
    </footer>
  );
};

export default FooterSection;

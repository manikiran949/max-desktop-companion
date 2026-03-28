import { Github, Twitter, MessageSquare } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative border-t border-glow py-16 px-4">
      <div className="container max-w-4xl text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
          Don't let his planet die.
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-heading font-semibold hover:brightness-110 transition-all"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </a>
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/issues/new?template=bug_report.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-glow bg-secondary text-secondary-foreground font-heading font-semibold hover:bg-secondary/80 transition-all"
          >
            Report a Bug
          </a>
          <a
            href="https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/issues/new?template=feature_request.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-glow bg-secondary text-secondary-foreground font-heading font-semibold hover:bg-secondary/80 transition-all"
          >
            Request a Feature
          </a>
        </div>

        <div className="flex gap-6 justify-center">
          <a href="https://twitter.com/intent/tweet?text=A%20tiny%20guardian%20from%20a%20dying%20planet%20crashed%20onto%20my%20desktop.%20Now%20he%20lives%20here.%20%F0%9F%9A%80&url=https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://reddit.com/submit?url=https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>

        <blockquote className="text-muted-foreground/50 italic text-sm">
          "It is important to do kind things in secret, so strangers can still believe the universe is gentle."
        </blockquote>

        <p className="text-muted-foreground/40 text-xs">
          Made in India · No data collected · 100% offline · Free forever
          <br />
          © 2026 Srikar Vardhan Mangadoddi · NIT Silchar
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

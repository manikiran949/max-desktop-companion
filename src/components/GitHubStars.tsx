import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const REPO = "M-SRIKAR-VARDHAN/MAX-Desktop-Companion";
const CACHE_KEY = "max-gh-stars";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

const GitHubStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    // Check cache first
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { count, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setStars(count);
          return;
        }
      }
    } catch {}

    // Fetch from GitHub API
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ count: data.stargazers_count, ts: Date.now() })
            );
          } catch {}
        }
      })
      .catch(() => {}); // Silently fail — badge just won't show
  }, []);

  if (stars === null) return null;

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-border hover:border-primary/30 text-sm font-heading font-medium text-muted-foreground hover:text-foreground transition-all backdrop-blur-sm"
    >
      <Star className="w-3.5 h-3.5 text-accent fill-accent" />
      <span className="text-foreground font-semibold">{formatCount(stars)}</span>
      <span className="hidden sm:inline text-muted-foreground/70">stars on GitHub</span>
    </a>
  );
};

export default GitHubStars;

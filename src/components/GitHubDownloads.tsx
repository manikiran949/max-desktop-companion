import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const REPO = "M-SRIKAR-VARDHAN/MAX-Desktop-Companion";
const CACHE_KEY = "max-gh-downloads";
const CACHE_TTL = 1000 * 60 * 30;

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toString();
}

const GitHubDownloads = () => {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { count, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setDownloads(count);
          return;
        }
      }
    } catch {}

    fetch(`https://api.github.com/repos/${REPO}/releases`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          let total = 0;
          for (const release of data) {
            if (Array.isArray(release.assets)) {
              for (const asset of release.assets) {
                total += asset.download_count || 0;
              }
            }
          }
          setDownloads(total);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ count: total, ts: Date.now() }));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  if (downloads === null || downloads === 0) return null;

  return (
    <a
      href={`https://github.com/${REPO}/releases/latest`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-border hover:border-primary/30 text-sm font-heading font-medium text-muted-foreground hover:text-foreground transition-all backdrop-blur-sm"
    >
      <Download className="w-3.5 h-3.5 text-primary" />
      <span className="text-foreground font-semibold">{formatCount(downloads)}</span>
      <span className="hidden sm:inline text-muted-foreground/70">downloads</span>
    </a>
  );
};

export default GitHubDownloads;

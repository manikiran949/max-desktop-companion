# MAX Desktop Companion — Website

The official website for [MAX Desktop Companion](https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion) — a tiny guardian from a dying planet who crashed onto your desktop and refuses to leave.

🌐 **Live:** [max-desktop-companion.vercel.app](https://max-desktop-companion.vercel.app)

---

## ✨ What This Is

A cinematic, single-page marketing site that tells MAX's story and showcases his 45+ features. Built with a dark cosmic aesthetic, scroll-driven parallax effects, and a custom cursor trail.

### Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated intro with download CTA, GitHub stars badge, and stats bar |
| **How It Works** | 3-step install flow |
| **Showcase** | GIF demos organized by category — movement, tools, secrets, wisdom |
| **Features** | Full 45+ feature grid grouped into 4 categories |
| **Secret Codes** | Hidden terminal commands with a faux terminal UI |
| **Lore** | Animated timeline of MAX's origin story |
| **FAQ** | Accordion-style common questions |
| **Team** | Creator profiles with LinkedIn links |
| **Footer** | Social sharing, GitHub CTA, and a closing quote |

### Visual Effects

- 🌌 **Cosmic Canvas Background** — animated starfield with shooting stars and nebula glows
- 🖱️ **Cursor Trail** — glowing particle trail that follows your mouse
- 📜 **Scroll Parallax** — layered depth across hero, lore, and footer sections
- 🪐 **Custom 404** — themed "lost in space" error page

---

---

## 📂 Project Structure

```
src/
├── assets/              # Static images (MAX hero sprite)
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── CosmicBackground # Animated starfield canvas
│   ├── CursorTrail      # Mouse-following particle effect
│   ├── Navbar           # Sticky navigation bar
│   ├── HeroSection      # Main CTA + download
│   ├── HowItWorksSection
│   ├── ShowcaseSection   # GIF demos
│   ├── FeaturesSection   # 45+ feature grid
│   ├── SecretCodesSection
│   ├── LoreSection       # Origin story timeline
│   ├── FAQSection
│   ├── TeamSection
│   ├── FooterSection
│   └── GitHubStars       # Live star count badge
├── pages/
│   ├── Index.tsx         # Main landing page
│   └── NotFound.tsx      # Custom 404
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── index.css            # Global styles + design tokens
```

---

## 📄 License

This is the website for [MAX Desktop Companion](https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion). See the main repo for license details.

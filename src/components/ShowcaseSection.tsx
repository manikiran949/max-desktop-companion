import { motion } from "framer-motion";

const BASE = "https://github.com/M-SRIKAR-VARDHAN/MAX-Desktop-Companion/raw/main/assets";

const showcases = [
  {
    category: "He Moves.",
    quote: "Not all battles are fought for victory. Some are fought to tell that someone was there on the battlefield.",
    items: [
      { gif: `${BASE}/push.gif`, title: "Push", desc: "He pushes your windows around. Like they're furniture. Like they belong to him now." },
      { gif: `${BASE}/follow.gif`, title: "Follow", desc: "He follows your cursor. Wherever you go, he goes. Try to lose him. You can't." },
      { gif: `${BASE}/gravity.gif`, title: "Physics", desc: "Think of it like a Mario world but on your desktop — windows are obstacles and walls that provide footing." },
    ],
  },
  {
    category: "He's Useful.",
    quote: "If I am worth something later, then I am worth something now. For wheat is wheat, even when people think it is grass.",
    items: [
      { gif: `${BASE}/screenshort.gif`, title: "Screenshots", desc: "One click. Saved. No apps, no shortcuts to memorize." },
      { gif: `${BASE}/IP_DISK.gif`, title: "System Info", desc: "Your IP, disk usage — things Windows buries 5 menus deep. MAX shows in one." },
      { gif: `${BASE}/port_kill.gif`, title: "Kill Process", desc: "A process froze. A port is blocked. MAX kills it. No Task Manager needed." },
      { gif: `${BASE}/battery_color_picker.gif`, title: "Color & Battery", desc: "Pick any color from any pixel. Check battery health. The small things that shouldn't be hard." },
    ],
  },
  {
    category: "He Has Secrets.",
    quote: "The Gita wasn't spoken at a table. It was spoken on a battlefield.",
    items: [
      { gif: `${BASE}/cheat.gif`, title: "Secret Codes", desc: "Just start typing. No text box. No clicks needed. MAX is always listening." },
      { gif: `${BASE}/oracle.gif`, title: "Hidden Terminal", desc: "Type 'lore' to learn where he came from. Type 'wisdom' for something you weren't ready to hear." },
    ],
  },
  {
    category: "He Thinks.",
    quote: "Water which is too pure has no fish. Don't aim to be perfect — aim to be real.",
    items: [
      { gif: `${BASE}/wisdom.gif`, title: "Wisdom", desc: "Leave him alone long enough and he'll sit down, look at the edge of your screen, and say something that makes you pause. These aren't random quotes — they're thoughts written at 3 AM by the person who built him." },
    ],
  },
];

const ShowcaseSection = () => {
  return (
    <section id="showcase" className="relative py-28 px-4">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-heading font-semibold tracking-widest uppercase">See Him In Action</span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-foreground mt-3 mb-4">
            Watch MAX <span className="text-primary text-glow-cyan">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Not just a static icon. MAX is alive — pushing, following, thinking, and surprising you.
          </p>
        </motion.div>

        <div className="space-y-28">
          {showcases.map((section, si) => (
            <div key={section.category}>
              {/* Section heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  {section.category}
                </h3>
                <blockquote className="text-muted-foreground/60 italic text-sm border-l-2 border-primary/30 pl-4">
                  "{section.quote}"
                </blockquote>
              </motion.div>

              {/* GIF cards */}
              <div className={`grid gap-6 ${
                section.items.length === 1 ? "grid-cols-1 max-w-3xl" :
                section.items.length === 2 ? "md:grid-cols-2" :
                section.items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : ""
              }`}>
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all ${
                      section.items.length === 1 ? "" :
                      section.items.length === 4 && i === 3 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    {/* GIF container */}
                    <div className="relative aspect-video bg-background overflow-hidden">
                      <img
                        src={item.gif}
                        alt={`MAX ${item.title} demo`}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Text */}
                    <div className="p-5">
                      <h4 className="font-heading font-bold text-foreground text-lg mb-1.5">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;

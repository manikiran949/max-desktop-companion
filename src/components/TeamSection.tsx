import { motion } from "framer-motion";
import { Github, Linkedin, Quote } from "lucide-react";

const founder = {
  name: "Srikar Vardhan Mangadoddi",
  role: "Founder · Lead Developer · The reason MAX exists",
  school: "NIT Silchar",
  github: "https://github.com/M-SRIKAR-VARDHAN",
  linkedin: "https://linkedin.com/in/srikar-vardhan",
  quote: "I wrote MAX because I wanted something alive on my desktop. Not a widget. Not a shortcut bar. Something with a soul. Something that thinks.",
  initials: "SV",
};

const team = [
  { name: "Batchu Mani Kiran", role: "Developer & Engineer", school: "NIT Silchar", initials: "MK" },
  { name: "Chukka Abhinay", role: "Art · Design · Creative Direction", school: "NIT Silchar", initials: "CA" },
  { name: "Sangam Sai Anish", role: "Ideation · Strategy · Marketing", school: "NIT Silchar", initials: "SA" },
  { name: "K N V Hemanth Sai Kumar", role: "Developer", school: "NIT Silchar", initials: "HS" },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative py-28 px-4">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-heading font-semibold tracking-widest uppercase">The Creators</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3">
            Who Built This
          </h2>
        </motion.div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-primary/30 bg-card p-8 box-glow-cyan mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-3xl font-heading font-bold text-primary shrink-0">
              {founder.initials}
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-heading font-bold text-foreground">{founder.name}</h3>
              <p className="text-primary font-medium mt-1 text-sm">{founder.role}</p>
              <p className="text-muted-foreground/60 text-xs mt-1">{founder.school}</p>
              <div className="mt-4 flex items-start gap-2">
                <Quote className="w-4 h-4 text-primary/40 shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm italic leading-relaxed">{founder.quote}</p>
              </div>
              <div className="flex gap-3 mt-4 justify-center md:justify-start">
                <a href={founder.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 flex items-center gap-4 hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-heading font-bold text-muted-foreground shrink-0">
                {member.initials}
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-semibold text-foreground text-sm truncate">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/50">{member.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

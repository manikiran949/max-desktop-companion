import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const team = [
  {
    name: "Srikar Vardhan M.",
    role: "Founder · Lead Developer",
    school: "NIT Silchar",
    github: "https://github.com/M-SRIKAR-VARDHAN",
    linkedin: "https://linkedin.com/in/srikar-vardhan",
    highlight: true,
  },
  {
    name: "Batchu Mani Kiran",
    role: "Developer & Engineer",
    school: "NIT Silchar",
    linkedin: "#",
  },
  {
    name: "Chukka Abhinay",
    role: "Art · Design · Creative Direction",
    school: "NIT Silchar",
    linkedin: "#",
  },
  {
    name: "Sangam Sai Anish",
    role: "Ideation · Strategy · Marketing",
    school: "NIT Silchar",
    linkedin: "#",
  },
  {
    name: "K N V Hemanth Sai Kumar",
    role: "Developer",
    school: "NIT Silchar",
    linkedin: "#",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative py-32 px-4">
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold text-center text-primary text-glow-cyan mb-16"
        >
          Who Built This
        </motion.h2>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-primary/30 bg-card p-8 box-glow-cyan text-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center text-3xl font-heading font-bold text-primary">
            S
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground">{team[0].name}</h3>
          <p className="text-primary font-medium mt-1">{team[0].role}</p>
          <p className="text-muted-foreground text-sm mt-1">{team[0].school}</p>
          <p className="text-muted-foreground/70 text-sm mt-4 max-w-md mx-auto italic">
            "I wrote MAX because I wanted something alive on my desktop. Not a widget. Not a shortcut bar. Something with a soul."
          </p>
          <div className="flex gap-3 justify-center mt-4">
            <a href={team[0].github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={team[0].linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Rest of team */}
        <div className="grid sm:grid-cols-2 gap-4">
          {team.slice(1).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-glow bg-card p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-heading font-bold text-muted-foreground shrink-0">
                {member.name[0]}
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-semibold text-foreground truncate">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/60">{member.school}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

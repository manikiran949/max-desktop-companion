import { motion } from "framer-motion";
import { Github, Linkedin, Quote } from "lucide-react";

const founder = {
  name: "Srikar Vardhan Mangadoddi",
  role: "Founder · Lead Developer · The reason MAX exists",
  school: "NIT Silchar",
  github: "https://github.com/M-SRIKAR-VARDHAN",
  linkedin: "https://linkedin.com/in/srikar-vardhan",
  quote: "I wrote MAX because I wanted something alive on my desktop. Not a widget. Not a shortcut bar. Something with a soul. Something that thinks.",
  initials: "SV",  image: "https://media.licdn.com/dms/image/v2/D5603AQEkHfonmAsYZg/profile-displayphoto-shrink_800_800/B56ZpyNtrgI0Ag-/0/1762852791893?e=1776297600&v=beta&t=GdU1GbWCcLiYJ45LwW_Abzud1z28edEYtgXzjiGYdR0"};

const team = [
  { name: "Batchu Mani Kiran", role: "Developer & Engineer", school: "NIT Silchar", initials: "MK", linkedin: "https://www.linkedin.com/in/mani-kiran-batchu-4885b1249/", image: "https://media.licdn.com/dms/image/v2/D5603AQEf09bbtx-FqQ/profile-displayphoto-crop_800_800/B56ZzqwAyIJIAI-/0/1773464982710?e=1776297600&v=beta&t=BCK6-GOpdl-Smg6fcYvQj2tIjdePkmKXfyKq0At3fNM" },
  { name: "Chukka Abhinay", role: "Art · Design · Creative Direction", school: "NIT Silchar", initials: "CA", linkedin: "https://www.linkedin.com/in/chukka-abhinay-164056258/", image: "https://media.licdn.com/dms/image/v2/D5603AQEP42Lk-OEgcQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719997686865?e=1776297600&v=beta&t=4WomPWyhXvEeGurG8azL49TL_Q4MCoSTRpBnRggkItI" },
  { name: "Sangam Sai Anish", role: "Ideation · Strategy · Marketing", school: "NIT Silchar", initials: "SA", linkedin: "https://www.linkedin.com/in/sangamsaianish/", image: "https://media.licdn.com/dms/image/v2/D5603AQHmLJMc4Bo6tQ/profile-displayphoto-crop_800_800/B56Zv1gTDZH4AI-/0/1769350448180?e=1776297600&v=beta&t=Daa1slyuxT9o2ziFH4fSgXLFTwn9FhbiqDzis56DYsg" },
  { name: "K N V Hemanth Sai Kumar", role: "Developer", school: "NIT Silchar", initials: "HS", linkedin: "https://www.linkedin.com/in/hemanth-sai-kumar-knv-a62101258/", image: "https://media.licdn.com/dms/image/v2/D5603AQHoJ1bi751tIg/profile-displayphoto-crop_800_800/B56ZwEI7H9HIAI-/0/1769595978953?e=1776297600&v=beta&t=p9qYqn_TCkkgxThDz7tFD8Y4_3v-Rux3IGzz1kH2Ydk" },
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
          className="rounded-xl border border-primary/20 bg-card p-5 flex items-center gap-4 box-glow-cyan mb-4 max-w-[460px] mx-auto hover:border-primary/40 transition-all hover:scale-[1.02]"
        >
          {founder.image ? (
              <img 
                src={founder.image} 
                alt={founder.name} 
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-primary/30"
              />
          ) : (
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-heading font-bold text-muted-foreground shrink-0 border border-border/50">
                {founder.initials}
              </div>
          )}
          <div className="min-w-0 flex-1 text-left">
            <h4 className="font-heading font-semibold text-foreground text-sm truncate">{founder.name}</h4>
            <p className="text-xs text-primary/80 truncate">{founder.role}</p>
            <p className="text-xs text-muted-foreground/50 truncate">{founder.school}</p>
          </div>
          <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all shrink-0">
            <Linkedin className="w-4 h-4" />
          </a>
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
              className="rounded-xl border border-primary/20 bg-card p-5 flex items-center gap-4 box-glow-cyan hover:border-primary/40 transition-all hover:scale-[1.02]"
            >
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-heading font-bold text-muted-foreground shrink-0 border border-border/50">
                  {member.initials}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-heading font-semibold text-foreground text-sm truncate">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/50">{member.school}</p>
              </div>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all shrink-0">
                <Linkedin className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

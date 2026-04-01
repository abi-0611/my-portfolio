"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface Skill {
  _id?: string;
  name: string;
  level: number;
  category?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillBarsProps {
  skills?: Skill[];
}

function AnimatedProgress({ level, delay }: { level: number; delay: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setValue(level), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, level, delay]);

  return (
    <div ref={ref}>
      <Progress
        value={value}
        className="h-2 bg-muted/30 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500"
      />
    </div>
  );
}

export function SkillBars({ skills = [] }: SkillBarsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = useMemo<SkillCategory[]>(() => {
    const map = new Map<string, Skill[]>();
    for (const skill of skills) {
      const cat = skill.category ?? "Other";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(skill);
    }
    return Array.from(map.entries()).map(([category, skills]) => ({ category, skills }));
  }, [skills]);

  return (
    <section ref={ref} className="py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
        Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: catIdx * 0.15 }}
          >
            <h3 className="text-lg font-bold text-foreground mb-6">
              {cat.category}
            </h3>
            <div className="space-y-4">
              {cat.skills.map((skill, skillIdx) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <AnimatedProgress
                    level={skill.level}
                    delay={catIdx * 0.15 + skillIdx * 0.1}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

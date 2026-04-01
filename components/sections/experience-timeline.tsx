"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExperienceItem {
  _id?: string;
  id?: number;
  role: string;
  company: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  description: string[];
  techStack: string[];
}

function formatMonth(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getDuration(item: ExperienceItem): string {
  if (item.duration) return item.duration;
  if (item.startDate) {
    const end = item.endDate ? formatMonth(item.endDate) : "Present";
    return `${formatMonth(item.startDate)} – ${end}`;
  }
  return "";
}

function TimelineItem({
  item,
  index,
}: {
  item: ExperienceItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className={cn(
        "relative flex items-start gap-8 mb-12",
        "md:w-1/2",
        isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
      )}
    >
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute top-2 w-4 h-4 rounded-full bg-purple-500 border-4 border-background z-10",
          isLeft
            ? "md:right-0 md:translate-x-1/2"
            : "md:left-0 md:-translate-x-1/2"
        )}
      />

      {/* Content card */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-xl p-6 w-full hover:border-purple-500/30 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-foreground">{item.role}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
            {getDuration(item)}
          </span>
        </div>
        <p className="text-sm text-purple-400 font-medium mb-3">{item.company}</p>
        <ul className="space-y-1.5 mb-4">
          {item.description.map((point, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">▸</span>
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
}

export function ExperienceTimeline({ experiences = [] }: ExperienceTimelineProps) {
  return (
    <section className="relative py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-16">
        Experience
      </h2>

      {/* Vertical center line (desktop only) */}
      <div className="hidden md:block absolute left-1/2 top-32 bottom-0 w-px bg-border/40" />

      <div className="relative max-w-4xl mx-auto">
        {experiences.map((item, index) => (
          <TimelineItem key={item._id ?? item.id ?? index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}

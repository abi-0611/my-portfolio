"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EducationItem {
  _id?: string;
  id?: number;
  degree: string;
  institution: string;
  duration?: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
  highlights?: string[] | null;
}

interface EducationCardsProps {
  education?: EducationItem[];
}

function getDuration(item: EducationItem): string {
  if (item.duration) return item.duration;
  if (item.startYear) {
    return `${item.startYear} – ${item.endYear ?? "Present"}`;
  }
  return "";
}

function getHighlights(item: EducationItem): string[] {
  return (
    item.highlights?.filter(
      (highlight): highlight is string =>
        typeof highlight === "string" && highlight.trim().length > 0
    ) ?? []
  );
}

export function EducationCards({ education = [] }: EducationCardsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
        Education
      </h2>
      <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
        {education.map((item, index) => {
          const highlights = getHighlights(item);

          return (
            <motion.div
              key={item._id ?? item.id ?? index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-purple-500/30 transition-colors h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{item.degree}</CardTitle>
                  <CardDescription>{item.institution}</CardDescription>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span>{getDuration(item)}</span>
                    {item.grade && (
                      <>
                        <span>•</span>
                        <span className="text-purple-400 font-medium">
                          {item.grade}
                        </span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {highlights.length > 0 ? (
                    <ul className="space-y-1">
                      {highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-purple-400 mt-0.5">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

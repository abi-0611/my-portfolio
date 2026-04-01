"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BorderGlow from "@/components/ui/border-glow";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FALLBACK_PROJECTS = [
  {
    _id: "f1",
    title: "AI Image Classifier",
    description:
      "Deep learning model for real-time image classification using TensorFlow and a React frontend — trained on 10k+ images with 94% accuracy.",
    image: "https://placehold.co/700x380/0f0f1a/e0e0e0?text=AI+Classifier",
    category: "AI / ML",
    techStack: ["Python", "TensorFlow", "React", "Flask"],
  },
  {
    _id: "f2",
    title: "Smart Analytics Dashboard",
    description:
      "Full-stack analytics platform with real-time data visualisation, ML-powered trend predictions, and role-based authentication.",
    image: "https://placehold.co/700x380/0f0f1a/e0e0e0?text=Dashboard",
    category: "Web Dev",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "D3.js"],
  },
  {
    _id: "f3",
    title: "NLP Chatbot",
    description:
      "Conversational AI chatbot with context-aware natural language understanding, multilingual support, and live streaming responses.",
    image: "https://placehold.co/700x380/0f0f1a/e0e0e0?text=NLP+Bot",
    category: "AI / ML",
    techStack: ["Python", "PyTorch", "FastAPI", "React"],
  },
  {
    _id: "f4",
    title: "Portfolio Website",
    description:
      "This very portfolio — built with Next.js 16, featuring animated UI components, Sanity CMS integration, and GSAP scroll effects.",
    image: "https://placehold.co/700x380/0f0f1a/e0e0e0?text=Portfolio",
    category: "Web Dev",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity"],
  },
];

interface FeaturedProject {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  techStack?: string[];
}

interface FeaturedProjectsSectionProps {
  projects?: FeaturedProject[];
  sectionTitle?: string | null;
}

export function FeaturedProjectsSection({
  projects = [],
  sectionTitle,
}: FeaturedProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const displayProjects = useMemo(
    () => (projects.length > 0 ? projects : FALLBACK_PROJECTS),
    [projects]
  );

  const active = displayProjects[activeIndex];

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const prev = () => activeIndex > 0 && goTo(activeIndex - 1);
  const next = () =>
    activeIndex < displayProjects.length - 1 && goTo(activeIndex + 1);

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1 font-medium">
              Selected Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {sectionTitle ?? "Featured Projects"}
            </h2>
          </div>
          <span className="font-mono text-sm text-muted-foreground tabular-nums pb-1">
            {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
            {String(displayProjects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Project card */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="80 40 120"
          backgroundColor="transparent"
          borderRadius={20}
          glowRadius={50}
          glowIntensity={0.9}
          coneSpread={25}
          animated={false}
          colors={["#c084fc", "#f472b6", "#38bdf8"]}
          fillOpacity={0.25}
        >
          <div className="overflow-hidden rounded-[18px] bg-card/40 backdrop-blur-sm">
            {/* Image */}
            <div className="relative h-[260px] md:h-[300px] overflow-hidden bg-black/20">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={active?._id ?? activeIndex}
                  custom={direction}
                  initial={{ x: direction * 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction * -60, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.32, 0, 0.67, 0] }}
                  src={
                    active?.image ??
                    `https://placehold.co/700x380/0f0f1a/e0e0e0?text=${encodeURIComponent(
                      active?.title ?? "Project"
                    )}`
                  }
                  alt={active?.title ?? "Project"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {active?.category && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                  {active.category}
                </span>
              )}
            </div>

            {/* Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active?._id ?? activeIndex}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.26 }}
                className="p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {active?.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                  {active?.description}
                </p>
                {active?.techStack && active.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {active.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </BorderGlow>

        {/* Navigation row */}
        <div className="mt-5 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {displayProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-purple-400"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-card/40 text-muted-foreground transition hover:border-purple-500/40 hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              disabled={activeIndex === displayProjects.length - 1}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-card/40 text-muted-foreground transition hover:border-purple-500/40 hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>


      </motion.div>
    </section>
  );
}


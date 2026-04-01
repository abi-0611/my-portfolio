"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiX } from "react-icons/fi";
import BorderGlow from "@/components/ui/border-glow";
import { useHydrated } from "@/lib/hooks/use-hydrated";

interface Project {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  techStack: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function toBullets(text: string): string[] {
  const byLine = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  if (byLine.length > 1) return byLine;
  return text
    .split(/\.\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const hydrated = useHydrated();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const bullets = project
    ? toBullets(project.longDescription || project.description)
    : [];

  const cardId = project
    ? `modal-${project._id ?? project.id ?? project.title}`
    : "";

  const modal = (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="project-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              key={cardId}
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="pointer-events-auto w-full max-w-lg"
              style={{ borderRadius: 24 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="80 40 120"
                backgroundColor="transparent"
                borderRadius={24}
                glowRadius={60}
                glowIntensity={1.2}
                coneSpread={30}
                animated={false}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
                fillOpacity={0.35}
              >
                <div
                  className="overflow-hidden rounded-[22px] bg-neutral-950 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
                  style={{ maxHeight: "86vh", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#4a4a4a transparent" }}
                >
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  >
                    <FiX className="w-4 h-4" />
                  </button>

                  <div className="relative h-[220px] md:h-[260px] overflow-hidden bg-black/20">
                    {project.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-700 text-sm">No image</div>
                    )}
                    {project.category && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                        {project.category}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground leading-tight mb-4 pr-8">{project.title}</h3>
                    <ul className="space-y-2.5 mb-5">
                      {bullets.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {project.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="h-px bg-white/8 mb-4" />
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                      >
                        <FiGithub className="w-5 h-5" />
                        <span>View on GitHub</span>
                      </a>
                    ) : (
                      <p className="text-neutral-700 text-xs">No GitHub link</p>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return hydrated ? createPortal(modal, document.body) : null;
}


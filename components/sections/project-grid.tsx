"use client";

import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import BorderGlow from "@/components/ui/border-glow";
import { ProjectFilter } from "@/components/sections/project-filter";
import { ProjectModal } from "@/components/sections/project-modal";

const MagicBento = dynamic(() => import("@/components/ui/magic-bento"), {
  ssr: false,
});

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

interface ProjectGridProps {
  projects?: Project[];
}

export function ProjectGrid({ projects = [] }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category))).filter(Boolean)],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <>
      <ProjectFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <MagicBento
            enableSpotlight={true}
            enableStars={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project._id ?? project.id ?? idx}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
                style={{ borderRadius: 20 }}
              >
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
                    <div className="relative h-[280px] md:h-[320px] overflow-hidden bg-black/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          project.images?.[0] ??
                          `https://placehold.co/700x380/0f0f1a/e0e0e0?text=${encodeURIComponent(project.title)}`
                        }
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {project.category && (
                        <span className="absolute top-4 left-4 z-10 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                          {project.category}
                        </span>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
                        {project.description}
                      </p>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              +{project.techStack.length - 5}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </MagicBento>
        </motion.div>
      </AnimatePresence>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

import { ProjectGrid } from "@/components/sections/project-grid";
import { getAllProjects } from "@/lib/queries";

export const metadata = {
  title: "Projects",
  description: "Explore Abishek's projects in AI/ML, web development, data science, and more.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main id="main-content" className="relative z-10 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">
          Projects
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A showcase of my work across AI/ML, web development, and data science.
        </p>
        <ProjectGrid projects={projects} />
      </div>
    </main>
  );
}

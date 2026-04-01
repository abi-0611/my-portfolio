"use client";

import { motion } from "framer-motion";
import { LogoSlider } from "@/components/ui/logo-slider";
import {
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiGit,
} from "react-icons/si";

const techLogos = [
  <SiPython key="python" className="w-10 h-10" />,
  <SiTensorflow key="tf" className="w-10 h-10" />,
  <SiPytorch key="pytorch" className="w-10 h-10" />,
  <SiReact key="react" className="w-10 h-10" />,
  <SiNextdotjs key="next" className="w-10 h-10" />,
  <SiTypescript key="ts" className="w-10 h-10" />,
  <SiTailwindcss key="tw" className="w-10 h-10" />,
  <SiDocker key="docker" className="w-10 h-10" />,
  <SiGit key="git" className="w-10 h-10" />,
];

export function TechStackSection({ sectionTitle }: { sectionTitle?: string | null }) {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
          {sectionTitle ?? "Tech Stack"}
        </h2>
        <LogoSlider
          logos={techLogos}
          speed={20}
          direction="left"
          showBlur={true}
          pauseOnHover={true}
        />
      </motion.div>
    </section>
  );
}

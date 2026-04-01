"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          aria-pressed={activeCategory === category}
          className={cn(
            "relative px-5 py-2 text-sm font-medium rounded-full transition-colors",
            activeCategory === category
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeCategory === category && (
            <motion.span
              layoutId="activeFilter"
              className="absolute inset-0 rounded-full bg-foreground/10 border border-border/40"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}

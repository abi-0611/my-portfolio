"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { ArrowRight } from "lucide-react";

export function AboutMeSection() {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  // Scroll-based fade in at entry and fade out at exit
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.72, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.14, 0.72, 1], [48, 0, 0, -48]);

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Subtle background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/10 via-transparent to-cyan-900/10"
      />

      <motion.div
        style={{ opacity, y }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20"
      >
        {/* Left — bio */}
        <div className="flex-1 text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4 font-medium">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Hi, I&apos;m Abishek.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
            A pre-final year{" "}
            <span className="text-foreground font-medium">AI &amp; Data Science</span>{" "}
            engineering student who loves building at the intersection of intelligent systems
            and beautiful interfaces. From training neural networks to shipping full-stack
            applications — I&apos;m always learning what&apos;s next.
          </p>
        </div>

        {/* Right — CTA */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-end justify-center md:pt-16 gap-3">
          <p className="text-[11px] text-muted-foreground/50 uppercase tracking-widest">
            Learn more
          </p>
          <LiquidMetalButton
            icon={<ArrowRight className="w-4 h-4" />}
            size="md"
            metalConfig={{
              colorBack: "#7c3aed",
              colorTint: "#c084fc",
              speed: 0.5,
            }}
            onClick={() => router.push("/about")}
          >
            About Me
          </LiquidMetalButton>
        </div>
      </motion.div>
    </section>
  );
}

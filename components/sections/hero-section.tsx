"use client";

import { useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextType from "@/components/ui/text-type";

const DEFAULT_TITLE = "Hello! Welcome to my portfolio";
const DEFAULT_SUBTEXT =
  "pre final year engineering student and an ai enthusiast who likes to learn about trending tools and build applications";

const FlipChar = memo(function FlipChar({
  char,
  delay,
}: {
  char: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ rotateX: 90, opacity: 0, filter: "blur(6px)" }}
      animate={{ rotateX: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.48, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
      style={{ transformStyle: "preserve-3d", display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
});

function FlipReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const wordStartIndices = words.map((_, index) =>
    words
      .slice(0, index)
      .reduce((total, word) => total + word.length + 1, 0)
  );

  return (
    <div
      className={`flex flex-wrap justify-center leading-tight ${className ?? ""}`}
      style={{ perspective: "1400px" }}
    >
      {words.map((word, wi) => {
        const wordStart = wordStartIndices[wi];
        return (
          <span key={wi} className="flex mr-[0.3em] last:mr-0">
            {word.split("").map((char, ci) => (
              <FlipChar key={ci} char={char} delay={(wordStart + ci) * 0.028} />
            ))}
          </span>
        );
      })}
    </div>
  );
}

interface HeroSectionProps {
  title?: string | null;
  subtext?: string | null;
}

export function HeroSection({ title, subtext }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  const heroTitle = title || DEFAULT_TITLE;
  const heroSubtext = subtext || DEFAULT_SUBTEXT;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <motion.div style={{ opacity, y }} className="max-w-6xl w-full">
        {/* Headline — one-shot flip-fade per letter */}
        <div className="mb-8">
          <FlipReveal
            text={heroTitle}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-foreground gap-y-2"
          />
        </div>

        {/* Typing subtext, starts after headline completes (~1.3 s) */}
        <div className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed min-h-[2em]">
          <TextType
            text={heroSubtext}
            typingSpeed={38}
            initialDelay={1500}
            loop={false}
            showCursor={true}
            cursorCharacter="_"
            startOnVisible={false}
          />
        </div>
      </motion.div>
    </section>
  );
}

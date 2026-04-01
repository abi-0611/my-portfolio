"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const DEFAULT_BIO = [
  "I'm Abishek, a pre-final year AI & Data Science engineering student with a passion for building intelligent systems and beautiful web experiences. I specialize in machine learning, deep learning, and full-stack development.",
  "When I'm not training models or shipping features, I contribute to open-source projects and explore the intersection of AI and creative coding. I believe in crafting software that is both technically rigorous and delightful to use.",
  "Currently seeking opportunities in AI/ML engineering and full-stack development where I can make a meaningful impact.",
];
const DEFAULT_INTERESTS = ["AI/ML Engineering", "Full-Stack Development", "Open Source", "Research"];

interface AboutBioProps {
  sectionHeading?: string | null;
  name?: string | null;
  profilePhoto?: {
    _type?: "image";
    asset?: {
      _ref?: string;
      _type?: "reference";
    };
    crop?: {
      _type?: "sanity.imageCrop";
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    hotspot?: {
      _type?: "sanity.imageHotspot";
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
  } | null;
  bio?: string[] | null;
  interests?: string[] | null;
}

export function AboutBio({
  sectionHeading,
  name,
  profilePhoto,
  bio,
  interests,
}: AboutBioProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayName = name || "Abishek";
  const profilePhotoUrl = profilePhoto?.asset
    ? urlFor(profilePhoto).width(640).height(640).fit("crop").url()
    : null;
  const displayBio = bio && bio.length > 0 ? bio : DEFAULT_BIO;
  const displayInterests = interests && interests.length > 0 ? interests : DEFAULT_INTERESTS;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} className="py-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center md:items-start max-w-5xl mx-auto"
      >
        {/* Profile Image — 2 columns */}
        <motion.div variants={item} className="md:col-span-2 flex justify-center md:justify-start md:self-start">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 rounded-2xl overflow-hidden border border-border/40 bg-muted/20">
            {profilePhotoUrl && (
              <Image
                src={profilePhotoUrl}
                alt={displayName}
                fill
                className="object-cover object-center transition-all duration-700"
                sizes="(max-width: 768px) 256px, 320px"
                priority
              />
            )}
            {/* Fallback gradient shown when image is absent */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/40 via-background to-background flex items-center justify-center">
              <span className="text-6xl font-heading font-bold text-purple-500/30">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Bio Text — 3 columns */}
        <div className="md:col-span-3 space-y-4">
          <motion.h1
            variants={item}
            className="text-3xl md:text-4xl font-heading font-bold text-foreground"
          >
            {sectionHeading ?? "About Me"}
          </motion.h1>

          {displayBio.map((paragraph, i) => (
            <motion.p key={i} variants={item} className="text-muted-foreground leading-relaxed">
              {i === 0 ? (
                <>
                  I&apos;m{" "}
                  <span className="text-foreground font-medium">{displayName}</span>
                  {paragraph.replace(/^I'm\s+\w+,?\s*/i, ", ")}
                </>
              ) : (
                paragraph
              )}
            </motion.p>
          ))}

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            {displayInterests.map((interest) => (
              <span
                key={interest}
                className="text-sm px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {interest}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

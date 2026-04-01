"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostContentProps {
  title: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  content: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostContent({
  title,
  publishedAt,
  readingTime,
  tags,
  content,
}: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      {/* Back link */}
      <Link
        href="/about"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to About
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        {title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/40">
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        <span>•</span>
        <span>{readingTime}</span>
      </div>

      {/* Content — plain text for now; Phase 7 replaces with PortableText */}
      <div className="prose prose-invert prose-purple max-w-none">
        {content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.article>
  );
}

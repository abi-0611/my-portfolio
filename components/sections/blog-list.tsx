"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlogPost {
  _id?: string;
  slug: string | { current: string };
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string | number;
  tags: string[];
}

interface BlogListProps {
  posts?: BlogPost[];
}

function getSlug(slug: string | { current: string }): string {
  return typeof slug === "string" ? slug : slug.current;
}

function getReadingTime(rt: string | number): string {
  if (typeof rt === "number") return `${rt} min read`;
  return rt;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogList({ posts = [] }: BlogListProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
        Blog
      </h2>

      <div className="max-w-3xl mx-auto space-y-8">
        {posts.map((post, index) => (
          <motion.article
            key={post._id ?? getSlug(post.slug)}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/about/blog/${getSlug(post.slug)}`}
              className="group block p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-purple-500/30 hover:bg-card/50 transition-all"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors mb-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span>•</span>
                <span>{getReadingTime(post.readingTime)}</span>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

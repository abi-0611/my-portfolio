import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post: { slug: { current: string } | string }) => ({
    slug: typeof post.slug === "string" ? post.slug : post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500 pl-4 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-muted-foreground mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-muted/50 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-8 rounded-xl overflow-hidden">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="w-full object-cover"
          />
        </div>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main id="main-content" className="relative z-10 min-h-screen px-6 py-12">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <a
          href="/about"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Blog
        </a>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/40">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={450}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        {post.body ? (
          <div className="prose-like">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        ) : post.excerpt ? (
          <p className="text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
        ) : null}
      </article>
    </main>
  );
}


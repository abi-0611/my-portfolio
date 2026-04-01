import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
    "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];

  try {
    const posts = await getAllBlogPosts();
    const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post: { slug: { current: string }; publishedAt?: string }) => ({
      url: `${siteUrl}/about/blog/${post.slug.current}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}

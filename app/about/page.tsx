import { AboutBio } from "@/components/sections/about-bio";
import { BlogList } from "@/components/sections/blog-list";
import { getAllBlogPosts, getAboutPage } from "@/lib/queries";

export const metadata = {
  title: "About & Blog",
  description: "Learn more about Abishek and read his blog on AI, ML, and web development.",
};

export default async function AboutPage() {
  const [posts, aboutPage] = await Promise.all([getAllBlogPosts(), getAboutPage()]);

  return (
    <main id="main-content" className="relative z-10 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <AboutBio
          sectionHeading={aboutPage?.sectionHeading}
          name={aboutPage?.name}
          profilePhoto={aboutPage?.profilePhoto}
          bio={aboutPage?.bio}
          interests={aboutPage?.interests}
        />
        <BlogList posts={posts} />
      </div>
    </main>
  );
}

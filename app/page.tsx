import { HeroSection } from "@/components/sections/hero-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { getFeaturedProjects, getHomePage } from "@/lib/queries";

export default async function Home() {
  const [featuredProjects, homePage] = await Promise.all([
    getFeaturedProjects(),
    getHomePage(),
  ]);

  return (
    <main id="main-content" className="relative z-10">
      {/* Section 1: Hero — flip-fade title + typing subtext + scroll exit */}
      <HeroSection
        title={homePage?.heroTitle}
        subtext={homePage?.heroSubtext}
      />

      {/* Section 2: Scroll reveal text */}
      <section className="py-32 px-6 max-w-5xl mx-auto text-[7.5px] md:text-[10.5px] lg:text-[18px] font-bold">
        <ScrollReveal
          baseOpacity={0.5}
          enableBlur={true}
          baseRotation={6}
          blurStrength={5}
        >
          {homePage?.scrollRevealText ??
            "Scroll down to explore my projects, experience, and the journey behind the code."}
        </ScrollReveal>
      </section>

      {/* Section 3: Featured Projects — clean card carousel + View My Work CTA */}
      <FeaturedProjectsSection
        projects={featuredProjects}
        sectionTitle={homePage?.featuredProjectsTitle}
      />

      {/* Section 4: Tech Stack slider */}
      <TechStackSection sectionTitle={homePage?.techStackTitle} />
    </main>
  );
}

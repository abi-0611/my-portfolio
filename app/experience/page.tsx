import { EducationCards } from "@/components/sections/education-cards";
import { CertificationsCarousel } from "@/components/sections/certifications-carousel";
import { SkillBars } from "@/components/sections/skill-bars";
import {
  getAllEducation,
  getAllCertifications,
  getAllSkills,
} from "@/lib/queries";

export const metadata = {
  title: "Education",
  description: "Abishek's education, certifications, and technical skills.",
};

export default async function EducationPage() {
  const [education, certifications, skills] = await Promise.all([
    getAllEducation(),
    getAllCertifications(),
    getAllSkills(),
  ]);

  return (
    <main id="main-content" className="relative z-10 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <EducationCards education={education} />
        <CertificationsCarousel certifications={certifications} />
        <SkillBars skills={skills} />
      </div>
    </main>
  );
}

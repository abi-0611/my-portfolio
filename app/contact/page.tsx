import { ContactPageClient } from "@/components/sections/contact-page-client";
import { ContactSocial } from "@/components/sections/contact-social";

const socialLinks = {
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL,
  whatsappNumber:
    process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
};

export const metadata = {
  title: "Contact",
  description: "Get in touch with Abishek. Send a message or connect on social media.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="relative z-10 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind, want to collaborate, or just want to say hi?
            Drop me a message below or connect on social media.
          </p>
        </div>

        {/* Social Links Dock */}
        <ContactSocial links={socialLinks} />

        {/* Contact Me button + floating form card */}
        <ContactPageClient />
      </div>
    </main>
  );
}

"use client";

import GlassDock, { type DockItem } from "@/components/ui/glass-dock";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaFileAlt,
  FaWhatsapp,
} from "react-icons/fa";

interface ContactSocialLinks {
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  contactEmail?: string;
  resumeUrl?: string;
  whatsappNumber?: string;
}

function getWhatsAppHref(rawNumber?: string) {
  if (!rawNumber) {
    return null;
  }

  const sanitizedNumber = rawNumber.replace(/\D/g, "");
  return sanitizedNumber ? `https://wa.me/${sanitizedNumber}` : null;
}

export function ContactSocial({ links }: { links: ContactSocialLinks }) {
  const whatsappHref = getWhatsAppHref(links.whatsappNumber);

  const socialItems = [
    links.githubUrl
    ? {
        title: "GitHub",
        icon: FaGithub,
        href: links.githubUrl,
      }
    : null,
    links.linkedinUrl
    ? {
        title: "LinkedIn",
        icon: FaLinkedin,
        href: links.linkedinUrl,
      }
    : null,
    links.instagramUrl
    ? {
        title: "Instagram",
        icon: FaInstagram,
        href: links.instagramUrl,
      }
    : null,
    whatsappHref
    ? {
        title: "WhatsApp",
        icon: FaWhatsapp,
        href: whatsappHref,
      }
    : null,
    links.contactEmail
    ? {
        title: "Email",
        icon: FaEnvelope,
        href: `mailto:${links.contactEmail}`,
      }
    : null,
    links.resumeUrl
    ? {
        title: "Resume",
        icon: FaFileAlt,
        href: links.resumeUrl,
      }
    : null,
  ].filter((item) => item !== null) as DockItem[];

  if (socialItems.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mb-16">
      <GlassDock items={socialItems} />
    </div>
  );
}

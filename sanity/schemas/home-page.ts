import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description: "Main big heading shown in the hero section.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      description: "Typing animation text shown below the hero heading.",
    }),
    defineField({
      name: "scrollRevealText",
      title: "Scroll Reveal Text",
      type: "text",
      rows: 2,
      description: "Bold sentence revealed on scroll, between hero and featured projects.",
    }),
    defineField({
      name: "featuredProjectsTitle",
      title: "Featured Projects Section Title",
      type: "string",
      description: 'Heading above the featured projects carousel (e.g. "Featured Projects").',
    }),
    defineField({
      name: "techStackTitle",
      title: "Tech Stack Section Title",
      type: "string",
      description: 'Heading above the tech stack ticker (e.g. "Tech Stack").',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});

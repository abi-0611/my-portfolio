import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "sectionHeading",
      title: "Section Heading",
      type: "string",
      description: 'Heading shown above your bio (e.g. "About Me").',
    }),
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      description: "Your name as highlighted in the bio text.",
    }),
    defineField({
      name: "profilePhoto",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      description: "Your profile picture shown on the about page.",
    }),
    defineField({
      name: "bio",
      title: "Bio Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Each item is a separate paragraph in your bio.",
    }),
    defineField({
      name: "interests",
      title: "Interest Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags shown as pill badges below your bio (e.g. AI/ML Engineering).",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});

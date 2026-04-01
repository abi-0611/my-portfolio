import { defineType, defineField } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "degree", title: "Degree", type: "string", validation: (r) => r.required() }),
    defineField({ name: "institution", title: "Institution", type: "string", validation: (r) => r.required() }),
    defineField({ name: "startYear", title: "Start Year", type: "number" }),
    defineField({ name: "endYear", title: "End Year", type: "number" }),
    defineField({ name: "grade", title: "Grade / GPA", type: "string" }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

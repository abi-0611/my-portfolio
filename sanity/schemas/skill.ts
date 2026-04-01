import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "level", title: "Level (0-100)", type: "number", validation: (r) => r.min(0).max(100) }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Frontend", "Backend", "Tools & DevOps"],
      },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

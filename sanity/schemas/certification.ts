import { defineType, defineField } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "credentialUrl", title: "Credential URL", type: "url" }),
    defineField({
      name: "badge",
      title: "Badge Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

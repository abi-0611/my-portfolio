import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const singletonTypes = new Set(["homePage", "aboutPage"]);

export default defineConfig({
  name: "abishek-portfolio",
  title: "Abishek Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage")
              ),
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document().schemaType("aboutPage").documentId("aboutPage")
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.has(item.getId() ?? "")
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});

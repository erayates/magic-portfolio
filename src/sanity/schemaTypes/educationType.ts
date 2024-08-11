import { defineField, defineType } from "sanity";

export const educationType = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),

    defineField({
      name: "definition",
      type: "string",
    }),

    defineField({
      name: "definition_tr",
      type: "string",
    }),

    defineField({
      name: "startedAt",
      type: "datetime",
    }),

    defineField({
      name: "endedAt",
      type: "datetime",
    }),

    defineField({
      name: "logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),

    defineField({
      name: "website_url",
      type: "url",
    }),
  ],
});

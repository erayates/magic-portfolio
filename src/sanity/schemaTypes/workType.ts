import { defineField, defineType } from "sanity";

export const workType = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      type: "string",
    }),

    defineField({
      name: "job",
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
      name: "companyLogo",
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

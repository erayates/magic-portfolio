import { defineField, defineType } from "sanity";

export const personalType = defineType({
  name: "personal",
  title: "Personal Info",
  type: "document",
  fields: [
    defineField({
      name: "fullname",
      type: "string",
    }),

    defineField({
      name: "website_url",
      type: "url",
    }),

    defineField({
      name: "location",
      type: "string",
    }),

    defineField({
      name: "description",
      type: "string",
    }),

    defineField({
      name: "description_tr",
      type: "string",
    }),

    defineField({
      name: "summary",
      type: "string",
    }),

    defineField({
      name: "summary_tr",
      type: "string",
    }),

    defineField({
      name: "skills",
      type: "array",
      of: [{ type: "string" }],
      title: "Tech. Stack",
    }),

    defineField({
      name: "avatarUrl",
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
  ],
});

import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description_tr",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tech_stack",
      type: "array",
      of: [{ type: "string" }],
      title: "Tech. Stack",
    }),

    defineField({
      name: "project_type",
      type: "string",
      options: {
        list: [
          { title: "Individual", value: "individual" },
          { title: "Out-source", value: "outSource" },
        ],
      },
    }),

    defineField({
      name: "mainImage",
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
      name: "startedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "endedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "website_url",
      type: "url",
    }),

    defineField({
      name: "source_url",
      type: "url",
    }),
  ],
});

import { defineField, defineType } from "sanity";

export const certificateType = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({
      name: "title",
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
      name: "company",
      type: "string",
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
      name: "date",
      type: "datetime",
    }),

    defineField({
      name: "source_url",
      type: "url",
    }),
  ],
});

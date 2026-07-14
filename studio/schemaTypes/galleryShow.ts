import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryShow = defineType({
  name: "galleryShow",
  title: "Show (Galería)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título / Venue",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "date",
      options: { dateFormat: "DD-MM-YYYY" },
    }),
    defineField({
      name: "venue",
      title: "Lugar",
      type: "string",
      description: "Opcional si el título ya es el venue.",
    }),
    defineField({
      name: "photographer",
      title: "Fotógrafo/a",
      type: "string",
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sourceFolder",
      title: "Carpeta origen (import)",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Fecha, más recientes",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      photographer: "photographer",
      media: "photos.0",
    },
    prepare({ title, date, photographer, media }) {
      const bits = [date, photographer ? `Fotos: ${photographer}` : null].filter(
        Boolean,
      );
      return {
        title: title || "Sin título",
        subtitle: bits.join(" · "),
        media,
      };
    },
  },
});

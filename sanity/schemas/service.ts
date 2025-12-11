import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service/Offre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités incluses',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isRecommended',
      title: 'Offre recommandée',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'color',
      title: 'Couleur du badge',
      type: 'string',
      options: {
        list: [
          { title: 'Bleu', value: 'blue' },
          { title: 'Violet', value: 'purple' },
          { title: 'Vert', value: 'green' },
          { title: 'Orange', value: 'orange' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publié',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

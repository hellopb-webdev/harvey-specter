import { defineType, defineField } from 'sanity'
import { ComposeIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description:
        'Short italic line shown under the title — one short sentence.',
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: 'deliverables',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.unique().max(8),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
    }),
    defineField({
      name: 'imagePath',
      title: 'Image path (fallback)',
      description:
        'Path under /public used until an image is uploaded — e.g. /images/service-1.png',
      type: 'string',
      hidden: ({ value, parent }) => Boolean(parent?.image) && !value,
    }),
    defineField({
      name: 'objectPosition',
      title: 'Image object position',
      description:
        'Optional CSS object-position (e.g. "center 80%") for cropping focus.',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Show on site',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      description: 'Lower numbers appear first.',
      type: 'number',
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'image',
    },
  },
})

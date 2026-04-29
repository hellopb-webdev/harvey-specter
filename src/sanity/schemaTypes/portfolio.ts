import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
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
      name: 'coverImagePath',
      title: 'Cover image path (fallback)',
      description:
        'Path under /public used until a coverImage is uploaded — e.g. /images/project-1.png',
      type: 'string',
      hidden: ({ value, parent }) => Boolean(parent?.coverImage) && !value,
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Branding', value: 'Branding' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Engineering', value: 'Engineering' },
          { title: 'Photography', value: 'Photography' },
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Art Direction', value: 'Art Direction' },
        ],
      },
      validation: (rule) => rule.unique().max(4),
    }),
    defineField({
      name: 'displaySize',
      title: 'Homepage tile size',
      description: 'Controls how this card sits in the staggered homepage grid.',
      type: 'string',
      options: {
        list: [
          { title: 'Tall', value: 'tall' },
          { title: 'Short', value: 'short' },
        ],
        layout: 'radio',
      },
      initialValue: 'tall',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: 'client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) => rule.min(1990).max(2100).integer(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External link',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'], allowRelative: false }),
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Homepage order',
      description: 'Lower numbers appear first.',
      type: 'number',
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Homepage order',
      name: 'homepageOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest first',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
})

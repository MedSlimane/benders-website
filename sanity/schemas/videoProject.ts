import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoProject',
  title: 'Video Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          {title: 'Horizontal (16:9)', value: 'horizontal'},
          {title: 'Reel (9:16)', value: 'reel'},
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'videoSource',
              title: 'Video Source',
              type: 'string',
              options: {
                list: [
                  {title: 'Upload Video File', value: 'file'},
                  {title: 'External URL (YouTube, Vimeo, etc.)', value: 'url'},
                ],
                layout: 'radio',
              },
              initialValue: 'file',
            },
            {
              name: 'videoFile',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/*',
              },
              hidden: ({parent}) => parent?.videoSource !== 'file',
            },
            {
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({parent}) => parent?.videoSource !== 'url',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'posterImage',
              title: 'Poster Image (Optional)',
              type: 'image',
              description: 'Thumbnail shown before video plays. If not provided, first frame will be used.',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              caption: 'caption',
              videoSource: 'videoSource',
              media: 'posterImage',
            },
            prepare({caption, videoSource, media}) {
              return {
                title: caption || 'Untitled Video',
                subtitle: videoSource === 'file' ? 'Uploaded File' : 'External URL',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'metric', type: 'string', title: 'Metric'},
            {name: 'value', type: 'string', title: 'Value'},
          ],
        },
      ],
    }),
    defineField({
      name: 'insights',
      title: 'Key Insights',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'text', title: 'Quote'},
        {name: 'author', type: 'string', title: 'Author'},
        {name: 'position', type: 'string', title: 'Position'},
      ],
    }),
    defineField({
      name: 'showOverview',
      title: 'Show Overview Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showChallenge',
      title: 'Show Challenge Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showSolution',
      title: 'Show Solution Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showResults',
      title: 'Show Results Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showInsights',
      title: 'Show Insights Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonial',
      title: 'Show Testimonial Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (50-60 characters recommended)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'SEO description (150-160 characters recommended)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'SEO keywords for this project',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'thumbnail',
    },
  },
})

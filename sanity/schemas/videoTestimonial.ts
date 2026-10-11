import {defineField, defineType} from 'sanity'
import {derjaGroups, derjaString, withDerja} from './derja'

export default defineType({
  name: 'videoTestimonial',
  title: 'Video Testimonial',
  type: 'document',
  groups: derjaGroups,
  fields: withDerja([
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Role',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Short Quote',
      type: 'string',
      description: 'Shown in the fullscreen view',
    }),
    defineField({
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
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.videoSource !== 'file',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.videoSource !== 'url',
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail shown on the tile before the video plays',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ], [derjaString('quote', 'Short Quote')]),
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'posterImage',
    },
  },
})

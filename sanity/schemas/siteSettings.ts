import {defineField, defineType} from 'sanity'
import {derjaGroups, derjaString, derjaUrl, withDerja} from './derja'

// Reusable "video" object: upload a file OR paste an external URL
const videoField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: 'object',
    description,
    options: {collapsible: true, collapsed: false},
    fields: [
      {
        name: 'videoSource',
        title: 'Video Source',
        type: 'string',
        options: {
          list: [
            {title: 'Upload a file', value: 'file'},
            {title: 'External URL (Vimeo/YouTube/direct .mp4)', value: 'url'},
          ],
          layout: 'radio',
        },
        initialValue: 'file',
      },
      {
        name: 'videoFile',
        title: 'Video File',
        type: 'file',
        options: {accept: 'video/*'},
        hidden: ({parent}) => parent?.videoSource === 'url',
      },
      {
        name: 'videoUrl',
        title: 'Video URL',
        type: 'url',
        hidden: ({parent}) => parent?.videoSource !== 'url',
      },
    ],
  })

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: there is only ever one of these
  groups: derjaGroups,
  fields: withDerja([
    videoField('heroVideo', 'Hero Video', 'The big video at the top of the homepage.'),
    videoField('founderVideo', 'Founder Video', 'The video in the "We will make it work for you" section near the bottom.'),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown in the footer / contact section (e.g. contact@benders.io).',
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking / Calendar Link',
      type: 'url',
      description: 'The "Book a call" link (e.g. your Cal.com or Google Calendar URL).',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      options: {collapsible: true, collapsed: false},
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'linkedin', title: 'LinkedIn', type: 'url'},
        {name: 'twitter', title: 'Twitter / X', type: 'url'},
      ],
    }),
  ], [
    derjaString('contactEmail', 'Contact Email'),
    derjaUrl('bookingUrl', 'Booking / Calendar Link', 'Optional separate booking link for Tunisian visitors. Leave empty to use the main one.'),
  ]),
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})

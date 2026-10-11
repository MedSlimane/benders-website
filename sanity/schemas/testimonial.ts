import {defineField, defineType} from 'sanity'
import {derjaGroups, derjaString, derjaText, withDerja} from './derja'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial (text)',
  type: 'document',
  groups: derjaGroups,
  fields: withDerja([
    defineField({name: 'name', title: 'Name', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'role', title: 'Role / Title', type: 'string'}),
    defineField({
      name: 'content',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({name: 'avatar', title: 'Avatar', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'handle',
      title: 'Instagram handle',
      type: 'string',
      description: 'Without the @ (optional). Links the card to instagram.com/<handle>.',
    }),
    defineField({name: 'order', title: 'Display Order', type: 'number', initialValue: 1}),
  ], [derjaString('role', 'Role / Title'), derjaText('content', 'Quote', 3)]),
  preview: {select: {title: 'name', subtitle: 'role', media: 'avatar'}},
})

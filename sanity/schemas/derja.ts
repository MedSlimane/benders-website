import {defineField, type FieldDefinition, type FieldGroupDefinition} from 'sanity'

// Tunisian (benders.tn) translations live in optional `<field>_tn` siblings,
// shown in their own "Tunisian (Derja)" tab. Anything left empty falls back to
// the English value on benders.tn, so translating is never required.

export const derjaGroups: FieldGroupDefinition[] = [
  {name: 'content', title: 'Content', default: true},
  {name: 'tn', title: 'Tunisian (Derja) 🇹🇳'},
]

const HINT = 'Shown on benders.tn (Tunisian Derja, Arabic script). Leave empty to use the English text.'

export function derjaString(name: string, title: string) {
  return defineField({name: `${name}_tn`, title: `${title} — Derja`, type: 'string', group: 'tn', description: HINT})
}

export function derjaText(name: string, title: string, rows = 4) {
  return defineField({name: `${name}_tn`, title: `${title} — Derja`, type: 'text', rows, group: 'tn', description: HINT})
}

export function derjaStringList(name: string, title: string) {
  return defineField({
    name: `${name}_tn`,
    title: `${title} — Derja`,
    type: 'array',
    of: [{type: 'string'}],
    group: 'tn',
    description: `${HINT} Fill the whole list (it replaces the English list).`,
  })
}

export function derjaUrl(name: string, title: string, description: string) {
  return defineField({name: `${name}_tn`, title: `${title} — benders.tn`, type: 'url', group: 'tn', description})
}

/** Put every existing field in the default "Content" tab, then append the Derja fields. */
export function withDerja(fields: FieldDefinition[], tnFields: FieldDefinition[]): FieldDefinition[] {
  return [
    ...fields.map((f) => (f.group ? f : ({...f, group: 'content'} as FieldDefinition))),
    ...tnFields,
  ]
}

/** Derja fields shared by web and video projects */
export const projectDerjaFields: FieldDefinition[] = [
  derjaString('title', 'Title'),
  derjaString('subtitle', 'Subtitle'),
  derjaStringList('services', 'Services'),
  derjaText('overview', 'Overview'),
  derjaText('challenge', 'Challenge'),
  derjaText('solution', 'Solution'),
  defineField({
    name: 'results_tn',
    title: 'Results — Derja',
    type: 'array',
    group: 'tn',
    description: `${HINT} Fill the whole list (it replaces the English list). Keep the values (e.g. +300%) as they are.`,
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
  derjaStringList('insights', 'Key Insights'),
  derjaText('testimonialQuote', 'Testimonial quote', 3),
  derjaString('testimonialPosition', 'Testimonial position'),
]

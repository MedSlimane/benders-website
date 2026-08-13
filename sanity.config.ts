import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

// Types that should only ever have ONE document (edited in place, not created/deleted)
const SINGLETON_TYPES = new Set(['siteSettings'])

export default defineConfig({
  name: 'default',
  title: 'Benders Agency',

  projectId: '75e2zogt',
  dataset: 'production',

  // Studio is embedded in the Next app and reachable at /studio in production
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Pinned singleton at the top
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            // Everything else as normal document lists
            ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Remove create/delete/duplicate for singletons
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})

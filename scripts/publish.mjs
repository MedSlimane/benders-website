// Publish a draft document: node scripts/publish.mjs [draftId]
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const draftId = process.argv[2] || 'drafts.509e1baf-1a0f-497e-a6f5-ba91fd130409'

const draft = await client.getDocument(draftId)
if (!draft) { console.error('Draft not found:', draftId); process.exit(1) }
const publishedId = draftId.replace(/^drafts\./, '')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { _rev, _updatedAt, _createdAt, ...rest } = draft
await client.createOrReplace({ ...rest, _id: publishedId })
await client.delete(draftId)
console.log(`✓ published: ${publishedId} — ${draft.title}`)

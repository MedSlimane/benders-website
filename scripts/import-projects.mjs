// Import projects from scripts/projects-to-import.json into Sanity.
// Images (thumbnail, gallery, videos, ogImage) are intentionally left empty —
// add them in /studio. Idempotent: re-running updates the same documents.
//
// Usage:  node scripts/import-projects.mjs
// Needs a WRITE token in .env.local as SANITY_API_WRITE_TOKEN
// (falls back to SANITY_API_READ_TOKEN, which usually can't write).

import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

// Minimal .env.local loader (KEY=VALUE lines)
function loadEnv(file) {
  try {
    for (const line of readFileSync(join(root, file), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      let val = m[2].trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
      if (process.env[m[1]] === undefined) process.env[m[1]] = val
    }
  } catch {}
}
loadEnv('.env.local')

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 96)

function toDoc(p) {
  const slug = slugify(p.title)
  const _type = p.type === 'video' ? 'videoProject' : 'webProject'
  const doc = {
    _id: `${_type}-${slug}`,
    _type,
    title: p.title,
    slug: { _type: 'slug', current: slug },
    subtitle: p.subtitle,
    category: p.category,
    order: typeof p.order === 'number' ? p.order : 1,
  }
  if (p.client) doc.client = p.client
  if (p.year) doc.year = p.year
  if (_type === 'webProject' && p.websiteUrl) doc.websiteUrl = p.websiteUrl
  if (_type === 'videoProject' && p.videoType) doc.videoType = p.videoType
  if (p.services?.length) doc.services = p.services
  if (p.technologies?.length) doc.technologies = p.technologies
  if (p.overview) doc.overview = p.overview
  if (p.challenge) doc.challenge = p.challenge
  if (p.solution) doc.solution = p.solution
  if (p.results?.length)
    doc.results = p.results.map((r, i) => ({ _key: `result-${i}`, metric: r.metric, value: r.value }))
  if (p.insights?.length) doc.insights = p.insights
  if (p.testimonial && (p.testimonial.quote || p.testimonial.author)) {
    doc.testimonial = {
      quote: p.testimonial.quote || '',
      author: p.testimonial.author || '',
      position: p.testimonial.position || '',
    }
  }
  if (p.seo) {
    doc.seo = {}
    if (p.seo.metaTitle) doc.seo.metaTitle = p.seo.metaTitle
    if (p.seo.metaDescription) doc.seo.metaDescription = p.seo.metaDescription
    if (p.seo.keywords?.length) doc.seo.keywords = p.seo.keywords
  }
  return doc
}

// Find an existing document (draft OR published) with the same slug, so we
// merge into it instead of creating a duplicate — and never touch its images.
async function findExistingId(slug) {
  try {
    const rows = await client.fetch(
      `*[_type in ["webProject","videoProject"] && slug.current == $slug]{_id}`,
      { slug },
      { perspective: 'raw' }
    )
    if (!rows?.length) return null
    const draft = rows.find((r) => r._id.startsWith('drafts.'))
    return (draft || rows[0])._id
  } catch {
    return null
  }
}

async function run() {
  if (!token) {
    console.error('✗ No Sanity token found in .env.local')
    process.exit(1)
  }
  const data = JSON.parse(readFileSync(join(root, 'scripts/projects-to-import.json'), 'utf8'))
  const docs = (data.projects || []).map(toDoc)
  console.log(`Importing ${docs.length} project(s) into dataset "${process.env.NEXT_PUBLIC_SANITY_DATASET}"...\n`)

  for (const doc of docs) {
    try {
      const slug = doc.slug.current
      const existingId = await findExistingId(slug)
      if (existingId) {
        // Merge text fields into the existing doc; leave thumbnail/images/videos alone
        const { _id, _type, ...fields } = doc
        void _id
        void _type
        const res = await client.patch(existingId).set(fields).commit()
        console.log(`✓ updated existing: ${res._id}  —  ${doc.title}  (kept your thumbnail)`)
      } else {
        const res = await client.createOrReplace(doc)
        console.log(`✓ created: ${res._id}  —  ${doc.title}`)
      }
    } catch (e) {
      console.error(`✗ FAILED: ${doc.title}  —  ${e.statusCode || ''} ${e.message}`)
      if (e.statusCode === 401 || e.statusCode === 403 || /permission|Insufficient|Unauthorized/i.test(e.message)) {
        console.error(
          '\n  → The token lacks WRITE permission.\n' +
            '    1. Go to https://www.sanity.io/manage/project/' +
            (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '') +
            '/api#tokens\n' +
            '    2. Add API token → name it "import" → role: Editor → Save.\n' +
            '    3. Put it in .env.local as:  SANITY_API_WRITE_TOKEN=your_new_token\n' +
            '    4. Re-run:  node scripts/import-projects.mjs\n'
        )
      }
    }
  }
  console.log('\nDone. Open /studio to add the thumbnail + gallery images.')
}

run()

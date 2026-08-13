// One-off: merge the full imported data into the EXISTING manual draft
// (keeps its thumbnail + slug), then delete the duplicate doc the import made.
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

const DRAFT_ID = 'drafts.509e1baf-1a0f-497e-a6f5-ba91fd130409' // your manual draft (has the thumbnail)
const DUP_ID = 'webProject-listings-sg-buycondo-sg' // the doc the import created

const p = JSON.parse(readFileSync(join(root, 'scripts/projects-to-import.json'), 'utf8')).projects[0]

// Fields to write — NOT slug or thumbnail (keep the ones already on your draft)
const fields = {
  title: p.title,
  subtitle: p.subtitle,
  category: p.category,
  order: typeof p.order === 'number' ? p.order : 1,
  client: p.client,
  year: p.year,
  websiteUrl: p.websiteUrl,
  services: p.services,
  technologies: p.technologies,
  overview: p.overview,
  challenge: p.challenge,
  solution: p.solution,
  results: p.results.map((r, i) => ({ _key: `result-${i}`, metric: r.metric, value: r.value })),
  insights: p.insights,
  testimonial: {
    quote: p.testimonial?.quote || '',
    author: p.testimonial?.author || '',
    position: p.testimonial?.position || '',
  },
  seo: {
    metaTitle: p.seo?.metaTitle || '',
    metaDescription: p.seo?.metaDescription || '',
    keywords: p.seo?.keywords || [],
  },
}

async function run() {
  await client.patch(DRAFT_ID).set(fields).commit()
  console.log('✓ enriched your draft with all fields (kept your thumbnail + slug)')

  for (const id of [DUP_ID, `drafts.${DUP_ID}`]) {
    try {
      await client.delete(id)
      console.log(`✓ deleted duplicate: ${id}`)
    } catch (e) {
      if (!/not found|no documents/i.test(e.message)) console.log(`  (skip ${id}: ${e.message})`)
    }
  }
  console.log('\nDone. Open /studio → Listings.sg → review → Publish.')
}
run().catch((e) => { console.error(e.message); process.exit(1) })

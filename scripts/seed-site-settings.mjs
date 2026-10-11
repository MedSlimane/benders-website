// Verify the Site Settings pipeline end-to-end:
// upload the current hero video as a Sanity file asset, create the singleton
// referencing it, then run the SAME GROQ the site uses and confirm the URL resolves.
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

// 1) Upload the current bundled hero video as a Sanity file asset
const buf = readFileSync(join(root, 'public/Videos/itel.mp4'))
const asset = await client.assets.upload('file', buf, {filename: 'hero.mp4', contentType: 'video/mp4'})
console.log('✓ uploaded video asset:', asset._id)

const fileVideo = {
  videoSource: 'file',
  videoFile: {_type: 'file', asset: {_type: 'reference', _ref: asset._id}},
}

// 2) Create the Site Settings singleton (pre-filled with current values as a starting point)
await client.createOrReplace({
  _id: 'siteSettings',
  _type: 'siteSettings',
  heroVideo: fileVideo,
  founderVideo: fileVideo,
  contactEmail: 'contact@benders.io',
  bookingUrl: 'https://calendar.app.google/ENRJ1d6t9AM9nwy7A',
  social: {
    instagram: 'https://instagram.com/benders',
    linkedin: 'https://linkedin.com/company/benders',
    twitter: 'https://twitter.com/benders',
  },
})
console.log('✓ created Site Settings singleton')

// 3) Run the EXACT query the site uses and show the resolved URLs
const res = await client.fetch(`*[_type == "siteSettings"][0]{
  "heroVideoUrl": select(heroVideo.videoSource == "url" => heroVideo.videoUrl, heroVideo.videoFile.asset->url),
  "founderVideoUrl": select(founderVideo.videoSource == "url" => founderVideo.videoUrl, founderVideo.videoFile.asset->url),
  contactEmail, bookingUrl, social
}`)
console.log('\n=== what the site will receive ===')
console.log(JSON.stringify(res, null, 2))
console.log(
  '\n' +
    (res?.heroVideoUrl?.startsWith('http')
      ? '✅ WORKS — heroVideoUrl resolves to a real Sanity URL. Uploading a video in Studio WILL show on the site.'
      : '⚠️ heroVideoUrl did not resolve — check the query.')
)

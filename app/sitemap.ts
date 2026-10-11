import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { absoluteUrl, localeFromHost, type Locale } from '@/i18n/config'
import { fetchAllProjects } from '@/lib/sanity'

// Each domain serves its own sitemap; every URL lists its other-language twin.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale: Locale = localeFromHost((await headers()).get('host')) ?? 'en'

  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly') => ({
    url: absoluteUrl(locale, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: absoluteUrl('en', path),
        'ar-TN': absoluteUrl('tn', path),
      },
    },
  })

  let projectPaths: string[] = []
  try {
    const projects = await fetchAllProjects()
    projectPaths = projects
      .map((p) => (typeof p.slug === 'string' ? p.slug : p.slug?.current))
      .filter(Boolean)
      .map((slug) => `/projects/${slug}`)
  } catch {
    // Sitemap still lists the homepage if Sanity is unreachable
  }

  return [entry('/', 1, 'weekly'), ...projectPaths.map((p) => entry(p, 0.7, 'monthly'))]
}

import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { localeFromHost, siteUrl } from '@/i18n/config'

// Each domain serves its own robots.txt pointing at its own sitemap
export default async function robots(): Promise<MetadataRoute.Robots> {
  const locale = localeFromHost((await headers()).get('host')) ?? 'en'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/studio/'], // Disallow crawling of API routes and the Sanity Studio
    },
    sitemap: `${siteUrl[locale]}/sitemap.xml`,
  }
}

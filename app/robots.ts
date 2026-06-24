import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bendersagency.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/studio/'], // Disallow crawling of API routes and the Sanity Studio
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

import type { Metadata } from 'next'
import { urlFor } from './sanity'
import type { Project } from './sanity'

export function generateProjectMetadata(project: Project): Metadata {
  const seo = (project as any).seo || {}
  
  const title = seo.metaTitle || `${project.title} | Benders Agency`
  const description = seo.metaDescription || project.subtitle || `${project.title} - A creative project by Benders Agency`
  
  // Generate OG image URL
  const ogImage = seo.ogImage 
    ? urlFor(seo.ogImage).width(1200).height(630).format('jpg').url()
    : urlFor(project.thumbnail).width(1200).height(630).format('jpg').url()

  const keywords = seo.keywords || []
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://benders.agency'
  const canonicalUrl = `${baseUrl}/projects/${project.slug}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Benders Agency',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@bendersagency',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export function generateProjectStructuredData(project: Project) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://benders.agency'
  const imageUrl = urlFor(project.thumbnail).width(1200).height(630).format('jpg').url()

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.subtitle,
    image: imageUrl,
    url: `${baseUrl}/projects/${project.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Benders Agency',
      url: baseUrl,
    },
    creator: {
      '@type': 'Organization',
      name: 'Benders Agency',
    },
    datePublished: (project as any).year || new Date().getFullYear().toString(),
    inLanguage: 'en-US',
  }
}

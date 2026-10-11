import type { Metadata } from 'next'
import { urlFor } from './sanity'
import type { Project } from './sanity'
import { absoluteUrl, ogLocale, type Locale } from '@/i18n/config'

type ProjectWithSEO = Project & {
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    keywords?: string[]
  }
}

export function generateProjectMetadata(project: Project, locale: Locale = 'en'): Metadata {
  const projectWithSEO = project as ProjectWithSEO
  const seo = projectWithSEO.seo || {}

  // The [locale] layout's title template appends " | Benders Agency"
  const title = seo.metaTitle || project.title
  const description = seo.metaDescription || project.subtitle || `${project.title} - A creative project by Benders Agency`

  // Generate OG image URL
  const ogImage = seo.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).format('jpg').url()
    : urlFor(project.thumbnail).width(1200).height(630).format('jpg').url()

  const keywords = seo.keywords || []
  const slug = typeof project.slug === 'string' ? project.slug : project.slug?.current
  const path = `/projects/${slug}`
  const canonicalUrl = absoluteUrl(locale, path)

  return {
    // A custom SEO title is used as-is (it usually already names the brand)
    title: seo.metaTitle ? { absolute: seo.metaTitle } : title,
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
      locale: ogLocale[locale],
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
      languages: {
        en: absoluteUrl('en', path),
        'ar-TN': absoluteUrl('tn', path),
        'x-default': absoluteUrl('en', path),
      },
    },
  }
}

type ProjectWithYear = Project & {
  year?: string
}

export function generateProjectStructuredData(project: Project) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://benders.agency'
  const imageUrl = urlFor(project.thumbnail).width(1200).height(630).format('jpg').url()
  const projectWithYear = project as ProjectWithYear

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
    datePublished: projectWithYear.year || new Date().getFullYear().toString(),
    inLanguage: 'en-US',
  }
}

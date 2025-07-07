export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bendersagency.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Benders Agency',
    alternateName: 'Benders',
    url: baseUrl,
    logo: `${baseUrl}/Benders-logo/SVG/1.svg`,
    description: 'Digital marketing agency providing web development, SEO, social media marketing, and creative solutions to help businesses grow online.',
    foundingDate: '2020',
    sameAs: [
      'https://www.facebook.com/bendersagency',
      'https://www.instagram.com/bendersagency',
      'https://www.linkedin.com/company/bendersagency',
      'https://twitter.com/bendersagency',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      availableLanguage: ['English', 'French', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      addressCountry: 'Your Country',
    },
    service: [
      {
        '@type': 'Service',
        name: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies including SEO, PPC, and social media marketing.',
      },
      {
        '@type': 'Service',
        name: 'Web Development',
        description: 'Custom website development and e-commerce solutions.',
      },
      {
        '@type': 'Service',
        name: 'Brand Design',
        description: 'Creative brand identity and graphic design services.',
      },
      {
        '@type': 'Service',
        name: 'Content Creation',
        description: 'Professional content creation for digital marketing campaigns.',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimization',
            description: 'Search Engine Optimization to improve website visibility',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom website and web application development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Marketing',
            description: 'Strategic social media management and advertising',
          },
        },
      ],
    },
  }
}

export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bendersagency.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Benders Agency',
    url: baseUrl,
    description: 'Digital marketing agency providing comprehensive online solutions',
    publisher: {
      '@type': 'Organization',
      name: 'Benders Agency',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

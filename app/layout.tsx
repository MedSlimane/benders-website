import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Benders Agency | Digital Marketing & Web Development Solutions",
    template: "%s | Benders Agency"
  },
  description: "Transform your business with Benders Agency's expert digital marketing, web development, and creative solutions. Boost your online presence with our proven strategies.",
  keywords: [
    "digital marketing agency",
    "web development",
    "SEO services",
    "social media marketing",
    "content creation",
    "brand design",
    "e-commerce solutions",
    "digital advertising",
    "marketing automation",
    "website design",
    "benders agency"
  ],
  authors: [{ name: "Benders Agency" }],
  creator: "Benders Agency",
  publisher: "Benders Agency",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bendersagency.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Benders Agency | Digital Marketing & Web Development Solutions',
    description: 'Transform your business with Benders Agency\'s expert digital marketing, web development, and creative solutions. Boost your online presence with our proven strategies.',
    siteName: 'Benders Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Benders Agency - Digital Marketing Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benders Agency | Digital Marketing & Web Development Solutions',
    description: 'Transform your business with expert digital marketing and web development solutions.',
    images: ['/og-image.jpg'],
    creator: '@bendersagency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these only if you want to verify with search engines (optional)
    // google: process.env.GOOGLE_SITE_VERIFICATION,
    // yandex: process.env.YANDEX_VERIFICATION,
    // yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: 'Digital Marketing',
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bendersagency.com'} />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

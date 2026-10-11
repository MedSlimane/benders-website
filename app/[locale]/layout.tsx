import type { Metadata, Viewport } from "next"
import { Inter, Cairo } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/structured-data"
import Navbar from "@/components/Navbar"
import "../globals.css"
import { Analytics } from "@vercel/analytics/react"
import { absoluteUrl, direction, htmlLang, isLocale, locales, ogLocale, siteUrl } from "@/i18n/config"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

// Arabic face for the Tunisian site. Not preloaded, and its @font-face uses an
// Arabic unicode-range, so English visitors never download it.
const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: false,
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = await getTranslations({ locale, namespace: "meta" })
  const title = t("title")
  const description = t("description")
  const otherLocale = locale === "en" ? "tn" : "en"

  return {
    title: { default: title, template: t("titleTemplate") },
    description,
    keywords: t("keywords").split(",").map((k) => k.trim()),
    authors: [{ name: "Benders Agency" }],
    creator: "Benders Agency",
    publisher: "Benders Agency",
    metadataBase: new URL(siteUrl[locale]),
    alternates: {
      canonical: absoluteUrl(locale, "/"),
      languages: {
        en: absoluteUrl("en", "/"),
        "ar-TN": absoluteUrl("tn", "/"),
        "x-default": absoluteUrl("en", "/"),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale],
      url: absoluteUrl(locale, "/"),
      title,
      description,
      siteName: "Benders Agency",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("twitterDescription"),
      images: ["/og-image.jpg"],
      creator: "@bendersagency",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Digital Marketing",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)

  const organizationSchema = generateOrganizationSchema(locale)
  const websiteSchema = generateWebsiteSchema(locale)
  const fontClasses = locale === "tn" ? `${inter.variable} ${cairo.variable}` : inter.variable

  return (
    <html lang={htmlLang[locale]} dir={direction[locale]}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={`${fontClasses} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider>
          {/* Site is live by default; Navbar hides only when maintenance is explicitly on */}
          {process.env.MAINTENANCE_MODE !== "true" && <Navbar />}
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

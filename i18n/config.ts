// Locale configuration shared by middleware, server components and client components.
// The locale is chosen by DOMAIN, never by URL prefix or IP:
//   bendersagency.com  -> en (LTR)
//   benders.tn         -> tn (Tunisian Derja, Arabic script, RTL)

export const locales = ["en", "tn"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
}

// BCP 47 tag for <html lang>, hreflang and OpenGraph
export const htmlLang: Record<Locale, string> = { en: "en", tn: "ar-TN" }
export const ogLocale: Record<Locale, string> = { en: "en_US", tn: "ar_TN" }
export const direction: Record<Locale, "ltr" | "rtl"> = { en: "ltr", tn: "rtl" }

// Canonical origin of each locale's site
export const siteUrl: Record<Locale, string> = {
  en: (process.env.NEXT_PUBLIC_EN_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://www.bendersagency.com").replace(/\/$/, ""),
  tn: (process.env.NEXT_PUBLIC_TN_URL || "https://benders.tn").replace(/\/$/, ""),
}

// Hosts that are a locale's real production domain. On these the domain alone
// decides the locale (the ?locale= preview override is ignored).
const TN_HOST = /(^|\.)benders\.tn$|^tn\.localhost$/
const EN_HOST = /(^|\.)bendersagency\.com$/

// On Vercel's production deployment every host that isn't benders.tn is the
// English site, whatever its exact domain is. (NEXT_PUBLIC_VERCEL_ENV is
// exposed to the browser automatically by Vercel for Next.js projects.)
const IS_PRODUCTION_DEPLOYMENT =
  (process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV) === "production"

export function localeFromHost(host: string | null | undefined): Locale | null {
  const h = (host || "").split(":")[0].toLowerCase()
  if (TN_HOST.test(h)) return "tn"
  if (EN_HOST.test(h)) return "en"
  if (IS_PRODUCTION_DEPLOYMENT) return "en"
  return null // localhost and Vercel preview deployments: ?locale= works
}

export const PREVIEW_LOCALE_COOKIE = "preview_locale"

// Absolute URL of `path` on the given locale's site (for hreflang/canonical/sitemaps)
export function absoluteUrl(locale: Locale, path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl[locale]}${p === "/" ? "" : p}`
}

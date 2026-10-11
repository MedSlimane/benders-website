import { getRequestConfig } from "next-intl/server"
import { defaultLocale, isLocale, type Locale } from "./config"

// One JSON file per namespace: messages/<locale>/<namespace>.json
// Add a namespace here when you add a new messages file.
export const NAMESPACES = [
  "common",
  "meta",
  "nav",
  "hero",
  "services",
  "soul",
  "work",
  "reveal",
  "owner",
  "expect",
  "testimonials",
  "contact",
  "footer",
  "project",
  "maintenance",
] as const

async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      try {
        const mod = await import(`../messages/${locale}/${ns}.json`)
        return [ns, mod.default] as const
      } catch {
        return [ns, {}] as const
      }
    })
  )
  return Object.fromEntries(entries)
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale: Locale = isLocale(requested) ? requested : defaultLocale
  return { locale, messages: await loadMessages(locale) }
})

import { NextRequest, NextResponse } from "next/server"
import { defaultLocale, isLocale, localeFromHost, PREVIEW_LOCALE_COOKIE, type Locale } from "./i18n/config"

/**
 * 1) Maintenance gate (unchanged behaviour)
 *    The site is LIVE BY DEFAULT. Set MAINTENANCE_MODE=true to show the
 *    "we'll be back soon" page. Preview the real site with /?bypass=<token>.
 *
 * 2) Locale by domain
 *    bendersagency.com -> /en/*, benders.tn -> /tn/* (internal rewrite; URLs
 *    never show a locale prefix). On localhost / Vercel previews, append
 *    ?locale=tn (or ?locale=en) to switch; it's remembered in a cookie.
 */

const BYPASS_TOKEN = process.env.MAINTENANCE_BYPASS_TOKEN || "benders"
const BYPASS_COOKIE = "maint_bypass"
const ONE_YEAR = 60 * 60 * 24 * 365

function resolveLocale(request: NextRequest): { locale: Locale; setPreviewCookie?: Locale } {
  const fromHost = localeFromHost(request.headers.get("host"))
  if (fromHost) return { locale: fromHost }

  // Non-production host: allow an explicit preview override
  const param = request.nextUrl.searchParams.get("locale")
  if (isLocale(param)) return { locale: param, setPreviewCookie: param }
  const cookie = request.cookies.get(PREVIEW_LOCALE_COOKIE)?.value
  if (isLocale(cookie)) return { locale: cookie }
  return { locale: defaultLocale }
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // ---- Maintenance gate ----
  if (process.env.MAINTENANCE_MODE === "true") {
    const isMaintenanceAsset = pathname.startsWith("/maintenance") || pathname.startsWith("/api/maintenance")
    if (searchParams.get("bypass") === BYPASS_TOKEN) {
      const res = NextResponse.redirect(new URL(pathname, request.url))
      res.cookies.set(BYPASS_COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 7 })
      return res
    }
    const bypassed = request.cookies.get(BYPASS_COOKIE)?.value === "1"
    if (!bypassed && !isMaintenanceAsset) {
      const { locale } = resolveLocale(request)
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}/maintenance`
      return NextResponse.rewrite(url)
    }
  }

  // ---- Locale rewrite ----
  const { locale, setPreviewCookie } = resolveLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  url.searchParams.delete("locale")
  const res = NextResponse.rewrite(url)
  if (setPreviewCookie) {
    res.cookies.set(PREVIEW_LOCALE_COOKIE, setPreviewCookie, { path: "/", maxAge: ONE_YEAR })
  }
  return res
}

export const config = {
  // Skip Next internals, the Sanity Studio, API routes and any file with an extension
  matcher: ["/((?!_next|_vercel|studio|api|.*\\..*).*)"],
}

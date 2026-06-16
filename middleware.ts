import { NextRequest, NextResponse } from "next/server"

/**
 * Maintenance-mode gate.
 *
 * Maintenance is ON BY DEFAULT — no env var required. This means a fresh
 * production deploy (e.g. on Vercel) shows the "we'll be back soon" page
 * without anyone needing to touch the hosting dashboard.
 *
 * To work on the real site on your own machine, set in .env.local:
 *     MAINTENANCE_MODE=false
 * When the site is ready to go fully live, either set MAINTENANCE_MODE=false
 * in the host's env, or just delete this middleware file and redeploy.
 *
 * Previewing the real site while maintenance is on (without disabling it):
 *   visit  /?bypass=<MAINTENANCE_BYPASS_TOKEN>  (default token: "benders")
 *   that drops a cookie so you keep browsing the real site normally.
 */

const BYPASS_TOKEN = process.env.MAINTENANCE_BYPASS_TOKEN || "benders"
const BYPASS_COOKIE = "maint_bypass"

export function middleware(request: NextRequest) {
  const isOn = process.env.MAINTENANCE_MODE !== "false"
  if (!isOn) return NextResponse.next()

  const { pathname, searchParams } = request.nextUrl

  // Let the maintenance page itself and Next internals/assets through
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/maintenance")
  ) {
    return NextResponse.next()
  }

  // Bypass via ?bypass=TOKEN — sets a cookie so subsequent requests pass
  if (searchParams.get("bypass") === BYPASS_TOKEN) {
    const res = NextResponse.next()
    res.cookies.set(BYPASS_COOKIE, "1", { path: "/", maxAge: 60 * 60 * 24 * 7 })
    return res
  }
  if (request.cookies.get(BYPASS_COOKIE)?.value === "1") {
    return NextResponse.next()
  }

  // Everyone else: serve the maintenance page (URL stays the same)
  const url = request.nextUrl.clone()
  url.pathname = "/maintenance"
  return NextResponse.rewrite(url)
}

export const config = {
  // Run on everything except static files (those carry a file extension)
  // and the Next image optimizer. Assets needed by the maintenance page
  // (logo SVG, fonts) are served directly without hitting this gate.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}

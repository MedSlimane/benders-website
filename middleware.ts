import { NextRequest, NextResponse } from "next/server"

/**
 * Maintenance-mode gate.
 *
 * The site is LIVE BY DEFAULT. To put it back into "we'll be back soon" mode,
 * set MAINTENANCE_MODE=true (in the host env, or .env.local for local) and
 * redeploy — no code change needed.
 *
 * Previewing the real site while maintenance is on (without disabling it):
 *   visit  /?bypass=<MAINTENANCE_BYPASS_TOKEN>  (default token: "benders")
 *   that drops a cookie so you keep browsing the real site normally.
 */

const BYPASS_TOKEN = process.env.MAINTENANCE_BYPASS_TOKEN || "benders"
const BYPASS_COOKIE = "maint_bypass"

export function middleware(request: NextRequest) {
  const isOn = process.env.MAINTENANCE_MODE === "true"
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

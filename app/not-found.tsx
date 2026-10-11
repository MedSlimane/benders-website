import Link from "next/link"
import "./globals.css"

// Fallback for requests that bypass the locale middleware (e.g. a missing
// file path). The root layout is a pass-through, so this renders its own html.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <main
          className="min-h-screen flex items-center justify-center px-4"
          style={{ background: "var(--gradient-body)" }}
        >
          <div className="text-center">
            <p className="font-gilroy font-black text-7xl md:text-9xl text-[#2de6c7] mb-4">404</p>
            <h1 className="font-gilroy font-bold text-3xl md:text-4xl text-white mb-8">Page Not Found</h1>
            <Link href="/" className="text-[#2de6c7] underline">Back to home</Link>
          </div>
        </main>
      </body>
    </html>
  )
}

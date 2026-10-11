// The real <html>/<body> live in app/[locale]/layout.tsx (site) and
// app/studio/layout.tsx (Sanity Studio), so each can set its own lang/dir.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

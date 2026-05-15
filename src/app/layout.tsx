import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'ZeuZ Demo Website',
  description: 'Eine Website, deren Inhalte aus dem ZeuZ Payload CMS kommen.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}

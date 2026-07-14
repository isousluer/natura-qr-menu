import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Menü',
  description: 'Restoran Menüsü',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}

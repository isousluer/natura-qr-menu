import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Menü',
  description: 'Restoran Menüsü',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t){document.documentElement.setAttribute("data-theme",t)}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.setAttribute("data-theme","dark")}else{document.documentElement.setAttribute("data-theme","light")}}catch(e){}})()`,
          }}
        />
      </head>
      <body style={{ backgroundColor: 'var(--bg-page)' }} className="min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  weight: ['500', '700'],
  subsets: ['latin'],
  variable: '--font-playfair',
})

const poppins = Poppins({
  weight: ['300', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Romana Schned | Portfolio',
  description: 'UGC & Web Creation Portfolio - Creative digital storyteller passionate about building elegant websites and authentic visual content.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond, Cormorant, Bebas_Neue, Outfit, DM_Serif_Display, Open_Sans, Merriweather } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  weight: '400',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: '400',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['300', '400'],
})

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
  weight: ['300', '400'],
})

export const metadata: Metadata = {
  title: 'Prestige Realty - Premium Real Estate in Chandigarh',
  description: 'Discover luxury residential, commercial, and leasing projects across premium markets. Expert real estate solutions with world-class amenities.',
  keywords: 'real estate, luxury homes, commercial property, Chandigarh, Prestige Realty',
  openGraph: {
    title: 'Prestige Realty - Premium Real Estate',
    description: 'Discover luxury residential, commercial, and leasing projects',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${cormorantGaramond.variable} ${cormorant.variable} ${bebasNeue.variable} ${outfit.variable} ${dmSerifDisplay.variable} ${openSans.variable} ${merriweather.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}






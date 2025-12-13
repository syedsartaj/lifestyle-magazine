import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUXE - Lifestyle & Fashion Magazine',
  description: 'Discover the latest in fashion, beauty, travel, and lifestyle. Your daily dose of inspiration and style curated with love.',
  keywords: ['fashion', 'lifestyle', 'beauty', 'travel', 'style', 'magazine', 'trends'],
  authors: [{ name: 'LUXE Magazine' }],
  openGraph: {
    title: 'LUXE - Lifestyle & Fashion Magazine',
    description: 'Discover the latest in fashion, beauty, travel, and lifestyle',
    type: 'website',
    locale: 'en_US',
    siteName: 'LUXE Magazine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXE - Lifestyle & Fashion Magazine',
    description: 'Discover the latest in fashion, beauty, travel, and lifestyle',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-cream min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

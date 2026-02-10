import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PageTransition } from '@/components/ui/page-transition'
import { IntroVideo } from '@/components/ui/intro-video'
import { CustomCursor } from '@/components/ui/custom-cursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://internity-perfume.vercel.app'),
  title: 'INTERNITY PERFUME | Luxury Fragrances',
  description: 'Discover the art of luxury perfumery. INTERNITY PERFUME crafts exquisite fragrances that capture timeless elegance and sophistication.',
  keywords: ['luxury perfume', 'designer fragrance', 'INTERNITY', 'premium scents', 'exclusive perfumery'],
  authors: [{ name: 'INTERNITY PERFUME' }],
  creator: 'INTERNITY PERFUME',
  publisher: 'INTERNITY PERFUME',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://internity-perfume.com',
    siteName: 'INTERNITY PERFUME',
    title: 'INTERNITY PERFUME | Luxury Fragrances',
    description: 'Discover the art of luxury perfumery. INTERNITY PERFUME crafts exquisite fragrances that capture timeless elegance and sophistication.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'INTERNITY PERFUME',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INTERNITY PERFUME | Luxury Fragrances',
    description: 'Discover the art of luxury perfumery.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="min-h-screen bg-luxury-black text-luxury-cream antialiased font-sans">
        <Providers>
          <CustomCursor />
          <IntroVideo />
          <PageTransition />
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

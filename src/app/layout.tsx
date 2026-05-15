import type { Metadata } from 'next'
import { Manrope, DM_Sans } from 'next/font/google'
import './globals.css'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import CommandPalette from './components/CommandPalette'
import Toast from './components/Toast'
import FilmGrain from './components/FilmGrain'
import BackToTop from './components/BackToTop'
import ChatBot from './components/ChatBot'
import PageTransition from './components/PageTransition'
import Preloader from './components/Preloader'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://osman-geomatics.com'),
  title: 'Osman Ibrahim — Remote Sensing & GIS Expert',
  description:
    'Geomatics Engineer with 8+ years transforming satellite data into actionable insights for water management, crop monitoring, and environmental assessment. M.Sc. KTU Turkey.',
  keywords:
    'Remote Sensing, GIS, Geomatics, QGIS, Google Earth Engine, WaPOR, FAO, IFAD, Sudan, Water Management, Crop Classification, Machine Learning, Sentinel, Landsat, MODIS',
  authors: [{ name: 'Osman Osama Ahmed Ibrahim' }],
  openGraph: {
    title: 'Osman Ibrahim — Remote Sensing & GIS Expert',
    description:
      'Geomatics Engineer with 8+ years in satellite data analysis, water management, and crop monitoring. Leading projects with FAO, IFAD, and UNESCO.',
    url: 'https://osman-geomatics.com',
    siteName: 'Osman Ibrahim Portfolio',
    images: [
      {
        url: 'https://i.imgur.com/1QHqofS.jpg',
        width: 800,
        height: 1000,
        alt: 'Osman Ibrahim — Geomatics Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osman Ibrahim — Remote Sensing & GIS Expert',
    description:
      'Geomatics Engineer with 8+ years in satellite data analysis, water management, and crop monitoring.',
    images: ['https://i.imgur.com/1QHqofS.jpg'],
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
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Prevent flash of wrong theme — runs before paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Osman Osama Ahmed Ibrahim',
              alternateName: 'Osman Ibrahim',
              jobTitle: 'Remote Sensing & GIS Expert',
              url: 'https://osman-geomatics.com',
              email: 'osmangeomatics93@gmail.com',
              image: 'https://i.imgur.com/1QHqofS.jpg',
              sameAs: [
                'https://www.linkedin.com/in/osman-ibrahim-a02a9a197/',
                'https://github.com/Osman-Geomatics93',
              ],
              alumniOf: [
                {
                  '@type': 'EducationalOrganization',
                  name: 'Karadeniz Technical University',
                  url: 'https://www.ktu.edu.tr',
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'Omdurman Islamic University',
                },
              ],
              knowsAbout: [
                'Remote Sensing',
                'Geographic Information Systems',
                'Satellite Image Analysis',
                'WaPOR Water Productivity',
                'Google Earth Engine',
                'Water Resource Management',
                'Crop Monitoring',
                'Machine Learning',
                'Python',
                'QGIS',
                'Geomatics Engineering',
              ],
            }),
          }}
        />
      </head>
      <body className={dmSans.className}>
        <Preloader />
        <CursorGlow />
        <ScrollProgress />
        <FilmGrain />
        <CommandPalette />
        <Toast />
        <BackToTop />
        <ChatBot />
        <PageTransition>{children}</PageTransition>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

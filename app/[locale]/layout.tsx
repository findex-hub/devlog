import 'css/prism.css'
import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import TwSizeIndicator from '@/components/helper/TwSizeIndicator'
import Footer from '@/components/navigation/Footer'
import Header from '@/components/navigation/Header'
import { SearchProvider } from '@/components/search/SearchProvider'
import SectionContainer from '@/components/SectionContainer'
import { ThemeProvider } from '@/components/theme/ThemeContext'
import ThemeScript from '@/components/theme/ThemeScript'
import { maindescription, maintitle } from '@/data/localeMetadata'
import siteMetadata from '@/data/siteMetadata'
import { dir } from 'i18next'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import type { ReactElement } from 'react'
import type { LocaleTypes } from './i18n/settings'

export const runtime = 'edge'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LocaleTypes }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
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
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: LocaleTypes }>
}): Promise<ReactElement> {
  const { locale } = await params

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#020617" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-slate-950 dark:text-white">
        <TwSizeIndicator />
        <ThemeProvider>
          <ThemeScript />
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <SectionContainer>
            <div className="relative flex min-h-screen flex-col justify-between overflow-hidden font-sans">
              <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_36%),radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.14),_transparent_28%),linear-gradient(180deg,_rgba(248,250,252,0.96),_rgba(248,250,252,0))] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_20%_20%,_rgba(129,140,248,0.16),_transparent_24%),linear-gradient(180deg,_rgba(2,6,23,0.98),_rgba(2,6,23,0))]" />
              <SearchProvider>
                <Header />
                <main className="mb-auto pb-16 lg:pb-24">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  )
}

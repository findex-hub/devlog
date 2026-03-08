import Link from '@/components/mdxcomponents/Link'
import NewsletterForm from '@/components/newletter/NewsletterForm'
import siteMetadata from '@/data/siteMetadata'
import React from 'react'
import { createTranslation } from '../app/[locale]/i18n/server'
import type { LocaleTypes } from '../app/[locale]/i18n/settings'
import FeaturedLayout from './FeaturedLayout'
import LayoutHeader from './home/LayoutHeader'
import PostList from './home/PostList'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

interface HomeProps {
  featuredPosts?: Post[]
  posts: Post[]
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 5

export default async function HomeLayout({
  featuredPosts = [],
  posts,
  params: { locale },
}: HomeProps): Promise<React.JSX.Element> {
  const { t } = await createTranslation(locale, 'home')
  const featuredSlugs = new Set(featuredPosts.map((post) => post.slug))
  const latestPosts = posts.filter((post) => !featuredSlugs.has(post.slug))
  const shouldShowFeatured = featuredPosts.length > 0
  const shouldShowLatest = latestPosts.length > 0 || !shouldShowFeatured

  return (
    <div className="space-y-14 pb-10 sm:space-y-16">
      <LayoutHeader locale={locale} title={t('greeting')} description={t('description')} />

      {shouldShowFeatured ? <FeaturedLayout posts={featuredPosts} params={{ locale }} /> : null}

      {shouldShowLatest ? (
        <section id="latest-posts" className="space-y-8">
          <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-5 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                {t('latestEyebrow')}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                {t('latestTitle')}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
                {t('latestDescription')}
              </p>
            </div>
            {latestPosts.length > MAX_DISPLAY && (
              <Link
                href={`/${locale}/blog`}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
                aria-label={t('all')}
              >
                <span>{t('all')}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
          <PostList
            posts={shouldShowFeatured ? latestPosts : posts}
            locale={locale}
            t={t}
            maxDisplay={MAX_DISPLAY}
          />
        </section>
      ) : null}

      {siteMetadata.newsletter?.provider && posts.length > 0 ? (
        <section id="newsletter" className="surface-muted px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                {t('newsletterEyebrow')}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                {t('newsletterTitle')}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                {t('newsletterDescription')}
              </p>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <NewsletterForm />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

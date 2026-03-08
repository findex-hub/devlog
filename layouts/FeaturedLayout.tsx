import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import React from 'react'
import PostList from './home/PostList'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
  featured?: boolean
}

interface HomeProps {
  posts: Post[]
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 2

export default async function FeaturedLayout({
  posts,
  params: { locale },
}: HomeProps): Promise<React.JSX.Element> {
  const { t } = await createTranslation(locale, 'home')
  return (
    <section id="featured-posts" className="space-y-6">
      <div className="space-y-3 border-b border-slate-200/70 pb-5 dark:border-white/10">
        <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
          {t('featuredEyebrow')}
        </p>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
            {t('featured')}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
            {t('featuredDescription')}
          </p>
        </div>
      </div>
      <PostList posts={posts} locale={locale} t={t} maxDisplay={MAX_DISPLAY} />
    </section>
  )
}

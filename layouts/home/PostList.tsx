import Link from '@/components/mdxcomponents/Link'
import Tag from '@/components/tag'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { formatDate } from 'pliny/utils/formatDate'
import React from 'react'

interface Post {
  slug: string
  date: string
  title: string
  summary?: string | undefined
  tags: string[]
  language: string
  draft?: boolean
}

interface PostListProps {
  posts: Post[]
  locale: LocaleTypes
  t: (key: string) => string
  maxDisplay: number
}

const PostList: React.FC<PostListProps> = ({ posts, locale, t, maxDisplay }) => {
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {!posts.length && (
        <li className="surface-card px-6 py-10 text-sm text-slate-500 dark:text-slate-400">{t('noposts')}</li>
      )}
      {posts.slice(0, maxDisplay).map((post) => {
        const { slug, date, title, summary, tags } = post
        return (
          <li key={slug} className="h-full">
            <article className="surface-card group relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="space-y-6">
                <dl className="flex flex-wrap items-center gap-3 text-sm">
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd className="font-medium text-slate-500 dark:text-slate-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                  <dd className="text-slate-300 dark:text-slate-700">·</dd>
                  <dd className="text-xs font-semibold tracking-[0.2em] text-primary-600 uppercase dark:text-primary-400">{t('postCardEyebrow')}</dd>
                </dl>
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl leading-tight font-bold tracking-tight text-slate-950 transition group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      <Link
                        href={`/${locale}/blog/${slug}`}
                        className="transition"
                      >
                        {title}
                      </Link>
                    </h2>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tags.map((tag: string) => (
                        <li key={tag}>
                          <Tag text={tag} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {summary && summary.length > 149 ? `${summary.substring(0, 149)}...` : summary}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-base leading-6 font-medium dark:border-white/10">
                <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">{t('postCardCtaLabel')}</span>
                <Link
                  href={`/${locale}/blog/${slug}`}
                  className="inline-flex items-center gap-2 text-primary-600 transition hover:gap-3 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  aria-label={`${t('more')}"${title}"`}
                >
                  <span>{t('more')}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </li>
        )
      })}
    </ul>
  )
}

export default PostList

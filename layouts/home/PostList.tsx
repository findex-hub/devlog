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
    <ul className="grid gap-6 py-4 lg:grid-cols-2">
      {!posts.length && <li>{t('noposts')}</li>}
      {posts.slice(0, maxDisplay).map((post) => {
        const { slug, date, title, summary, tags } = post
        return (
          <li key={slug} className="h-full">
            <article className="surface-card flex h-full flex-col justify-between p-6 sm:p-7">
              <div className="space-y-5">
                <dl className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd className="font-medium text-slate-500 dark:text-slate-400">
                    <time dateTime={date}>{formatDate(date, locale)}</time>
                  </dd>
                  <dd className="text-slate-300 dark:text-slate-700">•</dd>
                  <dd className="text-primary-600 dark:text-primary-400 font-medium">
                    Featured Note
                  </dd>
                </dl>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl leading-tight font-bold tracking-tight text-slate-950 dark:text-white">
                      <Link
                        href={`/${locale}/blog/${slug}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition"
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
              <div className="mt-8 text-base leading-6 font-medium">
                <Link
                  href={`/${locale}/blog/${slug}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-2 transition hover:gap-3"
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

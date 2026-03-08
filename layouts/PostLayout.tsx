import Comments from '@/components/comments/Comments'
import WalineComments from '@/components/comments/walinecomponents/walineComments'
import Image from '@/components/mdxcomponents/Image'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/scroll'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import Sidetoc from '@/components/sidetoc'
import Tag from '@/components/tag'
import siteMetadata from '@/data/siteMetadata'
import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import type { Authors, Blog } from 'contentlayer/generated'
import type { Toc } from 'pliny/mdx-plugins'
import type { CoreContent } from 'pliny/utils/contentlayer'
import React, { type ReactNode } from 'react'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog> & {
    series?: {
      title: string
      order: number
      posts?: Array<{
        title: string
        slug: string
        language: string
        isCurrent: boolean
      }>
    }
  }
  authorDetails: CoreContent<Authors>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps): Promise<React.JSX.Element> {
  const { filePath, path, slug, date, title, tags, language, series, toc } = content
  const [basePath] = path.split('/')
  const { t } = await createTranslation(locale, 'home')
  const tableOfContents: Toc = toc as unknown as Toc
  return (
    <>
      <ScrollTopAndComment />
      <Sidetoc toc={tableOfContents} />
      <article>
        <div className="space-y-8">
          <header className="surface-card relative overflow-hidden px-6 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="from-primary-500/15 via-heading-500/10 absolute inset-x-0 top-0 h-28 bg-gradient-to-r to-transparent" />
            <div className="relative space-y-4">
              <dl className="space-y-6">
                <div>
                  <dt className="sr-only">{t('pub')}</dt>
                  <dd className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase dark:text-slate-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(language, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div className="mx-auto max-w-4xl">
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {tags?.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] gap-8 pb-8 xl:grid xl:grid-cols-[minmax(16rem,18rem)_minmax(0,1fr)] xl:gap-x-8">
            <dl className="surface-card h-fit px-5 py-6 xl:sticky xl:top-28">
              <dt className="sr-only">{t('authors')}</dt>
              <dd>
                <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                  Author
                </p>
                <ul className="mt-5 flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-6 xl:space-x-0">
                  {authorDetails.map((author, index) => {
                    const authorKey = author.slug || author.name || `author-${index}`
                    return (
                      <li className="flex items-center space-x-3" key={authorKey}>
                        {author.avatar ? (
                          <Link href={`/${locale}/about/${author.slug}`}>
                            <Image
                              src={author.avatar}
                              width={38}
                              height={38}
                              alt="avatar"
                              title="avatar"
                              className="h-11 w-11 rounded-full"
                            />
                          </Link>
                        ) : null}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">{t('name')}</dt>
                          <dd className="text-slate-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter ? (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter.replace('https://twitter.com/', '@')}
                              </Link>
                            ) : null}
                          </dd>
                        </dl>
                      </li>
                    )
                  })}
                </ul>
              </dd>
            </dl>
            <div className="surface-card divide-y divide-slate-200/70 px-6 py-6 sm:px-8 lg:px-10 xl:pb-0 dark:divide-white/10">
              {series && series.posts ? (
                <div className="not-prose mt-4">
                  <PostSeriesBox
                    data={
                      series as {
                        title: string
                        posts: Array<{
                          title: string
                          slug: string
                          language: string
                          isCurrent: boolean
                        }>
                      }
                    }
                  />
                </div>
              ) : null}
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
              <div className="flex flex-wrap items-center gap-3 pt-6 pb-6 text-sm text-slate-700 dark:text-gray-300">
                <Link
                  href={discussUrl(path)}
                  rel="nofollow"
                  className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-500/40 dark:hover:text-primary-400 inline-flex rounded-full border border-slate-200 px-4 py-2 transition dark:border-white/10"
                >
                  {t('twitter')}
                </Link>
                <Link
                  href={editUrl(filePath)}
                  className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-500/40 dark:hover:text-primary-400 inline-flex rounded-full border border-slate-200 px-4 py-2 transition dark:border-white/10"
                >
                  {t('github')}
                </Link>
              </div>
              <Share title={title} slug={slug} />
              <div
                className="mt-10 pt-6 pb-6 text-center text-slate-700 dark:text-gray-300"
                id="comment"
              >
                {siteMetadata.iswaline === true && <WalineComments />}
                {siteMetadata.comments && siteMetadata.iscomments === true ? (
                  <Comments slug={slug} />
                ) : null}
              </div>
            </div>
            <footer>
              <div className="surface-card text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2">
                {next || prev ? (
                  <div className="flex flex-col gap-4 p-5 xl:space-y-4">
                    {prev && prev.slug ? (
                      <div className="rounded-2xl border border-slate-200/80 p-4 dark:border-white/10">
                        <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          {t('preva')}
                        </p>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2">
                          <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    ) : null}
                    {next && next.slug ? (
                      <div className="rounded-2xl border border-slate-200/80 p-4 dark:border-white/10">
                        <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          {t('nexta')}
                        </p>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2">
                          <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${locale}/${basePath}`}
                  className="text-primary-500 hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-500/40 dark:hover:text-primary-400 inline-flex items-center rounded-full border border-slate-200 px-4 py-2 transition dark:border-white/10"
                  aria-label="Back to the blog"
                >
                  &larr;{t('back')}
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}

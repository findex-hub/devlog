'use client'

import Link from '@/components/mdxcomponents/Link'
import { sortByDate } from '@/components/util/sortByDate'
import { useTagStore } from '@/components/util/useTagStore'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import tagData from 'app/[locale]/tag-data.json'
import type { Blog } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import type { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import React, { useCallback, useMemo, useState } from 'react'
import Pagination from './Pagination'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface PostWithTags extends CoreContent<Blog> {
  tags: string[]
  summary?: string
  [key: string]: unknown
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: PostWithTags[]
  title: string
  initialDisplayPosts?: PostWithTags[]
  pagination?: PaginationProps
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

export default function ListLayoutWithTags({
  params: { locale },
  posts,
  title,
}: ListLayoutProps): React.JSX.Element {
  const { t } = useTranslation(locale, 'home')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)
  const selectedTag = useTagStore((state) => state.selectedTag)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)

  const filteredPosts = useMemo(() => {
    if (selectedTag) {
      return sortedPosts.filter((post) => {
        const tags = post.tags as string[]
        return tags.includes(selectedTag)
      })
    }
    return sortedPosts
  }, [selectedTag, sortedPosts])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const displayPosts = filteredPosts.slice(startIndex, endIndex)

  const onPageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleTagClick = useCallback(
    (tag: string) => {
      setSelectedTag(tag === useTagStore.getState().selectedTag ? '' : tag)
      setCurrentPage(1)
    },
    [setSelectedTag]
  )

  const handleClearTag = useCallback(() => {
    setSelectedTag('')
  }, [setSelectedTag])

  const tagCountMap = tagData[locale]

  const createTagClickHandler = useCallback(
    (postTag: string) => {
      return () => handleTagClick(postTag)
    },
    [handleTagClick]
  )

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-2">
        <button
          onClick={createTagClickHandler(postTag)}
          aria-labelledby={`${t('poststagged')} ${postTag}`}
          className="w-full text-left"
        >
          <h3
            className={`inline-flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium uppercase transition-colors ${
              useTagStore.getState().selectedTag === postTag
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-300'
                : 'hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-white/5'
            }`}
          >
            <span>{postTag}</span>
            <span className="text-xs text-slate-400">{tagCountMap[postTag]}</span>
          </h3>
        </button>
      </li>
    )
  })

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-6 pb-2">
        <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">Archive</p>
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-slate-950 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
          주제별로 탐색하고, 아카이브처럼 쌓인 개발 기록을 빠르게 훑어볼 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="surface-muted hidden max-h-screen max-w-[300px] min-w-[300px] flex-wrap overflow-auto p-5 lg:flex">
          <div className="w-full">
            <p className="px-3 text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
              Topics
            </p>
            <button
              onClick={handleClearTag}
              className={`${useTagStore.getState().selectedTag === '' ? 'bg-white text-slate-950 ring-1 ring-slate-200/80 dark:bg-white/[0.08] dark:text-white dark:ring-white/10' : 'text-gray-500 dark:text-gray-400'} mt-4 w-full cursor-pointer rounded-2xl px-3 py-3 text-left text-sm font-bold uppercase transition-colors hover:bg-white dark:hover:bg-white/5`}
            >
              {t('all')}
            </button>
            <ul className="mt-2">{filteredTags}</ul>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <motion.ul variants={container} initial="hidden" animate="show">
            {displayPosts.map((post) => {
              const slug = post.slug as string
              const date = post.date as string
              const title = post.title as string
              const summary = post.summary as string | undefined
              const tags = post.tags as string[]
              const language = post.language as string

              if (language === locale) {
                return (
                  <motion.li variants={item} key={slug} className="py-3">
                    <article className="surface-card flex flex-col gap-5 p-6 sm:p-7">
                      <dl className="flex flex-wrap items-center gap-3 text-sm">
                        <dt className="sr-only">{t('pub')}</dt>
                        <dd className="font-medium text-slate-500 dark:text-slate-400">
                          <time dateTime={date}>{formatDate(date, language)}</time>
                        </dd>
                        <dd className="text-slate-300 dark:text-slate-700">·</dd>
                        <dd className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
                          Archive
                        </dd>
                      </dl>
                      <div className="space-y-4">
                        <div>
                          <div className="text-2xl leading-8 font-bold tracking-tight text-slate-950 dark:text-white">
                            <Link
                              href={`/${locale}/blog/${slug}`}
                              className="transition hover:text-primary-600 dark:hover:text-primary-400"
                              aria-labelledby={title}
                            >
                              <h2>{title}</h2>
                            </Link>
                          </div>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {tags.map((t) => (
                              <li key={t}>
                                <button
                                  onClick={createTagClickHandler(t)}
                                  className={`${
                                    useTagStore.getState().selectedTag === t
                                      ? 'border-slate-200 bg-slate-100 text-slate-900 dark:border-white/10 dark:bg-white/[0.08] dark:text-white'
                                      : 'border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:text-white'
                                  } cursor-pointer rounded-full border px-3 py-2 text-xs font-semibold uppercase transition-colors`}
                                  aria-label={`View posts tagged ${t}`}
                                >
                                  {`${t}`}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {summary && summary.length > 149
                            ? `${summary.substring(0, 149)}...`
                            : summary}
                        </div>
                      </div>
                    </article>
                  </motion.li>
                )
              }
            })}
          </motion.ul>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              params={{ locale }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

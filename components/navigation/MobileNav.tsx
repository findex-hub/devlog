'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { allAuthors } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useState, type JSX, type SVGProps } from 'react'
import Link from '../mdxcomponents/Link'

export function ChevronDownIcon({ className, ...props }: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707"
        clipRule="evenodd"
      />
    </svg>
  )
}

const MobileNav = (): JSX.Element => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1))

  const mainAuthor = allAuthors.filter((a) => a.default === true && a.language === locale)

  const [navShow, setNavShow] = useState<boolean>(false)
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)

  const onToggleNav = useCallback(() => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }, [])

  const toggleAccordion = useCallback(() => {
    setAccordionOpen(!accordionOpen)
  }, [accordionOpen])

  return (
    <>
      <button
        aria-label={t('showmenu')}
        onClick={useCallback(() => onToggleNav(), [onToggleNav])}
        className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-500/40 rounded-full border border-slate-200/80 bg-white/80 p-2 text-slate-900 backdrop-blur transition sm:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed inset-0 z-60 transform overflow-y-auto bg-slate-950/30 p-3 backdrop-blur-sm duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="ml-auto flex min-h-full w-full max-w-sm flex-col rounded-[2rem] border border-white/10 bg-white/90 p-6 shadow-2xl dark:bg-slate-950/95">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-[0.28em] uppercase">
                Navigation
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                Maru Devlog
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                개발 기록과 인사이트를 빠르게 탐색하세요.
              </p>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 dark:border-white/10 dark:bg-white/5"
              aria-label="Toggle Menu"
              onClick={useCallback(() => onToggleNav(), [onToggleNav])}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-slate-900 dark:text-slate-100"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <nav className="mt-8 flex-1">
            <div className="space-y-3">
              {headerNavLinks.map((link) => (
                <div key={link.title}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="surface-muted flex items-center justify-between px-5 py-4 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
                    onClick={useCallback(() => onToggleNav(), [onToggleNav])}
                  >
                    {t(`${link.title.toLowerCase()}`)}
                    <span className="text-xs tracking-[0.24em] text-slate-400 uppercase">Go</span>
                  </Link>
                </div>
              ))}
            </div>
            {siteMetadata.multiauthors ? (
              <>
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-between rounded-2xl border border-slate-200/80 px-5 py-4 text-left text-base font-semibold tracking-tight text-slate-900 dark:border-white/10 dark:text-slate-100"
                  onClick={useCallback(() => toggleAccordion(), [toggleAccordion])}
                >
                  <div>{t('about')}</div>
                  <motion.div
                    animate={{ rotate: accordionOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 ${accordionOpen ? 'text-primary-500' : ''}`}
                    />
                  </motion.div>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: accordionOpen ? 'auto' : 0, opacity: accordionOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-3">
                    {authors.map((author) => {
                      const { name, avatar, language, slug } = author
                      if (language === locale) {
                        return (
                          <button
                            key={name}
                            className="surface-muted group flex w-full items-center px-5 py-4 text-sm"
                          >
                            <div className="mr-3">
                              <Image
                                className="h-auto w-auto rounded-full"
                                src={avatar ?? ''}
                                title="avatar"
                                alt="avatar"
                                width={25}
                                height={25}
                              />
                            </div>
                            <Link
                              href={`/${locale}/about/${slug}`}
                              onClick={useCallback(() => onToggleNav(), [onToggleNav])}
                              className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100"
                            >
                              {name}
                            </Link>
                          </button>
                        )
                      }
                      return null
                    })}
                  </div>
                </motion.div>
              </>
            ) : null}
            {siteMetadata.multiauthors === false && (
              <div className="mt-6 rounded-2xl border border-slate-200/80 px-5 py-4 text-base font-semibold tracking-tight text-slate-900 dark:border-white/10 dark:text-slate-100">
                {mainAuthor.map((author) => {
                  const { name, language, slug } = author
                  if (language === locale) {
                    return (
                      <Link
                        href={`/${locale}/about/${slug}`}
                        onClick={useCallback(() => onToggleNav(), [onToggleNav])}
                        key={name}
                      >
                        {t('about')}
                      </Link>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileNav

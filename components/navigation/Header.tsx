'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { useParams, usePathname } from 'next/navigation'
import type { JSX } from 'react'
import LangSwitch from '../langswitch'
import Link from '../mdxcomponents/Link'
import SearchButton from '../search/SearchButton'
import ThemeSwitch from '../theme/ThemeSwitch'
import AuthorsMenu from './AuthorsMenu'
import MobileNav from './MobileNav'

const Header = (): JSX.Element => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 pt-4">
      <div className="surface-card flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center gap-4">
              <div className="from-primary-500/20 via-heading-500/15 to-primary-500/5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-slate-200/70 dark:ring-white/10">
                <Logo />
              </div>
              <div className="min-w-0">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="truncate text-lg font-semibold tracking-tight text-slate-950 sm:text-xl dark:text-white">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
                <p className="hidden text-sm text-slate-500 md:block dark:text-slate-400">
                  개발 노트 · 아키텍처 · 실험 기록 · 수익화 인사이트
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="hidden items-center gap-2 xl:flex">
          {headerNavLinks
            .filter((link) => {
              return link.href !== '/'
            })
            .map((link) => {
              const isSelected = pathname.includes(link.href as string)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className="flex transform-gpu items-center transition-transform duration-300"
                >
                  <div
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'text-slate-950 dark:text-white'
                        : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{t(`${link.title.toLowerCase()}`)}</span>
                    {isSelected ? (
                      <motion.span
                        layoutId="tab"
                        transition={{ type: 'spring', duration: 0.4 }}
                        className="absolute inset-0 z-0 rounded-full bg-slate-950/6 ring-1 ring-slate-200/80 dark:bg-white/8 dark:ring-white/10"
                      />
                    ) : null}
                  </div>
                </Link>
              )
            })}
          <AuthorsMenu className="hidden xl:block" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <SearchButton />
          <ThemeSwitch />
          <LangSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header

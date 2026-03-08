import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import React from 'react'

export interface LayoutHeaderProps {
  locale: LocaleTypes
  title: string
  description?: string
}

export default async function LayoutHeader({
  title,
  description,
  locale,
}: LayoutHeaderProps): Promise<React.JSX.Element> {
  const { t } = await createTranslation(locale, 'home')

  return (
    <section className="pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="from-primary-500/12 via-heading-500/10 absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-400/10" />
      </div>
      <div className="surface-card relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="from-primary-500/10 via-heading-500/5 absolute inset-x-0 top-0 h-20 bg-gradient-to-r to-transparent" />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <div className="space-y-6">
            <div className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300 inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.28em] uppercase">
              {t('heroBadge')}
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-4xl leading-tight font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                {title}
              </h1>
              {description ? (
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                  {description}
                </p>
              ) : null}
              <p className="max-w-3xl text-sm leading-7 text-slate-500 sm:text-base dark:text-slate-400">
                {t('heroBody')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                {t('heroTagOne')}
              </span>
              <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                {t('heroTagTwo')}
              </span>
              <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
                {t('heroTagThree')}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#featured-posts"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {t('heroFeaturedCta')}
            </a>
            <a
              href="#latest-posts"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {t('heroLatestCta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

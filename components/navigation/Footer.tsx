'use client'

import SocialIcon from '@/components/social-icons'
import { maintitle } from '@/data/localeMetadata'
import siteMetadata from '@/data/siteMetadata'
import Link from '../mdxcomponents/Link'

import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useCallback, type JSX } from 'react'

import { ContactModal } from '../formspree'
import { useContactModal } from '../formspree/store'

export default function Footer(): JSX.Element {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'footer')
  const contactModal = useContactModal()
  const socialLinks = [
    { kind: 'github', href: siteMetadata.github },
    { kind: 'linkedin', href: siteMetadata.linkedin },
    { kind: 'x', href: siteMetadata.x },
  ] as const

  const handleContactClick = useCallback((): void => {
    contactModal.onOpen()
  }, [contactModal])

  return (
    <>
      <footer className="pb-10">
        <div className="mt-16 border-t border-slate-200/70 pt-10 dark:border-white/10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-slate-400 uppercase">
                Dev Log: Coding & Troubleshooting
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                지식과 경험을 쌓는 개발 노트
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                Documenting solutions and dev experiences.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {siteMetadata.formspree === false ? (
                  <Link
                    href={`mailto:${siteMetadata.email}`}
                    className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {siteMetadata.email}
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                    onClick={handleContactClick}
                  >
                    문의하기
                  </button>
                )}
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                >
                  최신 글 보기
                </Link>
              </div>
            </div>
            <div className="surface-muted px-5 py-6">
              <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                Connect
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                  {siteMetadata.formspree === false ? (
                    <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
                  ) : (
                    <button
                      className="flex items-center focus:outline-none"
                      onClick={handleContactClick}
                    >
                      <SocialIcon kind="mail" size={5} />
                    </button>
                  )}
                </div>
                {socialLinks.map((socialLink) => (
                  <div
                    key={socialLink.kind}
                    className="flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-3 dark:border-white/10 dark:bg-white/5"
                  >
                    <SocialIcon kind={socialLink.kind} href={socialLink.href} size={5} />
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span>{siteMetadata.author}</span>
                  <span>•</span>
                  <span>© {new Date().getFullYear()}</span>
                </div>
                <Link
                  href={`/${locale}/`}
                  className="font-medium text-slate-700 dark:text-slate-200"
                >
                  {maintitle[locale]}
                </Link>
                <p>{t('theme')}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ContactModal />
    </>
  )
}

import Image from '@/components/mdxcomponents/Image'
import SocialIcon from '@/components/social-icons'
import type { Authors } from 'contentlayer/generated'
import React, { type ReactNode } from 'react'

import { createTranslation } from 'app/[locale]/i18n/server'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'

interface AuthorLayoutProps {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  params: { locale: LocaleTypes }
}

export default async function AuthorLayout({
  children,
  content,
  params: { locale },
}: AuthorLayoutProps): Promise<React.JSX.Element> {
  const { name, avatar, occupation, company, twitter, linkedin, github } = content
  const { t } = await createTranslation(locale, 'about')

  return (
    <div className="space-y-10 pb-8">
      <div className="space-y-3 pt-6">
        <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">About</p>
        <h1 className="text-3xl leading-tight font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
          {t('about')}
        </h1>
      </div>
      <div className="grid gap-8 xl:grid-cols-[minmax(18rem,22rem)_minmax(0,1fr)] xl:items-start">
        <aside className="surface-card px-6 py-7 sm:px-8">
          <div className="flex flex-col items-center text-center">
            {avatar ? (
              <Image
                src={avatar}
                alt="avatar"
                title="avatar"
                width={192}
                height={192}
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : null}
            <h2 className="pt-5 text-2xl leading-8 font-bold tracking-tight text-slate-950 dark:text-white">
              {name}
            </h2>
            <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{occupation}</div>
            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{company}</div>
            <div className="mt-6 flex space-x-3">
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
          </div>
        </aside>
        <div className="surface-card px-6 py-8 sm:px-8 lg:px-10">
          <div className="prose dark:prose-invert max-w-none pt-0 pb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}

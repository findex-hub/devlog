import React from 'react'

interface LayoutHeaderProps {
  title: string
  description?: string
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ title, description }) => {
  return (
    <div className="grid gap-6 pt-8 pb-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.9fr)] lg:items-end lg:gap-8 lg:pt-10 lg:pb-16">
      <div className="surface-card grid-pattern relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="from-primary-500/12 via-heading-500/10 absolute inset-x-0 top-0 h-24 bg-gradient-to-r to-transparent" />
        <div className="relative space-y-6">
          <div className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-300 inline-flex rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.28em] uppercase">
            Developer Notes & Business Leverage
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              {title}
            </h1>
            {description ? (
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                {description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
              실전 개발 기록
            </span>
            <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
              제품화 관점 인사이트
            </span>
            <span className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 dark:border-white/10 dark:bg-white/5">
              지속 가능한 수익화 실험
            </span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        <div className="surface-muted px-5 py-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">Focus</p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            아키텍처와 실행력
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            읽고 끝나는 글보다, 바로 적용 가능한 구조와 결정 이유를 남깁니다.
          </p>
        </div>
        <div className="surface-muted px-5 py-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
            Audience
          </p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            개발자와 빌더
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            코드, 제품, 운영을 함께 고민하는 사람을 위한 노트입니다.
          </p>
        </div>
        <div className="surface-muted px-5 py-5">
          <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">Value</p>
          <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            기록이 자산이 되도록
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            개발 로그를 브랜딩과 기회로 전환하는 흐름을 설계합니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LayoutHeader

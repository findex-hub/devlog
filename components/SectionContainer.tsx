import React, { type ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
}

export default function SectionContainer({ children }: SectionContainerProps): React.JSX.Element {
  return <section className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">{children}</section>
}

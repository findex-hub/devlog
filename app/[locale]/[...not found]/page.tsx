import { notFound } from 'next/navigation'
import type { ReactElement } from 'react'

export const runtime = 'edge'

export default function NotFoundCatchAll(): ReactElement {
  notFound()
}

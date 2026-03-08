import type { InitOptions } from 'i18next'
import { additionalLngs, fallbackLng, secondLng } from './locales'

export { fallbackLng, secondLng }

export const locales = [fallbackLng, secondLng, ...additionalLngs] as const
export const enabledLocales = [fallbackLng] as const
export type LocaleTypes = (typeof locales)[number]
export const defaultNS = 'common'

export function getOptions(locale = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: false,
    supportedLngs: enabledLocales,
    fallbackLng,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}

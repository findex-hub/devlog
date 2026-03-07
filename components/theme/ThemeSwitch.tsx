'use client'

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useOuterClick } from '../util/useOuterClick'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Monitor, Moon, Sun } from './icons'
import { Theme, useTheme } from './ThemeContext'

const ThemeSwitch = (): React.JSX.Element | null => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement | null>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  useEffect(() => {
    if (theme === Theme.SYSTEM) {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkModeChecked(isDarkMode)
    } else {
      setDarkModeChecked(theme === Theme.DARK)
    }
  }, [theme])

  useEffect(() => {
    if (theme === Theme.SYSTEM) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        setDarkModeChecked(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme)
      setMenuOpen(false)
    },
    [setTheme]
  )

  const handleDarkModeChange = useCallback((isChecked: boolean) => {
    setDarkModeChecked(isChecked)
  }, [])

  const handleMenuToggle = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const handleLightTheme = useCallback(() => {
    handleThemeChange(Theme.LIGHT)
  }, [handleThemeChange])

  const handleDarkTheme = useCallback(() => {
    handleThemeChange(Theme.DARK)
  }, [handleThemeChange])

  const handleSystemTheme = useCallback(() => {
    handleThemeChange(Theme.SYSTEM)
  }, [handleThemeChange])

  if (!mounted) return null

  return (
    <div ref={menubarRef} className="mr-1">
      <Menu as="div" className="relative mt-1 inline-block text-left">
        <MenuButton
          aria-label={t('theme')}
          className="hover:border-primary-300 dark:hover:border-primary-500/40 rounded-full border border-slate-200/80 bg-white/80 p-2 backdrop-blur transition dark:border-white/10 dark:bg-white/5"
        >
          <DarkModeSwitch
            checked={darkModeChecked}
            onChange={handleDarkModeChange}
            onClick={handleMenuToggle}
            size={24}
          />
        </MenuButton>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-[-10px]"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-[10px]"
        >
          <MenuItems className="absolute right-0 z-50 mt-3 w-40 origin-top-right overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-slate-900/90">
            <RadioGroup value={theme} onChange={handleThemeChange}>
              <div className="p-1">
                <Radio value={Theme.LIGHT}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={handleLightTheme}
                        className={`${
                          focus
                            ? 'bg-slate-100 dark:bg-white/10'
                            : 'hover:bg-slate-100 dark:hover:bg-white/10'
                        } group hover:text-primary-500 dark:hover:text-primary-400 flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200`}
                      >
                        <Sun className="h-6 w-6" />
                        <span className="ml-2">{t('light')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value={Theme.DARK}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={handleDarkTheme}
                        className={`${
                          focus
                            ? 'bg-slate-100 dark:bg-white/10'
                            : 'hover:bg-slate-100 dark:hover:bg-white/10'
                        } group hover:text-primary-500 dark:hover:text-primary-400 flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200`}
                      >
                        <Moon className="h-6 w-6" />
                        <span className="ml-2">{t('dark')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value={Theme.SYSTEM}>
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={handleSystemTheme}
                        className={`${
                          focus
                            ? 'bg-slate-100 dark:bg-white/10'
                            : 'hover:bg-slate-100 dark:hover:bg-white/10'
                        } group hover:text-primary-500 dark:hover:text-primary-400 flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200`}
                      >
                        <Monitor className="h-6 w-6" />
                        <span className="ml-2">{t('system')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch

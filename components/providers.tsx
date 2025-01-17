'use client'

import { AnimatePresence } from 'framer-motion'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'
import * as React from 'react'

import Loading from '@/app/(app)/loading'

export function Providers({ children }: ThemeProviderProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0)
    }, 2000)
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <AnimatePresence mode="wait">{isLoading && <Loading />}</AnimatePresence>
    </NextThemesProvider>
  )
}

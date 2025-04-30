'use client'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import {
  ThemeProvider as NextThemesProvider,
  useTheme,
  type ThemeProviderProps,
} from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer, type Theme } from 'react-toastify'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()
  const { theme } = useTheme()

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
      <ToastContainer
        autoClose={3000}
        className="!text-black dark:!text-white bg-background"
        position="top-right"
        theme={theme as Theme}
      />
    </SessionProvider>
  )
}

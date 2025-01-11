'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
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
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
      <ToastContainer
        autoClose={3000}
        className="!text-black dark:!text-white bg-background"
        position="bottom-right"
        theme={theme as Theme}
      />
    </SessionProvider>
  )
}

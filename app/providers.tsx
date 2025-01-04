"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Theme } from "react-toastify";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
      <ToastContainer
        theme={theme as Theme}
        position="bottom-right"
        autoClose={3000}
        className="text-black dark:text-white"
      />
    </SessionProvider>
  );
}

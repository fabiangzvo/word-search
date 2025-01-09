'use client'

import { type JSX, useMemo } from 'react'
import colors from 'tailwindcss/colors'
import { useTheme } from 'next-themes'

function Banner(): JSX.Element {
  const { theme } = useTheme()

  const currentColor = useMemo(
    () => (theme === 'light' ? colors.lime : colors.fuchsia),
    [theme]
  )

  return (
    <svg
      className="w-full h-full scale-[2] absolute"
      height="100%"
      viewBox="0 0 1600 800"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="a" x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0"
            stopColor={currentColor[700]}
            suppressHydrationWarning={true}
          />
          <stop
            offset="1"
            stopColor={currentColor[400]}
            suppressHydrationWarning={true}
          />
        </linearGradient>
      </defs>
      <pattern height="24" id="b" patternUnits="userSpaceOnUse" width="24">
        <circle cx="12" cy="12" fill="#ffffff" r="12" />
      </pattern>
      <rect fill="url(#a)" height="100%" width="100%" />
      <rect fill="url(#b)" fillOpacity="0.1" height="100%" width="100%" />
    </svg>
  )
}

export default Banner

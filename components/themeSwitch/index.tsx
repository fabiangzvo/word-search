'use client'

import { type JSX, useCallback, type FunctionComponent } from 'react'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { type SwitchProps, useSwitch } from '@heroui/switch'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'
import { MoonIcon, SunIcon } from 'lucide-react'
import clsx from 'clsx'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export default function ThemeSwitch(props: ThemeSwitchProps): JSX.Element {
  const { className, classNames } = props
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = useCallback(() => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }, [theme])

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${
      theme === 'light' || isSSR ? 'dark' : 'light'
    } mode`,
    onChange,
  })

  const SwitchComponent = Component as FunctionComponent

  return (
    <SwitchComponent
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected || isSSR ? <SunIcon size={22} /> : <MoonIcon size={22} />}
      </div>
    </SwitchComponent>
  )
}

import { type JSX, type TouchEventHandler, useCallback } from 'react'
import { tv } from 'tailwind-variants'

import { type LetterCellProps } from './types'

export const buttonVariants = tv({
  base: 'w-8 h-8 text-base sm:text-lg font-bold rounded-lg transition-all duration-200 ease-in-out text-white bg-default-500 hover:bg-default-400 dark:hover:bg-default-700 border-2 border-default-500 dark:border-default-500',
  variants: {
    color: {
      found:
        'bg-default-700 border-default-600 dark:border-default-950 dark:bg-default-800 pointer-events-none',
      selected:
        'bg-default-600 dark:bg-default-800 shadow-lg border-default-700 dark:border-default-500 hover:bg-default-600 dark:hover:bg-default-800',
    },
  },
})

export default function LetterCell(props: LetterCellProps): JSX.Element {
  const { letter, severity, onSelect, onMouseEnter } = props

  const handleTouchMove = useCallback<TouchEventHandler<HTMLButtonElement>>(
    (e) => {
      const touch = e.touches[0]
      const target = document.elementFromPoint(touch.clientX, touch.clientY)

      if (target && target !== e.currentTarget) {
        const event = new MouseEvent('mousedown', {
          view: window,
          bubbles: true,
          cancelable: true,
        })

        target.dispatchEvent(event)
      }
    },
    []
  )

  const handleTouchStart = useCallback<TouchEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault()
      onSelect()
    },
    [onSelect]
  )

  return (
    <button
      className={buttonVariants({ color: severity })}
      onMouseDown={onSelect}
      onMouseEnter={onMouseEnter}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {letter}
    </button>
  )
}

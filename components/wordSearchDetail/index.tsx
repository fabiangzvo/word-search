'use client'

import { useMemo, type JSX } from 'react'

import { type WordSearchDetailProps } from './types'

export default function WordSearchDetail(
  props: WordSearchDetailProps
): JSX.Element {
  const { grid } = props

  const cells = useMemo(
    () =>
      grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="p-2 text-medium font-bold rounded-lg transition-all duration-200 ease-in-out bg-default-500 text-white border-2 border-default-600 dark:border-default-400 flex justify-center items-center"
          >
            {letter}
          </div>
        ))
      ),
    [grid]
  )

  return (
    <div
      className="grid gap-1 sm:gap-2 p-4 bg-default-400 bg-opacity-30 rounded-xl shadow-lg max-md:overflow-x-auto"
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
    >
      {cells}
    </div>
  )
}

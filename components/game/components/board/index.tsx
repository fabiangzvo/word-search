'use client'

import { JSX, useCallback, useState, useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { Cell } from '@/types/boardGrid'

import Controls from '../controls'
import LetterCell from '../cell'
import { BoardProps } from './types'

function Board(props: BoardProps): JSX.Element {
  const { grid, foundCells, checkWord, className, gridClassName } = props

  const [selectedCells, setSelectedCells] = useState<Cell>([])
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCellSelect = useCallback(
    (row: number, col: number): void => {
      if (!isSelecting) {
        setIsSelecting(true)
        setSelectedCells([[row, col]])
      } else {
        if (selectedCells.some(([r, c]) => r === row && c === col)) return

        const newSelectedCells: Cell = [...selectedCells, [row, col]]

        setSelectedCells(newSelectedCells)
        checkWord && checkWord(newSelectedCells)
      }
    },
    [isSelecting, checkWord, selectedCells]
  )

  const handleSelectionEnd = useCallback((): void => {
    setIsSelecting(false)

    if (selectedCells.length > 1 && checkWord) checkWord(selectedCells)

    setSelectedCells([])
  }, [selectedCells, checkWord])

  const onTouchStart = useCallback((): void => setIsSelecting(true), [])
  const onTouchEnd = useCallback((): void => setIsSelecting(false), [])

  const handleTouchEnd = useCallback(() => {
    onTouchEnd()
    handleSelectionEnd()
  }, [onTouchEnd, handleSelectionEnd])

  const getCellSeverity = useCallback(
    (row: number, col: number) => {
      if (
        foundCells?.some((cell) =>
          cell?.some(([r, c]) => r === row && c === col)
        )
      )
        return 'found'
      if (selectedCells.some(([r, c]) => r === row && c === col))
        return 'selected'
    },
    [foundCells, selectedCells]
  )

  const onMoveBoard = useCallback(
    (dx: number, dy: number) =>
      containerRef.current &&
      containerRef.current.scrollBy({ left: dx, top: dy, behavior: 'smooth' }),
    []
  )

  const cells = useMemo(
    () =>
      grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <LetterCell
            key={`${rowIndex}-${colIndex}`}
            letter={letter}
            severity={getCellSeverity(rowIndex, colIndex)}
            onMouseEnter={() =>
              isSelecting && handleCellSelect(rowIndex, colIndex)
            }
            onSelect={() => handleCellSelect(rowIndex, colIndex)}
          />
        ))
      ),
    [grid, getCellSeverity, isSelecting, handleCellSelect]
  )

  return (
    <div
      className={twMerge(
        'w-full flex justify-center max-md:flex-col gap-4',
        className
      )}
    >
      <Controls onMoveBoard={onMoveBoard} />
      <div
        ref={containerRef}
        className={twMerge(
          'w-full max-md:overflow-x-hidden max-md:touch-none max-md:overscroll-contain sm:flex sm:justify-center',
          gridClassName
        )}
      >
        <div
          className="grid gap-1 p-4 bg-default-200/40 dark:bg-default-400/30 rounded-xl shadow-lg w-fit"
          role="button"
          style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
          tabIndex={0}
          onMouseLeave={handleSelectionEnd}
          onMouseUp={handleSelectionEnd}
          onTouchEnd={handleTouchEnd}
          onTouchStart={onTouchStart}
        >
          {cells}
        </div>
      </div>
    </div>
  )
}

export default Board

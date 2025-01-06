import { useCallback, type JSX } from 'react'

import LetterCell from '../letterCell'

import { type WordSearchGridProps } from './types'

export default function WordSearchGrid(
  props: WordSearchGridProps
): JSX.Element {
  const {
    grid,
    selectedCells,
    foundCells,
    onCellSelect,
    onSelectionEnd,
    isSelecting,
    onTouchStart,
    onTouchEnd,
  } = props

  const handleTouchStart = useCallback(() => {
    onTouchStart()
  }, [onTouchStart])

  const handleTouchEnd = useCallback(() => {
    onTouchEnd()
    onSelectionEnd()
  }, [onTouchEnd, onSelectionEnd])

  return (
    <div
      className="grid gap-1 sm:gap-2 p-4 bg-emerald-100 dark:bg-black rounded-xl shadow-lg"
      role="button"
      style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      tabIndex={0}
      onMouseLeave={onSelectionEnd}
      onMouseUp={onSelectionEnd}
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      {grid.map((row, rowIndex) =>
        row.map((letter, colIndex) => (
          <LetterCell
            key={`${rowIndex}-${colIndex}`}
            isFound={foundCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
            isSelected={selectedCells.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
            letter={letter}
            onMouseEnter={() => isSelecting && onCellSelect(rowIndex, colIndex)}
            onSelect={() => {
              onCellSelect(rowIndex, colIndex)
            }}
          />
        ))
      )}
    </div>
  )
}

import { JSX, useCallback, useState, useMemo } from 'react'

import LetterCell from '../cell'

import { BoardProps } from './types'

import { Cell } from '@/types/boardGrid'

function Board(props: BoardProps): JSX.Element {
  const { grid, foundCells, checkWord } = props

  const [selectedCells, setSelectedCells] = useState<Cell>([])
  const [isSelecting, setIsSelecting] = useState<boolean>(false)

  const handleCellSelect = useCallback(
    (row: number, col: number): void => {
      if (!isSelecting) {
        setIsSelecting(true)
        setSelectedCells([[row, col]])
      } else {
        const newSelectedCells: Cell = [...selectedCells, [row, col]]

        setSelectedCells(newSelectedCells)
        checkWord(newSelectedCells)
      }
    },
    [isSelecting, checkWord, selectedCells]
  )

  const handleSelectionEnd = useCallback((): void => {
    setIsSelecting(false)

    if (selectedCells.length > 1) checkWord(selectedCells)

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
      className="grid gap-1 sm:gap-2 p-4 bg-default-400 bg-opacity-30 rounded-xl shadow-lg overflow-x-auto w-fit"
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
  )
}

export default Board

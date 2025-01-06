export interface WordSearchGridProps {
  grid: string[][]
  selectedCells: Array<[number, number]>
  foundCells: Array<[number, number]>
  onCellSelect: (row: number, col: number) => void
  onSelectionEnd: () => void
  isSelecting: boolean
  onTouchStart: () => void
  onTouchEnd: () => void
}

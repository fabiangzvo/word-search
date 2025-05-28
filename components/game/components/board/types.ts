import type { Cell } from '@/types/boardGrid'

export interface BoardProps {
  grid: string[][]
  foundCells: Cell[]
  checkWord: (cells: Cell) => void
  className?: string
}

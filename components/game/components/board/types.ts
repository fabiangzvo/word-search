import type { Cell } from '@/types/boardGrid'

export interface BoardProps {
  grid: string[][]
  foundCells: Array<[number, number]>
  checkWord: (cells: Cell) => void
}

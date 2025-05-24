import { type IPuzzleItem } from '@/types/puzzle'

export interface PuzzleTableProps {
  puzzles: IPuzzleItem[]
  hideOptions?: boolean
  userId: string
}

export interface SearchState {
  page: number
  search: string
}

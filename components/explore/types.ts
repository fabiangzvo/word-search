import type { Difficult, IPuzzleItem } from '@/types/puzzle'

export interface ExploreProps {
  puzzles: IPuzzleItem[]
}

export interface Filters {
  title: string
  category: string
  difficult?: Difficult
  order: string
}

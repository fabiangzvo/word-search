import { Ref } from 'react'

import { IPuzzleItem } from '@/types/puzzle'

export interface PuzzleListProps {
  puzzles: IPuzzleItem[]
  loaderRef: Ref<HTMLDivElement>
  hideOptions?: boolean
  isLoading?: boolean
  isFinished?: boolean
}

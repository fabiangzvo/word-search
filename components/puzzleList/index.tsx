'use client'

import { type JSX, useMemo } from 'react'

import EmptyContent from './components/emptyContent'
import PuzzleCard from './components/card'

import { type IPuzzleItem } from '@/types/puzzle'

interface PuzzleListProps {
  puzzles: IPuzzleItem[]
  hideOptions?: boolean
}

function PuzzleList({
  puzzles,
  hideOptions = false,
}: PuzzleListProps): JSX.Element {
  const items = useMemo(
    () =>
      puzzles.length > 0 ? (
        puzzles.map((puzzle) => (
          <PuzzleCard key={puzzle._id} {...puzzle} hideOptions={hideOptions} />
        ))
      ) : (
        <EmptyContent />
      ),
    [puzzles]
  )

  return (
    <div className="mt-6 grid text-center h-full gap-6 justify-items-center grid-cols-cards">
      {items}
    </div>
  )
}

export default PuzzleList

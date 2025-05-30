'use client'

import { type JSX, useMemo } from 'react'
import { Card, Skeleton } from '@heroui/react'

import EmptyContent from './components/emptyContent'
import PuzzleCard from './components/card'
import { PuzzleListProps } from './types'

function PuzzleList(props: PuzzleListProps): JSX.Element {
  const { puzzles, hideOptions = false, isLoading = false } = props

  const component = useMemo(
    () =>
      puzzles.map((puzzle) => (
        <PuzzleCard key={puzzle._id} {...puzzle} hideOptions={hideOptions} />
      )),
    [puzzles]
  )

  const statusComponent = useMemo(() => {
    if (isLoading)
      return (
        <Card className="w-full cursor-default px-2">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      )

    if (!isLoading && puzzles.length === 0) return <EmptyContent />

    return null
  }, [isLoading, puzzles])

  return (
    <div className="grid text-center h-full gap-6 justify-items-center grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 relative">
      {component}
      {statusComponent}
    </div>
  )
}

export default PuzzleList

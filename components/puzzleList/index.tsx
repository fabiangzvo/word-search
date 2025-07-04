'use client'

import { Fragment, type JSX, useMemo } from 'react'

import EmptyContent from './components/emptyContent'
import PuzzleCard from './components/card'
import { PuzzleListProps } from './types'
import { LoadingCard } from './components/card/loading'

function PuzzleList(props: PuzzleListProps): JSX.Element {
  const {
    puzzles,
    hideOptions = false,
    isLoading = false,
    isFinished = false,
    loaderRef = null,
  } = props

  const statusComponent = useMemo(() => {
    if (isLoading)
      return (
        <Fragment>
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingCard key={i} loaderRef={loaderRef} />
          ))}
        </Fragment>
      )

    if (isFinished)
      return (
        <div className="col-span-full text-center text-gray-500 text-lg">
          No hay más sopas de letras para mostrar
        </div>
      )

    if (!isLoading && puzzles.length === 0) return <EmptyContent />

    return null
  }, [isLoading, puzzles, isFinished, loaderRef])

  return (
    <div className="grid text-center h-full gap-6 justify-items-center grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 relative">
      {puzzles?.map((puzzle) => (
        <PuzzleCard key={puzzle._id} {...puzzle} hideOptions={hideOptions} />
      ))}
      {statusComponent}
    </div>
  )
}

export default PuzzleList

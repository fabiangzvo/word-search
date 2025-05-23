import { JSX } from 'react'
import PuzzleList from '@components/puzzleList'

import EmptyContent from './components/emptyContent'
import { type ExploreProps } from './types'

function Explore({ puzzles }: ExploreProps): JSX.Element {
  return puzzles.length ? (
    <PuzzleList hideOptions puzzles={puzzles} />
  ) : (
    <EmptyContent />
  )
}

export default Explore

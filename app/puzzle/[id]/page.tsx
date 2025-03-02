import { JSX } from 'react'
import { notFound } from 'next/navigation'

import Game from '@components/game'
import { getDetailGame } from '@lib/queries/game'

import { type PuzzleGameProps } from './types'

async function PuzzleGame({ params }: PuzzleGameProps): Promise<JSX.Element> {
  const { id } = await params

  const game = await getDetailGame(id)

  if (!game) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{game.puzzle.title}</h1>
      <Game
        _id={game._id}
        finishedAt={game.finishedAt}
        puzzle={game.puzzle}
        responses={game.responses}
        startedAt={game.startedAt}
        users={game.users}
        winner={game.winner}
      />
    </div>
  )
}

export default PuzzleGame

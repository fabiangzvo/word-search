import { JSX } from 'react'
import { notFound } from 'next/navigation'
import Game from '@components/game'
import { getDetailGame } from '@lib/queries/game'
import mongooseConnect from '@lib/db'

import { type PuzzleGameProps } from './types'

async function PuzzleGame({ params }: PuzzleGameProps): Promise<JSX.Element> {
  const { id } = await params

  await mongooseConnect()
  const game = await getDetailGame(id)

  if (!game) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{game.puzzle.title}</h1>
      <h3 className="text-sm mb-8 text-center">
        Creada por:&nbsp;
        <span className="font-bold text-default-500">
          {game.puzzle.owner.name}
        </span>
      </h3>
      <Game
        finishedAt={game.finishedAt}
        gameId={game._id}
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

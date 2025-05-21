import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardBody } from '@heroui/card'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { BookOpen, Clock, Grid, Star } from 'lucide-react'
import mongooseConnect from '@lib/db'
import { getDetailGame } from '@lib/queries/game'
import ActivePlayers from '@components/game/components/activePlayers'
import ResultList from '@components/gameResult/components/resultList'
import RebootGameButton from '@components/gameResult/components/rebootGameButton'
import Winner from '@components/gameResult/components/winner'

import { GameProps } from '../types'

dayjs.extend(duration)

async function Results({ params }: GameProps): Promise<JSX.Element> {
  const { gameId } = await params

  await mongooseConnect()
  const game = await getDetailGame(gameId)

  if (!game) notFound()

  const cols = game.puzzle.cols || 0
  const duration = dayjs.duration(dayjs(game.finishedAt).diff(game.startedAt))

  const timeFormatted = `${String(duration.minutes()).padStart(2, '0')}:${String(duration.seconds()).padStart(2, '0')}`
  const countByUser = game.responses.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.user] = (acc[item.user] || 0) + 1

      return acc
    },
    {}
  )
  const [winner, ...players] = game.users
    .sort((a, b) => countByUser[b.user._id] - countByUser[a.user._id])
    .map(({ user, color }, i) => ({
      user: { ...user },
      color,
      initialName: (i + 1).toString(),
      endContent: (
        <div className="flex flex-col items-center text-default-500">
          <span className="font-bold">{countByUser[user._id] || 0}</span>
          <span className="text-sm font-semibold">Palabras</span>
        </div>
      ),
    }))

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{game.puzzle.title}</h1>
      <h3 className="text-sm mb-8 text-center">
        Creada por:&nbsp;
        <span className="font-bold text-default-500">
          {game.puzzle.owner.name}
        </span>
      </h3>
      <ResultList
        list={[
          {
            label: 'Tiempo total',
            value: timeFormatted,
            icon: <Clock className="text-default-500" />,
          },
          {
            label: 'Palabras',
            value: game.puzzle.questions.length,
            icon: <BookOpen className="text-default-500" />,
          },
          {
            label: 'Dificultad',
            value: game.puzzle.difficult,
            icon: <Star className="text-default-500" />,
          },
          {
            label: 'Tamaño',
            value: `${cols}x${cols}`,
            icon: <Grid className="text-default-500" />,
          },
        ]}
      />
      <div className="mt-8">
        <Card shadow="sm">
          <CardHeader className="justify-center text-surface-200 flex-col my-6 relative">
            <Winner
              name={winner.user.name}
              questions={countByUser[winner.user._id]}
            />
            <RebootGameButton gameId={gameId} />
          </CardHeader>
          <CardBody className="text-center pt-0">
            <ActivePlayers
              hideEmptyContent
              shadow="none"
              showHeader={false}
              users={players}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Results

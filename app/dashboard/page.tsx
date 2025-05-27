import { type JSX } from 'react'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { Puzzle, Globe, Gamepad2, Crown } from 'lucide-react'

import { getSession } from '@lib/session'
import { getPuzzleStats } from '@lib/queries/puzzle'
import PuzzleTable from '@components/puzzleTable'
import mongooseConnect from '@lib/db'
import StatList from '@components/statList'

async function Dashboard(): Promise<JSX.Element> {
  await mongooseConnect()

  const session = await getSession()
  const stats = await getPuzzleStats(session?.user?.id!)

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-6">
          Hola {session?.user.name ?? '👋'}
        </h1>
        <Button as={Link} color="primary" href="/puzzle/create">
          Crear sopa de letras
        </Button>
      </div>
      <div className="mb-6 mt-4">
        <StatList
          list={[
            {
              label: 'Creadas',
              value: stats.totalPuzzles,
              icon: <Puzzle className="text-default-500" size={32} />,
            },
            {
              label: 'Publicadas',
              value: stats.publicPuzzles,
              icon: <Globe className="text-default-500" size={32} />,
            },
            {
              label: 'Jugadas',
              value: stats.gamesPlayed,
              icon: <Gamepad2 className="text-default-500" size={32} />,
            },
            {
              label: 'Ganadas',
              value: stats.gamesWon,
              icon: <Crown className="text-default-500" size={32} />,
            },
          ]}
        />
      </div>
      <PuzzleTable userId={session?.user?.id!} />
    </div>
  )
}

export default Dashboard

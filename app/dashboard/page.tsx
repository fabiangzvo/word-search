import { type JSX } from 'react'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { getSession } from '@lib/session'
import { getPuzzles } from '@lib/queries/puzzle'
import PuzzleList from '@components/puzzleList'
import mongooseConnect from '@lib/db'

import { type IPuzzleItem } from '@/types/puzzle'

async function Dashboard(): Promise<JSX.Element> {
  await mongooseConnect()

  const session = await getSession()
  const puzzles = await getPuzzles<IPuzzleItem[]>({
    filters: { owner: session?.user?.id },
    projection: {
      questionsCount: { $size: '$questions' },
      title: true,
      categories: true,
      difficult: true,
      cols: true,
      isPublic: true,
      _id: true,
    },
  })

  return (
    <div className="min-h-[70vh]">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold mb-6">Hola {session?.user.name}</h1>
        <Button as={Link} color="primary" href="/puzzle/create">
          Crear sopa de letras
        </Button>
      </div>
      <PuzzleList puzzles={puzzles} />
    </div>
  )
}

export default Dashboard

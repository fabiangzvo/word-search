import { type JSX } from 'react'
import { Button } from '@heroui/button'
import { Card, CardHeader, CardBody } from '@heroui/card'
import { Link } from '@heroui/link'
import { getSession } from '@lib/session'
import { getPuzzles } from '@lib/queries/puzzle'
import PuzzleTable from '@components/puzzleTable'
import mongooseConnect from '@lib/db'
import SearchInput from '@components/searchInput'

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
      <Card>
        <CardHeader className="grid grid-cols-2 px-6 pt-6">
          <h2 className="text-lg font-medium">Tus sopas de letras</h2>
          {puzzles.length > 0 ? <SearchInput variant="bordered" /> : null}
        </CardHeader>
        <CardBody>
          <PuzzleTable puzzles={puzzles} />
        </CardBody>
      </Card>
    </div>
  )
}

export default Dashboard

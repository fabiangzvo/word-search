import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { Chip } from '@heroui/react'

import { getDetailPuzzle } from '@lib/queries/puzzle'
import { getSession } from '@lib/session'
import PlayButton from '@components/playButton'
import mongooseConnect from '@lib/db'
import BoardGrid from '@components/game/components/board'

import { PuzzleDetailProps } from './types'
import Avatar from '@components/avatar'
import { CategoryList } from '@components/puzzleForm/components/categoryList'

async function PuzzleDetail({
  params,
}: PuzzleDetailProps): Promise<JSX.Element> {
  const { id } = await params

  const session = await getSession()

  await mongooseConnect()

  const puzzle = await getDetailPuzzle(id)

  if (!puzzle) notFound()

  const questionList = puzzle.questions.map((question, index) => (
    <li
      key={index}
      className="flex gap-4 items-center px-4 py-2 box-border bg-content1 outline-none shadow-small rounded-large transition-transform-background"
    >
      <Avatar
        classNames={{
          name: 'text-sm text-primary-600 font-bold',
          base: 'bg-primary/20 h-9 w-9',
        }}
        name={`#${index + 1}`}
      />
      <div>
        <span className="flex">{question.label}</span>
        <span className="font-bold text-default-600 flex">
          {question.answer}
        </span>
      </div>
    </li>
  ))

  const isOwner = session?.user?.id === puzzle.owner._id.toString()
  const gridComponent = isOwner ? (
    <BoardGrid
      className="pointer-events-none"
      foundCells={[]}
      grid={puzzle.matrix}
    />
  ) : (
    <p className="text-foreground-400 text-center my-8">
      El tablero solo es visible para el creador o al momento de jugar.
    </p>
  )

  return (
    <div className="cursor-default mb-10">
      <h1 className="text-2xl font-bold text-center">
        {puzzle.title}&nbsp;
        <Chip color={puzzle.isPublic ? 'primary' : 'warning'} variant="flat">
          <p className="font-semibold">
            {puzzle.isPublic ? 'Pública' : 'Privada'}
          </p>
        </Chip>
      </h1>
      <h3 className="text-sm mb-8 text-center">
        Creada por:&nbsp;
        <span className="font-bold text-default-500">{puzzle.owner.name}</span>
      </h3>
      <div className="w-full flex justify-end mb-8">
        <PlayButton puzzleId={id} />
      </div>
      {gridComponent}
      <h2 className="text-2xl font-bold mb-4 mt-10">Preguntas</h2>
      <ol className="list-none list-inside grid grid-cols-1 gap-4">
        {questionList}
      </ol>
      <h2 className="text-2xl font-bold mb-4 mt-10">Categorias</h2>
      <span className="flex gap-2 flex-wrap">
        <CategoryList categories={puzzle.categories.map((item) => item.name)} />
      </span>
    </div>
  )
}

export default PuzzleDetail

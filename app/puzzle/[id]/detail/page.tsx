import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { Chip } from '@heroui/react'

import { getDetailPuzzle } from '@lib/queries/puzzle'
import { getSession } from '@lib/session'
import PlayButton from '@components/playButton'
import mongooseConnect from '@lib/db'
import BoardGrid from '@components/game/components/board'
import { CategoryList } from '@components/puzzleForm/components/categoryList'
import Avatar from '@components/avatar'

import { PuzzleDetailProps } from './types'

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

  return (
    <div className="cursor-default mb-10">
      <div className="w-full flex flex-col items-start gap-y-2">
        <div className="w-full flex justify-center items-center max-md:flex-col max-md:items-center relative max-md:gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-4">
              {puzzle.title}
              <Chip
                color={puzzle.isPublic ? 'primary' : 'warning'}
                variant="flat"
              >
                <p className="font-semibold">
                  {puzzle.isPublic ? 'Pública' : 'Privada'}
                </p>
              </Chip>
            </h1>
            <h3 className="text-sm text-center w-full">
              Creada por:&nbsp;
              <span className="font-bold text-default-500">
                {puzzle.owner.name}
              </span>
            </h3>
          </div>
          <PlayButton puzzleId={id} />
        </div>
        <p className="w-full text-base text-center">{puzzle.description}</p>
        <div className="space-y-2 grid grid-cols-3 max-md:grid-cols-2 gap-y-2 w-full mb-3">
          <div className="flex flex-col items-center gap-y-2 max-md:col-span-full">
            <span className="text-foreground-500">dificultad</span>
            <span>{puzzle.difficult}</span>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-foreground-500">tamaño</span>
            <span>
              {puzzle.matrix.length}x{puzzle.matrix.length}
            </span>
          </div>
          <div className="flex flex-col items-center gap-y-2">
            <span className="text-foreground-500">Preguntas</span>
            <span>{puzzle.questions.length}</span>
          </div>
        </div>
        {puzzle.categories.length > 0 && (
          <CategoryList
            categories={puzzle.categories.map((item) => item.name)}
            className="justify-center w-full mb-8"
          />
        )}
      </div>
      <div className="relative flex items-center justify-center">
        <BoardGrid
          foundCells={[]}
          grid={puzzle.matrix}
          gridClassName={'pointer-events-none' + (isOwner ? '' : ' blur-sm')}
        />
        {!isOwner && (
          <div className="absolute z-10 font-semibold text-lg text-wrap text-center">
            Solo es visible para el creador
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-10">Preguntas</h2>
      <ol className="list-none list-inside grid grid-cols-1 gap-4">
        {questionList}
      </ol>
    </div>
  )
}

export default PuzzleDetail

import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { Chip } from '@heroui/react'
import { getDetailPuzzle } from '@lib/queries/puzzle'
import WordSearchDetail from '@components/wordSearchDetail'
import { getSession } from '@lib/session'
import PlayButton from '@components/playButton'
import mongooseConnect from '@lib/db'

import { PuzzleDetailProps } from './types'

async function PuzzleDetail({
  params,
}: PuzzleDetailProps): Promise<JSX.Element> {
  const { id } = await params

  const session = await getSession()

  await mongooseConnect()

  const puzzle = await getDetailPuzzle(id)

  if (!puzzle) notFound()

  const questionList = puzzle.questions.map((question) => (
    <li key={question.answer} className="mb-2">
      <div>
        <p className="text-lg font-medium mb-1">{question.label}</p>
        <span className="text-lg font-bold text-default-600 flex items-center">
          <Check className="w-6 h-6 mr-2" strokeWidth={4} />
          {question.answer}
        </span>
      </div>
    </li>
  ))

  const categories = puzzle.categories.map((category, i) => (
    <Chip key={i} color="primary" variant="flat">
      <p className="font-semibold">{category.name}</p>
    </Chip>
  ))

  const isOwner = session?.user?.id === puzzle.owner._id.toString()
  const gridComponent = isOwner ? (
    <WordSearchDetail grid={puzzle.matrix} />
  ) : (
    <p className="text-foreground-400 text-center my-8">
      El tablero solo es visible para el creador o al momento de jugar.
    </p>
  )

  return (
    <div className="cursor-default">
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
      <h2 className="text-2xl font-bold mb-4 mt-10">Preguntas:</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">{questionList}</ul>
      <h2 className="text-2xl font-bold mb-4 mt-10">Categorias:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{categories}</div>
    </div>
  )
}

export default PuzzleDetail

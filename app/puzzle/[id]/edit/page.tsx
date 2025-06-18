import { type JSX } from 'react'
import { notFound } from 'next/navigation'

import { PuzzleForm } from '@components/puzzleForm'
import { getDetailPuzzle } from '@lib/queries/puzzle'

interface EditPuzzleProps {
  params: Promise<{ id: string }>
}

export default async function EditPuzzle({
  params,
}: EditPuzzleProps): Promise<JSX.Element> {
  const { id } = await params

  const puzzle = await getDetailPuzzle(id)

  if (!puzzle) notFound()

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Editar&nbsp;
        <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
          sopa de letras
        </span>
      </h2>
      <PuzzleForm
        defaultValues={{
          title: puzzle.title,
          difficult: puzzle.difficult,
          numberOfQuestions: puzzle.questions.length,
          categories: puzzle.categories.map((category) => category.name),
          numberOfRows: puzzle.matrix.length,
          description: puzzle.description,
          questions: puzzle.questions.map((question) => ({
            label: question.label,
            answer: question.answer,
          })),
          matrix: puzzle.matrix,
          prompt: puzzle.prompt,
        }}
        puzzleId={id}
      />
    </div>
  )
}

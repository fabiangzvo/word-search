import { type JSX } from 'react'
import { notFound } from 'next/navigation'
import { WordSearchGame } from '@components/wordSearchGame'
import { getDetailPuzzle } from '@queries/puzzle'

import { type GameProps } from './types'

async function Page({ params }: GameProps): Promise<JSX.Element> {
  const { slug } = await params
  const puzzle = await getDetailPuzzle(slug)

  if (!puzzle) notFound()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <WordSearchGame
        gameId={slug}
        grid={puzzle.matrix}
        questions={puzzle.questions}
      />
    </section>
  )
}

export default Page

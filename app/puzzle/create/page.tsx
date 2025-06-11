import { type JSX } from 'react'

import { PuzzleForm } from '@components/puzzleForm'

export default async function CreatePuzzle(): Promise<JSX.Element> {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Crear&nbsp;
        <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-500">
          sopa de letras
        </span>
      </h2>
      <PuzzleForm />
    </div>
  )
}

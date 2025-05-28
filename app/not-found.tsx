'use client'

import { JSX, useCallback, useState } from 'react'
import { CircleCheckBig } from 'lucide-react'
import { Link } from '@heroui/link'
import Confetti from 'react-confetti'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@heroui/button'

import BoardGrid from '@components/game/components/board'
import type { Cell } from '@/types/boardGrid'

import { NOT_FOUND_PUZZLE, NOT_FOUND_DEFAULT_PUZZLE } from './constants'

function NotFound(): JSX.Element {
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [foundWords, setFoundWords] = useState<Cell[]>(NOT_FOUND_DEFAULT_PUZZLE)

  const router = useRouter()

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => NOT_FOUND_PUZZLE[row][col])
        .join('')
        .toLowerCase()

      const reversedWord = selectedWord.split('').reverse().join('')

      if (selectedWord === 'regresar' || reversedWord === 'regresar') {
        setFoundWords((prev) => [...prev, cells])
        setShowConfetti(true)

        setTimeout(() => {
          setShowConfetti(false)
          router.push('/')
        }, 3000)
      }
    },
    [router]
  )

  return (
    <section className="relative h-auto grid grid-cols-2 max-lg:grid-cols-1 max-lg:text-center">
      <div className="flex flex-col items-start text-start justify-center text-gray-600 text-base max-lg:order-last max-lg:mt-9 max-lg:items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400 dark:to-purple-600 max-lg:absolute top-0 max-lg:left-1/2 max-lg:transform max-lg:-translate-x-1/2">
          ¡Palabra no encontrada!
        </h1>
        <p className="mb-10 max-w-2xl w-5/6 max-lg:text-center md:w-full">
          Parece que la página que buscas se ha perdido en nuestra sopa de
          letras. Encuentra la palabra &quot;regresar&quot; para volver a la
          página principal.
        </p>
        <Button
          as={Link}
          className="mb-6"
          color="primary"
          href="/explore"
          size="lg"
        >
          Juega ahora
          <ChevronRight />
        </Button>
        <div className="flex gap-2">
          <p className="flex gap-2 cursor-default text-sm">
            <CircleCheckBig className="text-default-500" />
            Multijugador
          </p>
          <p className="flex gap-2 cursor-default text-sm">
            <CircleCheckBig className="text-default-500" />
            Con amigos
          </p>
          <p className="flex gap-2 cursor-default text-sm">
            <CircleCheckBig className="text-default-500" />
            En línea
          </p>
        </div>
      </div>
      <BoardGrid
        checkWord={checkWord}
        foundCells={foundWords}
        grid={NOT_FOUND_PUZZLE}
        className="max-lg:mt-24 md:mt-36 mt-24"
      />
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
    </section>
  )
}

export default NotFound

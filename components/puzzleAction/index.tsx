'use client'

import { useCallback, useState, JSX } from 'react'
import { Button } from '@heroui/button'
import { ChevronRight, CircleCheckBig } from 'lucide-react'
import { Link } from '@heroui/link'
import { useRouter } from 'next/navigation'
import Confetti from 'react-confetti'

import BoardGrid from '@components/game/components/board'
import type { Cell } from '@/types/boardGrid'

export interface PuzzleWithActionProps {
  foundCells: Cell[]
  puzzle: string[][]
  word: string
  gradientText: string
  text: string
  description: string
  buttonLink?: string
  actionLink: string
}

function PuzzleWithAction(props: PuzzleWithActionProps): JSX.Element {
  const {
    foundCells = [],
    puzzle,
    word,
    description,
    gradientText,
    text,
    buttonLink,
    actionLink,
  } = props
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [foundWords, setFoundWords] = useState<Cell[]>(foundCells)

  const router = useRouter()

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => puzzle[row][col])
        .join('')
        .toLowerCase()

      const reversedWord = selectedWord.split('').reverse().join('')

      if (selectedWord === word || reversedWord === word) {
        setFoundWords((prev) => [...prev, cells])
        setShowConfetti(true)

        setTimeout(() => {
          setShowConfetti(false)
          router.push(actionLink)
        }, 3000)
      }
    },
    [router, word, puzzle, actionLink]
  )

  return (
    <section className="relative min-h-[80vh] h-auto grid grid-cols-2 max-lg:grid-cols-1 max-lg:text-center">
      <div className="flex flex-col items-start text-start justify-center text-base max-lg:order-first max-lg:mb-8 max-lg:items-center">
        <h1 className="w-full text-5xl md:text-7xl font-bold mb-4 leading-tight max-lg:text-center">
          <span className="bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600 bg-clip-text text-transparent dark:to-purple-600 dark:via-rose-600 ">
            {gradientText}
          </span>
          <br />
          <span>{text}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto max-lg:text-center">
          {description}
        </p>
        <Button
          as={Link}
          className="mb-6"
          color="primary"
          href={buttonLink}
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
      <div className="flex flex-col items-center justify-center max-lg:order-last max-lg:mt-6">
        <BoardGrid
          checkWord={checkWord}
          foundCells={foundWords}
          grid={puzzle}
        />
      </div>
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
    </section>
  )
}

export default PuzzleWithAction

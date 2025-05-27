'use client'

import type { Cell } from '@/types/boardGrid'

import { JSX, useCallback, useState } from 'react'
import Confetti from 'react-confetti'
import { useRouter } from 'next/navigation'
import { Link } from '@heroui/link'
import { Button } from '@heroui/button'
import { ChevronRight } from 'lucide-react'
import BoardGrid from '@components/game/components/board'

const puzzle = [
  ['V', 'R', 'B', 'C', 'C', 'J', 'M', 'K', 'Q', 'O', 'D'],
  ['Y', 'P', 'M', 'I', 'K', 'G', 'G', 'H', 'S', 'N', 'T'],
  ['S', 'H', 'K', '4', '0', '4', 'Z', 'G', 'A', 'E', 'Q'],
  ['Z', 'K', 'H', 'P', 'F', 'H', 'A', 'J', 'L', 'H', 'I'],
  ['T', 'P', 'D', 'O', 'V', 'T', 'V', 'K', 'P', 'Q', 'J'],
  ['J', 'A', 'H', 'L', 'K', 'Q', 'V', 'Y', 'V', 'X', 'P'],
  ['S', 'M', 'I', 'F', 'T', 'X', 'K', 'Z', 'E', 'T', 'A'],
  ['K', 'R', 'E', 'G', 'R', 'E', 'S', 'A', 'R', 'C', 'D'],
  ['D', 'K', 'Y', 'U', 'L', 'X', 'E', 'K', 'G', 'F', 'S'],
  ['H', 'G', 'A', 'Y', 'J', 'W', 'G', 'E', 'V', 'D', 'M'],
  ['M', 'I', 'C', 'H', 'A', 'E', 'R', 'O', 'N', 'T', 'Z'],
]

function NotFound(): JSX.Element {
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [foundWords, setFoundWords] = useState<Cell[]>([
    [
      [2, 3],
      [2, 4],
      [2, 5],
    ],
  ])

  const router = useRouter()

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => puzzle[row][col])
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
    <div className="relative text-center h-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-400 dark:to-purple-600">
        ¡Palabra no encontrada!
      </h1>
      <BoardGrid checkWord={checkWord} foundCells={foundWords} grid={puzzle} />
      {showConfetti && <Confetti numberOfPieces={100} recycle={false} />}
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto mt-12">
        Parece que la página que buscas se ha perdido en nuestra sopa de letras.
        Encuentra la palabra &quot;regresar&quot; para volver a la página
        principal.
      </p>
      <Button as={Link} className="mb-4" color="primary" href="/" size="lg">
        Regresar al inicio
        <ChevronRight />
      </Button>
    </div>
  )
}

export default NotFound

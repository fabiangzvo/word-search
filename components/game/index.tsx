'use client'

import type { Cell } from '@/types/boardGrid'

import { JSX, useState, useMemo, useCallback } from 'react'
import Confetti from 'react-confetti'

import Preview from './components/preview'
import BoardGrid from './components/board'
import { GameProps } from './types'

export default function Game(props: GameProps): JSX.Element {
  const { puzzle, users } = props

  const [foundWords, setFoundWords] = useState<string[]>([])
  const [foundCells, setFoundCells] = useState<Cell>([])
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  const { answers, grid } = useMemo(() => {
    const { matrix, questions } = puzzle
    const answers = questions.map((question) => question.answer)

    return { answers, grid: matrix }
  }, [puzzle])

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => grid[row][col])
        .join('')
        .toLowerCase()
      const reversedWord = selectedWord.split('').reverse().join('')

      for (const word of answers) {
        if (selectedWord === word || reversedWord === word) {
          if (!foundWords.includes(word)) {
            const newFoundWords = [...foundWords, word]

            setFoundWords(newFoundWords)
            setFoundCells([...foundCells, ...cells])
            setShowConfetti(true)
            setTimeout(() => {
              setShowConfetti(false)
            }, 3000)
          }
          break
        }
      }
    },
    [puzzle, foundCells, answers, grid, foundWords]
  )

  return (
    <div>
      <BoardGrid checkWord={checkWord} foundCells={foundCells} grid={grid} />
      <Preview puzzle={puzzle} users={users} />
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
    </div>
  )
}

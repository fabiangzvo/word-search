'use client'

import { JSX, useState, useMemo, useCallback, useReducer, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify'

import WordList from '@components/wordList'
import type { Cell } from '@/types/boardGrid'
import { useSocket } from "@hooks/useSocket";
import { IUserDetail } from '@/types/user';

import BoardGrid from './components/board'
import ActivePlayers from "./components/activePlayers";
import { GameProps, Actions } from './types'
import { puzzleReducer } from "./utils";

export default function Game(props: GameProps): JSX.Element {
  const { puzzle, finishedAt, responses, startedAt, users, winner, gameId } = props

  const [state, dispatch] = useReducer(puzzleReducer, { finishedAt, responses, startedAt, users, winner })
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [foundCells, setFoundCells] = useState<Cell>([])
  const [showConfetti, setShowConfetti] = useState<boolean>(false)

  const { data } = useSession()
  const socket = useSocket()

  const { answers, grid } = useMemo(() => {
    const { matrix, questions } = puzzle
    const answers = questions.map((question) => question.answer)

    return { answers, grid: matrix }
  }, [puzzle])

  useEffect(() => {
    if (socket && data?.user) {
      socket.emit('add-player', JSON.stringify({ gameId, user: data.user.id }))

      socket.on('user-joined', (user: IUserDetail) => {
        dispatch({ type: Actions.ADD_USER, payload: { user } })

        user._id !== data?.user.id && toast.success(`${user.name} se ha unido a la partida`)
      })

      socket.on('user-left', (user: IUserDetail) => {
        dispatch({ type: Actions.DELETE_USER, payload: { userId: user._id } })

        toast.warn(`${user.name} ha salido de la partida`)
      })

      const listener = () => {
        socket.emit('disconnect-player', JSON.stringify({ gameId, user: data.user.id }))
        socket.off('user-joined')
        socket.off('user-left')
      }

      window.addEventListener('beforeunload', listener)

      return () => {
        window.removeEventListener('beforeunload', listener)
      }
    }
  }, [socket, gameId, data])

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
    <div className="flex gap-6 max-md:flex-col max-md:overflow-x-auto">
      <BoardGrid checkWord={checkWord} foundCells={foundCells} grid={grid} />
      <div className='flex flex-col gap-6 my-4 mx-2'>
        <WordList foundWords={foundWords} questions={puzzle.questions} />
        <ActivePlayers users={state.users} />
      </div>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
    </div>
  )
}

'use client'

import type { Cell } from '@/types/boardGrid'

import { JSX, useState, useCallback, useReducer, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import WordList from '@components/wordList'
import { useSocket } from '@hooks/useSocket'

import BoardGrid from './components/board'
import ActivePlayers from './components/activePlayers'
import { GameProps, Actions } from './types'
import { puzzleReducer } from './utils'

import { IUserDetail } from '@/types/user'

export default function Game(props: GameProps): JSX.Element {
  const { puzzle, finishedAt, responses, startedAt, users, winner, gameId } =
    props

  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [state, dispatch] = useReducer(puzzleReducer, {
    finishedAt,
    responses,
    startedAt,
    users,
    winner,
    foundCells: responses?.map((response) => response.coords) || [],
    foundWords:
      responses?.map(
        (response) =>
          puzzle.questions.find(
            (questionItem) => questionItem._id === response.question
          )?.answer ?? ''
      ) || [],
  })

  const { data } = useSession()
  const socket = useSocket()

  useEffect(() => {
    if (socket && data?.user) {
      socket.emit('add-player', JSON.stringify({ gameId, user: data.user.id }))

      socket.on('user-joined', (user: IUserDetail) => {
        dispatch({ type: Actions.ADD_USER, payload: { user } })

        user._id !== data?.user?.id &&
          toast.success(`${user.name} se ha unido a la partida`)
      })

      socket.on('user-left', (user: IUserDetail) => {
        dispatch({ type: Actions.DELETE_USER, payload: { userId: user._id } })

        toast.warn(`${user.name} ha salido de la partida`)
      })

      socket.on(
        'found-word',
        (info: { coords: Cell; question: string; user: string }) => {
          const question = puzzle.questions.find(
            (questionItem) => questionItem._id === info.question
          )

          dispatch({ type: Actions.ADD_WORD, payload: question?.answer ?? '' })
          dispatch({ type: Actions.ADD_CELL, payload: info.coords })

          const userDetail = state.users.find(
            (userItem) => userItem._id === info.user
          )

          info.user !== data?.user?.id &&
            toast.success(
              `${userDetail?.name} ha encontrado la palabra ${question?.answer ?? ''}`
            )
        }
      )

      const listener = () => {
        socket.emit(
          'disconnect-player',
          JSON.stringify({ gameId, user: data.user.id })
        )
        socket.off('user-joined')
        socket.off('user-left')
        socket.off('found-word')
      }

      window.addEventListener('beforeunload', listener)

      return () => {
        window.removeEventListener('beforeunload', listener)
      }
    }
  }, [socket, gameId, data?.user?.id])

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => puzzle.matrix[row][col])
        .join('')
        .toLowerCase()

      const reversedWord = selectedWord.split('').reverse().join('')

      for (const question of puzzle.questions) {
        const { answer, _id: questionId } = question

        if (selectedWord === answer || reversedWord === answer) {
          if (!state.foundWords.includes(answer)) {
            dispatch({ type: Actions.ADD_WORD, payload: answer })
            dispatch({ type: Actions.ADD_CELL, payload: cells })

            socket.emit(
              'found-word',
              JSON.stringify({
                gameId,
                question: questionId,
                coords: cells,
                user: data?.user?.id ?? '',
              })
            )

            setShowConfetti(true)
            setTimeout(() => {
              setShowConfetti(false)
            }, 3000)
          }
          break
        }
      }
    },
    [
      puzzle,
      state.foundCells,
      puzzle.questions,
      puzzle.matrix,
      state.foundWords,
      data?.user,
    ]
  )

  return (
    <div className="flex gap-6 max-xl:flex-col max-xl:items-center justify-center w-full lg:w-fit">
      <div className="max-md:overflow-x-auto w-full flex justify-center">
        <BoardGrid
          checkWord={checkWord}
          foundCells={state.foundCells}
          grid={puzzle.matrix}
        />
      </div>
      <div className="flex xl:flex-col gap-6 w-full max-xl:justify-center max-md:px-0 max-md:flex-col">
        <WordList foundWords={state.foundWords} questions={puzzle.questions} />
        <ActivePlayers users={state.users} />
      </div>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
    </div>
  )
}

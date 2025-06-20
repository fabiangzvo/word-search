'use client'

import type { Cell } from '@/types/boardGrid'

import { JSX, useState, useCallback, useReducer, useEffect } from 'react'
import Confetti from 'react-confetti'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import WordList from '@components/wordList'
import { useSocket } from '@hooks/useSocket'

import WaitingRoom from './components/waitingRoom'
import BoardGrid from './components/board'
import ActivePlayers from './components/activePlayers'
import { GameProps, Actions } from './types'
import { puzzleReducer } from './utils'

import { IUserActive } from '@/types/user'

export default function Game(props: GameProps): JSX.Element {
  const {
    puzzle,
    finishedAt,
    responses,
    startedAt,
    users,
    winner,
    gameId,
    owner,
  } = props

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
  const { socket } = useSocket()
  const router = useRouter()

  useEffect(() => {
    if (socket && data?.user && gameId) {
      socket.emit('add-player', JSON.stringify({ gameId, user: data.user.id }))

      socket.on('user-joined', (userInfo: IUserActive) => {
        dispatch({ type: Actions.ADD_USER, payload: userInfo })

        userInfo.user._id !== data?.user?.id &&
          toast.success(`${userInfo.user.name} se ha unido a la partida`)
      })

      socket.on('user-left', ({ user }: IUserActive) => {
        dispatch({
          type: Actions.DELETE_USER,
          payload: { userId: user?._id },
        })

        toast.warn(`${user?.name} ha salido de la partida`)
      })

      socket.on(
        'found-word',
        (info: { coords: Cell; question: string; user: string }) => {
          const question = puzzle.questions.find(
            (questionItem) => questionItem?._id === info.question
          )

          dispatch({ type: Actions.ADD_WORD, payload: question?.answer ?? '' })
          dispatch({ type: Actions.ADD_CELL, payload: info.coords })

          const userDetail = state.users.find(
            (userItem) => userItem.user?._id === info.user
          )

          info.user !== data?.user?.id &&
            toast.success(
              `${userDetail?.user.name} ha encontrado la palabra ${question?.answer ?? ''}`
            )
        }
      )

      socket.on('start-game', (date: Date) =>
        dispatch({ type: Actions.SET_STARTED_AT, payload: date })
      )

      socket.on('game-over', () => router.push(`/game/${gameId}/results`))

      const listener = () => {
        socket.emit(
          'disconnect-player',
          JSON.stringify({ gameId, user: data.user.id })
        )
        socket.off('user-joined')
        socket.off('user-left')
        socket.off('found-word')
        socket.off('add-player')
        socket.off('game-over')
      }

      window.addEventListener('beforeunload', listener)

      return () => {
        window.removeEventListener('beforeunload', listener)
      }
    }
  }, [socket, gameId, data?.user?.id, router])

  const checkWord = useCallback(
    (cells: Cell): void => {
      const selectedWord = cells
        .map(([row, col]) => puzzle.matrix[row][col])
        .join('')
        .toLowerCase()

      const reversedWord = selectedWord.split('').reverse().join('')

      for (const question of puzzle.questions) {
        const { answer, _id: questionId } = question
        const answerLower = answer.toLowerCase()

        if (selectedWord === answerLower || reversedWord === answerLower) {
          if (!state.foundWords.includes(answer)) {
            dispatch({ type: Actions.ADD_WORD, payload: answer })
            dispatch({ type: Actions.ADD_CELL, payload: cells })

            socket?.emit(
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
      <BoardGrid
        checkWord={checkWord}
        foundCells={state.foundCells}
        grid={puzzle.matrix}
      />
      <div className="flex xl:flex-col gap-6 w-full max-xl:justify-center max-md:px-0 max-md:flex-col">
        <WordList foundWords={state.foundWords} questions={puzzle.questions} />
        <ActivePlayers users={state.users} />
      </div>
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <WaitingRoom
        isOpen={!state.startedAt}
        showStartButton={data?.user?.id === owner}
        users={state.users}
        onStartGame={() =>
          socket?.emit('start-game', JSON.stringify({ gameId }))
        }
      />
    </div>
  )
}

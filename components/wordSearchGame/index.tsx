'use client'

import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

import WordSearchGrid from '../boardGrid'
import WordList from '../wordList'
import GameModeSelector from '../gameModeSelector'
import { UsernameModal } from '../usernameModal'
import { CompletionModal } from '../completionModal'
import { PlayerJoinNotification } from '../playerJoinNotification'

interface Question {
  label: string
  answer: string
}

interface WordSearchGameProps {
  grid: string[][]
  questions: Question[]
  gameId: string
}

interface PlayerScore {
  username: string
  score: number
}

interface ActivePlayer {
  username: string
  lastActive: number
}

type Cell = Array<[number, number]>

const ActivePlayersList: React.FC<{ players: ActivePlayer[] }> = ({
  players,
}) => (
  <div className="mb-4 bg-white dark:bg-fuchsia-950 rounded-xl p-4 shadow-md">
    <h2 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-fuchsia-100">
      Active Players:
    </h2>
    <ul className="flex flex-wrap gap-2">
      {players.map((player) => (
        <li
          key={player.username}
          className="bg-emerald-200 dark:bg-fuchsia-800 px-3 py-1 rounded-full text-sm text-emerald-800 dark:text-fuchsia-100"
        >
          {player.username}
        </li>
      ))}
    </ul>
  </div>
)

export const WordSearchGame: React.FC<WordSearchGameProps> = ({
  grid,
  questions,
  gameId,
}) => {
  const [selectedCells, setSelectedCells] = useState<Cell>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [foundCells, setFoundCells] = useState<Cell>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [gameMode, setGameMode] = useState<'words' | 'questions'>('words')
  const [showConfetti, setShowConfetti] = useState(false)
  const [_startTime, setStartTime] = useState<number | null>(null)
  const [completionTime, setCompletionTime] = useState<number | null>(null)
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false)
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(true)
  const [username, setUsername] = useState('')
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([])
  const [winner, setWinner] = useState('')
  const [activePlayers, setActivePlayers] = useState<ActivePlayer[]>([])
  const [newPlayerNotification, setNewPlayerNotification] = useState<
    string | null
  >(null)
  const [wordFoundNotification, setWordFoundNotification] = useState<
    string | null
  >(null)
  const words = questions.map((q) => q.answer)

  useEffect(() => {
    if (username) {
      const eventSource = new EventSource(`/api/game-updates?gameId=${gameId}`)

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === 'wordFound') {
          setPlayerScores(data.playerScores)
          setFoundWords(data.foundWords)
          setFoundCells(data.foundCells)
          if (data.foundBy !== username) {
            setWordFoundNotification(`${data.foundBy} found a word!`)
            setTimeout(() => {
              setWordFoundNotification(null)
            }, 3000)
          }
        } else if (data.type === 'gameCompleted') {
          setCompletionTime(data.completionTime)
          setWinner(data.winner)
          setPlayerScores(data.playerScores)
          setIsCompletionModalOpen(true)
        } else if (data.type === 'playerJoin') {
          setActivePlayers((prevPlayers) => {
            if (!prevPlayers.some((p) => p.username === data.player.username)) {
              setNewPlayerNotification(data.player.username)
              setTimeout(() => {
                setNewPlayerNotification(null)
              }, 3000)

              return [...prevPlayers, data.player]
            }

            return prevPlayers
          })
        } else if (data.type === 'playerLeave') {
          setActivePlayers((prevPlayers) =>
            prevPlayers.filter((p) => p.username !== data.username)
          )
          setPlayerScores((prevScores) =>
            prevScores.filter((p) => p.username !== data.username)
          )
        } else if (data.type === 'initialState') {
          setPlayerScores(data.playerScores)
          setFoundWords(data.foundWords)
          setFoundCells(data.foundCells)
          setActivePlayers(data.activePlayers)
        }
      }

      // Send a heartbeat every 30 seconds to keep the player active
      const heartbeatInterval = setInterval(() => {
        fetch('/api/player-heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gameId, username }),
        })
      }, 30000)

      // Handle page unload
      const handleUnload = () => {
        fetch('/api/game-updates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'playerLeave', gameId, username }),
          keepalive: true,
        })
      }

      window.addEventListener('beforeunload', handleUnload)

      return () => {
        eventSource.close()
        clearInterval(heartbeatInterval)
        window.removeEventListener('beforeunload', handleUnload)
        handleUnload()
      }
    }
  }, [username, gameId])

  // useEffect(() => {
  //   if (foundWords.length === 0 && startTime === null) {
  //     setStartTime(Date.now());
  //   }
  //   if (foundWords.length === words.length && startTime !== null) {
  //     const endTime = Date.now();
  //     const completionTime = endTime - startTime;
  //     setCompletionTime(completionTime);
  //     fetch("/api/game-updates", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: "gameCompleted",
  //         gameId,
  //         completionTime,
  //         playerScores,
  //       }),
  //     });
  //   }
  // }, [foundWords, words, startTime, gameId, playerScores]);

  const handleCellSelect = (row: number, col: number): void => {
    if (!isSelecting) {
      setSelectedCells([[row, col]])
      setIsSelecting(true)
    } else {
      const newSelectedCells: Cell = [...selectedCells, [row, col]]

      setSelectedCells(newSelectedCells)
      checkWord(newSelectedCells)
    }
  }

  const handleSelectionEnd = (): void => {
    setIsSelecting(false)
    if (selectedCells.length > 1) {
      checkWord(selectedCells)
    }
    setSelectedCells([])
  }

  const checkWord = (cells: Array<[number, number]>): void => {
    const selectedWord = cells.map(([row, col]) => grid[row][col]).join('')
    const reversedWord = selectedWord.split('').reverse().join('')

    for (const word of words) {
      if (selectedWord === word || reversedWord === word) {
        if (!foundWords.includes(word)) {
          const newFoundWords = [...foundWords, word]

          setFoundWords(newFoundWords)
          setFoundCells([...foundCells, ...cells])
          setShowConfetti(true)
          setTimeout(() => {
            setShowConfetti(false)
          }, 3000)

          const newPlayerScores = playerScores.map((player) =>
            player.username === username
              ? { ...player, score: player.score + 1 }
              : player
          )

          setPlayerScores(newPlayerScores)

          fetch('/api/game-updates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'wordFound',
              gameId,
              username,
              word,
              playerScores: newPlayerScores,
              foundWords: newFoundWords,
              foundCells: [...foundCells, ...cells],
            }),
          })
        }
        break
      }
    }
  }

  const handleSelectAllWords = (): void => {
    setFoundWords(words)
    setFoundCells(
      grid.flatMap((row, rowIndex) =>
        row.map((_, colIndex) => [rowIndex, colIndex] as [number, number])
      )
    )
  }

  const handleTouchStart = (): void => {
    setIsTouching(true)
  }

  const handleTouchEnd = (): void => {
    setIsTouching(false)
  }

  const handleModeChange = (mode: 'words' | 'questions'): void => {
    setGameMode(mode)
  }

  const handleRestart = (): void => {
    setFoundWords([])
    setFoundCells([])
    setStartTime(Date.now())
    setCompletionTime(null)
    setIsCompletionModalOpen(false)
    setPlayerScores(playerScores.map((player) => ({ ...player, score: 0 })))
  }

  const handleUsernameSubmit = (newUsername: string): void => {
    setUsername(newUsername)
    setIsUsernameModalOpen(false)
    setPlayerScores([...playerScores, { username: newUsername, score: 0 }])
    fetch('/api/player-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, username: newUsername }),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen bg-emerald-50 dark:bg-black transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-fuchsia-100">
          Word Search Puzzle
        </h1>
      </div>
      <ActivePlayersList players={activePlayers} />
      <GameModeSelector mode={gameMode} onModeChange={handleModeChange} />
      <button
        className="mb-6 px-6 py-3 bg-emerald-500 dark:bg-fuchsia-600 hover:bg-emerald-600 dark:hover:bg-fuchsia-700 text-white rounded-lg shadow-md transition-colors duration-200 text-lg font-semibold"
        onClick={handleSelectAllWords}
      >
        {gameMode === 'words' ? 'Reveal All Words' : 'Reveal All Answers'}
      </button>
      <WordSearchGrid
        foundCells={foundCells}
        grid={grid}
        isSelecting={isSelecting ?? isTouching}
        selectedCells={selectedCells}
        onCellSelect={handleCellSelect}
        onSelectionEnd={handleSelectionEnd}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      />
      <WordList foundWords={foundWords} questions={questions} />
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <CompletionModal
        completionTime={completionTime ?? 0}
        isOpen={isCompletionModalOpen}
        playerScore={
          playerScores.find((player) => player.username === username)?.score ??
          0
        }
        winner={winner}
        winnerScore={playerScores.reduce(
          (max, player) => Math.max(max, player.score),
          0
        )}
        onClose={() => {
          setIsCompletionModalOpen(false)
        }}
        onRestart={handleRestart}
      />
      <UsernameModal
        isOpen={isUsernameModalOpen}
        onClose={handleUsernameSubmit}
      />
      {newPlayerNotification && (
        <PlayerJoinNotification playerName={newPlayerNotification} />
      )}
      {wordFoundNotification && (
        <div className="fixed bottom-4 right-4 bg-emerald-500 dark:bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          {wordFoundNotification}
        </div>
      )}
    </div>
  )
}

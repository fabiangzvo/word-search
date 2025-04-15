import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react'

interface CompletionModalProps {
  isOpen: boolean
  onClose: () => void
  onRestart: () => void
  completionTime: number
  winner: string
  playerScore: number
  winnerScore: number
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  completionTime,
  winner,
  playerScore,
  winnerScore,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = ((time % 60000) / 1000).toFixed(2)

    return `${minutes}:${seconds.padStart(5, '0')}`
  }

  return (
    <Modal backdrop="blur" isOpen={isOpen} placement="center" onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Puzzle Completed!
        </ModalHeader>
        <ModalBody>
          <p>The Word Search Puzzle has been solved!</p>
          <p>Total completion time: {formatTime(completionTime)}</p>
          <p>
            Winner: {winner} (Found {winnerScore} words)
          </p>
          <p>Your score: {playerScore} words</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onRestart}>
            Play Again
          </Button>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

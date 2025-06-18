import { DifficultEnum } from '@/types/puzzle'
import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface ConfirmationTabProps {
  title: string
  description: string
  questions: FormCreatePuzzleType['questions']
  difficult: keyof typeof DifficultEnum
  numberOfQuestions: number
  numberOfRows: number
  handleBack: () => void
  categories: FormCreatePuzzleType['categories']
  matrix: FormCreatePuzzleType['matrix']
  regenerateBoard: () => void
  isUpdate: boolean
}

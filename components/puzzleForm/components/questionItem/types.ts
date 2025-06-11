import type { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'

import { type FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface QuestionItemProps {
  index: number
  handleRemove: UseFieldArrayRemove
  register: UseFormRegister<FormCreatePuzzleType>
  questionError?: string
  answerError?: string
  question: string
  answer: string
}

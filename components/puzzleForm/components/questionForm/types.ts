import type { UseFormRegister } from 'react-hook-form'

import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface QuestionFormProps {
  register: UseFormRegister<FormCreatePuzzleType>
  questionError?: string
  answerError?: string
  fieldIndex: number
  handleSave: () => void
}

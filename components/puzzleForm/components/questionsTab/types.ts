import {
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from 'react-hook-form'
import { QuestionItemProps } from '../questionItem/types'

import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface QuestionsTabProps
  extends Omit<
    QuestionItemProps,
    'answer' | 'question' | 'index' | 'answerError' | 'questionError'
  > {
  questions: FormCreatePuzzleType['questions']
  errors: FieldErrors<FormCreatePuzzleType>
  handleAdd: UseFieldArrayAppend<FormCreatePuzzleType['questions']>
  handleRemove: UseFieldArrayRemove
  handleNext: () => void
  handleBack: () => void
}

import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface BasicInfoTabProps {
  errors: FieldErrors<FormCreatePuzzleType>
  register: UseFormRegister<FormCreatePuzzleType>
  onCreateQuestions: () => Promise<void>
}

import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface PuzzleFormProps {
  defaultValues?: Partial<FormCreatePuzzleType>
  puzzleId?: string
}

import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface CategorySectionProps {
  categories: FormCreatePuzzleType['categories']
  updateCategory?: (categories: string[]) => void
}

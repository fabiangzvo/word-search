import { FormCreatePuzzleType } from '@lib/schemas/puzzle'

export interface CategoryListProps {
  categories: FormCreatePuzzleType['categories']
  updateCategory?: (categories: string[]) => void
}

import { type JSX } from 'react'
import { Chip } from '@heroui/chip'

import { CategoryListProps } from './types'

export function CategoryList(props: CategoryListProps): JSX.Element {
  const { categories, updateCategory } = props

  return (
    <span className="flex gap-2 flex-wrap justify-center">
      {categories.map((category, index) => (
        <Chip
          key={index}
          color="primary"
          variant="flat"
          onClose={
            updateCategory
              ? () => updateCategory(categories.filter((_, i) => i !== index))
              : undefined
          }
        >
          {category}
        </Chip>
      ))}
    </span>
  )
}

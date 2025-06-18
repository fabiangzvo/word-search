'use client'

import { type JSX, useMemo } from 'react'
import { Chip } from '@heroui/chip'
import { twMerge } from 'tailwind-merge'

import { CategoryListProps } from './types'

export function CategoryList(props: CategoryListProps): JSX.Element {
  const { categories, updateCategory, className } = props

  const categoryItems = useMemo(() => {
    if (categories.length > 0)
      return categories.map((category, index) => (
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
      ))

    return (
      <span className="text-foreground-500 font-semibold text-center w-full">
        No hay categorías
      </span>
    )
  }, [categories])

  return (
    <span className={twMerge('flex gap-2 flex-wrap justify-center', className)}>
      {categoryItems}
    </span>
  )
}

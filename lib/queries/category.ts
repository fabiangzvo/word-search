'use server'

import Category from '@models/category'

import { type ICategory, type GetCategories } from '@/types/category'
import { Types } from 'mongoose'

export async function getCategories({
  filters,
  projection,
}: GetCategories): Promise<ICategory[]> {
  const response = await Category.find<ICategory>(
    filters ?? {},
    projection
  ).exec()

  return response
}

export async function checkNotCreatedCategories(
  categoriesStr: string[]
): Promise<{ notCreated: string[]; matches: ICategory[] }> {
  const categoryMatches = await getCategories({
    filters: {
      name: { $in: categoriesStr },
    },
  })

  const notCreated = categoriesStr.filter(
    (category) =>
      !categoryMatches.some((categoryFound) => categoryFound.name === category)
  )

  return { notCreated, matches: categoryMatches }
}

export async function createCategories(
  categories: ICategory[]
): Promise<ICategory[]> {
  const response = await Category.insertMany(categories)

  return response
}

export async function upsertCategories(
  categoriesStr: string[]
): Promise<Types.ObjectId[]> {
  const { matches, notCreated } = await checkNotCreatedCategories(categoriesStr)

  if (notCreated.length > 0) {
    const createdCategory = await createCategories(
      notCreated.map((name: string) => ({ name }) as ICategory)
    )

    matches.push(...createdCategory)
  }

  const categories: Types.ObjectId[] = matches.map(
    (category) => category._id as Types.ObjectId
  )

  return categories
}

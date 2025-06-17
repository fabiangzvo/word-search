'use server'

import { Types } from 'mongoose'
import { revalidatePath } from 'next/cache'

import { checkNotCreatedCategories, createCategories } from '@queries/category'
import { type FormCreatePuzzleType } from '@schemas/puzzle'
import { insertPuzzle, updatePuzzle } from '@queries/puzzle'
import { type ICategory } from '@/types/category'
import { Question, type InsertPuzzle, type IPuzzleClient } from '@/types/puzzle'

export async function createPuzzle(
  formData: FormCreatePuzzleType,
  userId: string
): Promise<IPuzzleClient | null> {
  try {
    const { matches, notCreated } = await checkNotCreatedCategories(
      formData.categories
    )

    if (notCreated.length > 0) {
      const createdCategory = await createCategories(
        notCreated.map((name: string) => ({ name }) as ICategory)
      )

      matches.push(...createdCategory)
    }

    const categories: Types.ObjectId[] = matches.map(
      (category) => category._id as Types.ObjectId
    )
    const record: InsertPuzzle = {
      title: formData.title,
      difficult: formData.difficult,
      cols: formData.numberOfRows,
      questions: formData.questions as Question[],
      matrix: formData.matrix,
      isPublic: true,
      owner: new Types.ObjectId(userId),
      categories,
      description: formData.description,
    }

    const insertResult = await insertPuzzle(record)

    revalidatePath('/dashboard')

    return insertResult.toJSON({ flattenObjectIds: true }) as IPuzzleClient
  } catch (e) {
    console.error(e)

    return null
  }
}

export async function updateVisibility(
  gameId: string,
  isPublic: boolean
): Promise<boolean> {
  const puzzle = await updatePuzzle(gameId, { isPublic })

  return puzzle.isPublic === isPublic
}

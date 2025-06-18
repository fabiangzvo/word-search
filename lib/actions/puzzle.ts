'use server'

import { Types } from 'mongoose'
import { revalidatePath } from 'next/cache'

import { upsertCategories } from '@queries/category'
import { type FormCreatePuzzleType } from '@schemas/puzzle'
import { insertPuzzle, updatePuzzle } from '@queries/puzzle'
import { Question, type InsertPuzzle, type IPuzzleClient } from '@/types/puzzle'
import mongooseConnect from '@lib/db'

mongooseConnect()

export async function createPuzzle(
  formData: FormCreatePuzzleType,
  userId: string
): Promise<IPuzzleClient | null> {
  try {
    const categories = await upsertCategories(formData.categories)

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
      prompt: formData.prompt,
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

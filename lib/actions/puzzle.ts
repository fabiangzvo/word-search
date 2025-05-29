'use server'

import { Types } from 'mongoose'
import { revalidatePath } from 'next/cache'

import { checkNotCreatedCategories, createCategories } from '@queries/category'
import { type FormCreatePuzzle } from '@schemas/puzzle'
import { generateWordSearch } from '@utils/wordSearchGenerator'
import { insertPuzzle, updatePuzzle } from '@queries/puzzle'
import { type ICategory } from '@/types/category'
import { type InsertPuzzle, type IPuzzleClient } from '@/types/puzzle'

import { GenerateQuestions } from '../gemini'

export async function createPuzzle(
  formData: FormCreatePuzzle,
  userId: string
): Promise<IPuzzleClient | null> {
  try {
    const categoriesSplit = formData.topic.split(/,|,\s/g)

    const { matches, notCreated } =
      await checkNotCreatedCategories(categoriesSplit)

    if (notCreated.length > 0) {
      const createdCategory = await createCategories(
        notCreated.map((name: string) => ({ name }) as ICategory)
      )

      matches.push(...createdCategory)
    }

    const { questions } = await GenerateQuestions(
      formData.numberOfQuestions,
      formData.topic
    )

    const { grid } = generateWordSearch(
      questions.map((item: any) => item.answer.toUpperCase()),
      formData.numberOfRows
    )

    const categories: Types.ObjectId[] = matches.map(
      (category) => category._id as Types.ObjectId
    )
    const record: InsertPuzzle = {
      title: formData.title,
      difficult: formData.difficult,
      cols: formData.numberOfRows,
      questions,
      matrix: grid,
      isPublic: true,
      owner: new Types.ObjectId(userId),
      categories,
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

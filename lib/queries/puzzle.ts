'use server'

import Puzzle from '@lib/models/puzzle'

import {
  type GetPuzzle,
  type InsertPuzzle,
  type IPuzzle,
  type IPuzzleDetail,
} from '@/types/puzzle'

export async function getPuzzles<T>({
  filters,
  projection,
}: GetPuzzle): Promise<T> {
  const response = await Puzzle.find(filters ?? {}, projection)
    .populate('categories')
    .sort('createdAt')
    .exec()

  const formattedResponse = response.map((puzzle) =>
    puzzle.toJSON({ flattenObjectIds: true })
  )

  return formattedResponse as T
}

export async function insertPuzzle(puzzle: InsertPuzzle): Promise<IPuzzle> {
  const response = await new Puzzle(puzzle).save()

  return response
}

export async function removePuzzle(puzzleId: string): Promise<boolean> {
  const response = await Puzzle.findByIdAndDelete(puzzleId)

  return !!response
}

export async function getDetailPuzzle(
  puzzleId: string
): Promise<IPuzzleDetail | null> {
  const response = await Puzzle.findById<IPuzzleDetail>(puzzleId)
    .populate('categories')
    .populate('owner')
    .exec()

  return response
}

'use server'

import type {
  IPuzzleClient,
  GetPuzzle,
  InsertPuzzle,
  IPuzzle,
  IPuzzleDetail,
} from '@/types/puzzle'

import { UpdateQuery } from 'mongoose'
import Puzzle from '@lib/models/puzzle'

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

export async function updatePuzzle(
  puzzleId: string,
  game: UpdateQuery<IPuzzle>
): Promise<IPuzzleClient> {
  const response = await Puzzle.findByIdAndUpdate(puzzleId, game, {
    new: true,
  })

  return response?.toJSON({
    flattenObjectIds: true,
  }) as unknown as IPuzzleClient
}

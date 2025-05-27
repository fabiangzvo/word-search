'use server'

import { UpdateQuery, Types } from 'mongoose'

import type {
  IPuzzleClient,
  GetPuzzle,
  InsertPuzzle,
  IPuzzle,
  IPuzzleDetail,
  PaginatePuzzle,
  PaginatePuzzleResponse,
  IPuzzleStats,
} from '@/types/puzzle'
import Puzzle from '@lib/models/puzzle'
import { paginate } from '@utils/paginate'

export async function getPuzzles<T>({
  filters,
  projection,
  options,
}: GetPuzzle): Promise<T> {
  const response = await Puzzle.find(filters ?? {}, projection, options)
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

export async function getPaginatePuzzle<T>({
  owner,
  title,
  projection,
  page,
  pageSize,
}: PaginatePuzzle): Promise<PaginatePuzzleResponse<T>> {
  const response = await paginate<IPuzzle>({
    model: Puzzle,
    filters: {
      owner: new Types.ObjectId(owner),
      title: { $regex: title, $options: 'i' },
    },
    projection: projection ?? {},
    page,
    pageSize,
  })

  return {
    data: response.data as T[],
    total: response.total,
    pages: Math.ceil(response.total / pageSize),
  }
}

export async function getPuzzleStats(userId: string): Promise<IPuzzleStats> {
  const response = await Puzzle.aggregate([
    { $match: { owner: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalPuzzles: { $sum: 1 },
        publicPuzzles: {
          $sum: { $cond: [{ $eq: ['$isPublic', true] }, 1, 0] },
        },
      },
    },
    { $project: { _id: 0, totalPuzzles: 1, publicPuzzles: 1 } },
    {
      $unionWith: {
        coll: 'games',
        pipeline: [
          { $match: { 'users.user': new Types.ObjectId(userId) } },
          {
            $group: {
              _id: null,
              gamesPlayed: { $sum: 1 },
              gamesWon: {
                $sum: {
                  $cond: [
                    { $eq: ['$winner', new Types.ObjectId(userId)] },
                    1,
                    0,
                  ],
                },
              },
            },
          },
          { $project: { _id: 0, gamesPlayed: 1, gamesWon: 1 } },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalPuzzles: { $first: '$totalPuzzles' },
        publicPuzzles: { $first: '$publicPuzzles' },
        gamesPlayed: { $sum: '$gamesPlayed' },
        gamesWon: { $sum: '$gamesWon' },
      },
    },
    { $project: { _id: 0 } },
  ])

  return (
    response[0] ?? {
      totalPuzzles: 0,
      publicPuzzles: 0,
      gamesPlayed: 0,
      gamesWon: 0,
    }
  )
}

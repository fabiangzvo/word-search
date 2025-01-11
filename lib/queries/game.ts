'use server'

import Game from '@lib/models/game'

import {
  type InsertGame,
  type IGameClient,
  type IGameDetailClient,
} from '@/types/game'

export async function insertGame(game: InsertGame): Promise<IGameClient> {
  const response = await new Game(game).save()

  const insertedGame = response.toJSON({ flattenObjectIds: true }) as unknown

  return insertedGame as IGameClient
}

export async function getDetailGame(
  gameId: string
): Promise<IGameDetailClient | null> {
  const response = await Game.findById<IGameDetailClient>(gameId)
    .populate('puzzle')
    .populate('users')
    .populate('winner')
    .exec()

  return response
}

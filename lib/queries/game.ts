'use server'

import Game from '@lib/models/game'
import { UpdateQuery } from 'mongoose'

import {
  type InsertGame,
  type IGameClient,
  type IGameDetailClient,
  type IGame,
} from '@/types/game'

export async function insertGame(game: InsertGame): Promise<IGameClient> {
  const response = await new Game(game).save()

  const insertedGame = response.toJSON({ flattenObjectIds: true }) as unknown

  return insertedGame as IGameClient
}

export async function getDetailGame(
  gameId: string
): Promise<IGameDetailClient | null> {
  const response = await Game.findById(gameId)
    .populate('puzzle')
    .populate({ path: 'puzzle', populate: { path: 'owner' } })
    .populate('users.user', '-password')
    .populate('winner')
    .exec()

  if (!response) return null

  const record = response.toJSON({
    flattenObjectIds: true,
  }) as unknown

  return record as IGameDetailClient
}

export async function updateGame(
  gameId: string,
  game: UpdateQuery<IGame>
): Promise<IGameClient> {
  const response = await Game.findByIdAndUpdate(gameId, game, {
    new: true,
  })

  return response?.toJSON({ flattenObjectIds: true }) as unknown as IGameClient
}

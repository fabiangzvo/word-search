'use server'

import { Types } from 'mongoose'
import { updateGame } from '@queries/game'

export async function updateUsersByGame(
  gameId: string,
  user: string
): Promise<any> {
  const response = await updateGame(gameId, {
    $push: { users: new Types.ObjectId(user) },
  })

  return response
}

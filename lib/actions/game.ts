'use server'

import { Types } from 'mongoose'
import { redirect } from 'next/navigation'
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

export async function rebootGame(gameId: string): Promise<void> {
  const response = await updateGame(gameId, {
    users: [],
    responses: [],
    winner: null,
    finishedAt: null,
    startedAt: null,
  })

  if (!response) return

  redirect(`/puzzle/${gameId}`)
}

'use server'

import { ObjectId, ChangeStream } from 'mongodb'
import { Types } from 'mongoose'
import Game from '@models/game'
import { updateGame } from '@queries/game'

import { IGameDetailClient } from '@/types/game'

let streams: ChangeStream[] = []

type Callback = (game: IGameDetailClient) => void

export async function watchGameChanges(
  gameId: string,
  callback: Callback
): Promise<string> {
  const pipeline = [
    {
      $match: {
        'fullDocument._id': new ObjectId(gameId),
      },
    },
  ]

  const changeStream = Game.watch(pipeline)

  changeStream.on('change', async (change) => {
    if (
      change.operationType === 'update' ||
      change.operationType === 'replace'
    ) {
      const updatedDocument = await Game.findById(change.fullDocument._id)
        .populate('users')
        .populate('puzzle')
        .exec()

      const record = updatedDocument?.toJSON({
        flattenObjectIds: true,
      }) as unknown as IGameDetailClient

      callback(record)
    }
  })

  changeStream.on('error', (error) => {
    console.error('Error en el change stream:', error)
  })

  changeStream.on('close', () => {
    console.error('closing:')
  })

  changeStream.on('init', () => {
    console.error('init')
  })

  streams.push(changeStream)

  return JSON.stringify(pipeline)
}

export async function removeWatchers(pipelineStr: string): Promise<void> {
  streams = streams.filter((watcher) => {
    if (JSON.stringify(watcher.pipeline) === pipelineStr) {
      watcher.close()

      return false
    }

    return true
  })
}

export async function updateUsersByGame(
  gameId: string,
  user: string
): Promise<any> {
  const response = await updateGame(gameId, {
    $push: { users: new Types.ObjectId(user) },
  })

  return response
}

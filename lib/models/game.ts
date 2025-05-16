import mongoose, { Schema, type Model } from 'mongoose'

import { type IGame } from '@/types/game'

const gameSchema = new Schema<IGame>(
  {
    puzzle: { type: Schema.Types.ObjectId, ref: 'puzzles', required: true },
    users: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
          color: { type: String, required: true },
        },
      ],
      required: true,
    },
    startedAt: { type: Date, required: false },
    finishedAt: { type: Date, required: false },
    responses: {
      type: [
        {
          question: { type: Schema.Types.ObjectId, required: true },
          user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
          coords: { type: Array<[Number, Number]>, required: true },
        },
      ],
      required: true,
    },
    winner: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps: true,
  }
)

export default (mongoose.models?.games as Model<IGame>) ??
  mongoose.model<IGame>('games', gameSchema)

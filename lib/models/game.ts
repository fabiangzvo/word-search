import mongoose, { Schema, type Model } from 'mongoose'

import { type IGame } from '@/types/game'

const gameSchema = new Schema<IGame>(
  {
    puzzle: { type: Schema.Types.ObjectId, ref: 'puzzles', required: true },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    startedAt: { type: Date, required: false },
    finishedAt: { type: Date, required: false },
    responses: {
      type: [
        {
          label: String,
          answer: String,
        },
      ],
      required: true,
    },
    winner: { type: Schema.Types.ObjectId, ref: 'users', required: false },
  },
  {
    timestamps: true,
  }
)

export default (mongoose.models?.games as Model<IGame>) ??
  mongoose.model<IGame>('games', gameSchema)

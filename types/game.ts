import { Document, Types } from 'mongoose'

import { type IUserDetail } from './user'
import { type IPuzzleDetail } from './puzzle'
import { Cell } from './boardGrid'

interface Response {
  user: Types.ObjectId
  question: Types.ObjectId
}

export interface IGame extends Document {
  puzzle: Types.ObjectId
  users: Types.ObjectId[]
  startedAt: Date
  finishedAt: Date
  responses: Response[]
  winner: Types.ObjectId
}

export interface InsertGame {
  puzzle: string
  users: string[]
}

export interface IGameClient {
  _id: string
  puzzle: string
  users: string[]
  startedAt: Date
  finishedAt: Date
  responses: { user: string; question: string }[]
  winner: string
}

export interface IGameDetailClient {
  _id: string
  puzzle: IPuzzleDetail
  users: IUserDetail[]
  startedAt: Date
  finishedAt: Date
  responses: {
    user: string
    question: string
    coords: Cell
  }[]
  winner: IUserDetail
}

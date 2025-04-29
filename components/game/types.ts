import type { IGameDetailClient } from '@/types/game'
import { type IUserDetail } from '@/types/user'

export interface GameProps extends Omit<IGameDetailClient, '_id'> {
  gameId: string
}

export interface GameReducer extends Omit<IGameDetailClient, '_id' | 'puzzle'>{}

export enum Actions {
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER',
  ADD_WINNER = 'ADD_WINNER',
  SET_STARTED_AT = 'SET_STARTED_AT',
  SET_FINISHED_AT = 'SET_FINISHED_AT',
  ADD_RESPONSE = 'ADD_RESPONSE',
}

export type Action =
  | { type: Actions.ADD_USER; payload: { user: IUserDetail } }
  | { type: Actions.DELETE_USER; payload: { userId: string } }
  | { type: Actions.ADD_WINNER; payload: IUserDetail }
  | { type: Actions.SET_STARTED_AT; payload: Date }
  | { type: Actions.SET_FINISHED_AT; payload: Date }
  | { type: Actions.ADD_RESPONSE; payload: { user: string; question: string } };
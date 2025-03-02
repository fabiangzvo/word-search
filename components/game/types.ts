import type { IGameDetailClient } from '@/types/game'

export interface GameProps extends Omit<IGameDetailClient, '_id'> {
  gameId: string
}

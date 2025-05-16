import { IUserActive } from '@/types/user'

export interface WaitingRoomProps {
  users: IUserActive[]
  onStartGame: () => void
  isOpen: boolean
  showStartButton: boolean
}

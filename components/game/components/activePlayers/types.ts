import { CardProps } from '@heroui/card'

import { Player } from '@/types/game'

export interface ActivePlayersProps {
  users: Player[]
  shadow?: CardProps['shadow']
  showHeader?: boolean
  hideEmptyContent?: boolean
}

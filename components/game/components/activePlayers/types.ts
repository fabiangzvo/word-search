import { CardProps } from '@heroui/card'

import { type IUserActive } from '@/types/user'

export interface ActivePlayersProps {
  users: IUserActive[]
  shadow?: CardProps['shadow']
}

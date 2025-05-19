import { JSX, useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { updateUsersByGame } from '@actions/game'

import { IPuzzleDetail } from '@/types/puzzle'
import { IUserDetail } from '@/types/user'

interface PreviewProps {
  users: IUserDetail[]
  puzzle: IPuzzleDetail
  gameId: string
}

function Preview(props: PreviewProps): JSX.Element {
  const { users, gameId } = props

  const session = useSession()

  useEffect(() => {
    async function updateUserGame(): Promise<void> {
      if (session.status !== 'authenticated') return

      const existUser = users.some((user) => user._id === session.data.user.id)

      if (!existUser) await updateUsersByGame(gameId, session.data.user.id)
    }

    updateUserGame()
  }, [session, users, gameId])

  const currentUsers = useMemo(() => {
    return users.map((user) => {
      return <div key={user._id}>{user.name}</div>
    })
  }, [users])

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <ul>{currentUsers}</ul>
    </div>
  )
}

export default Preview

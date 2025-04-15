import { JSX, useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { IPuzzleDetail } from '@/types/puzzle'
import { IUserDetail } from '@/types/user'
import { updateUsersByGame } from '@actions/game'

interface PreviewProps {
  users: IUserDetail[]
  puzzle: IPuzzleDetail
  gameId: string
}

function Preview(props: PreviewProps): JSX.Element {
  const { users, puzzle, gameId } = props

  const session = useSession()

  useEffect(() => {
    async function updateUserGame(): Promise<void> {
      if (session.status !== 'authenticated') return

      const existUser = users.some((user) => user._id === session.data.user.id)
      console.log({ existUser })
      if (!existUser) {
        const data = await updateUsersByGame(gameId, session.data.user.id)

        console.log({ data })
      }
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

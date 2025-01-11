import { JSX, useMemo } from 'react'

import { IPuzzleDetail } from '@/types/puzzle'
import { IUserDetail } from '@/types/user'

interface PreviewProps {
  users: IUserDetail[]
  puzzle: IPuzzleDetail
}

function Preview(props: PreviewProps): JSX.Element {
  const { users, puzzle } = props

  const currentUsers = useMemo(() => {
    return users.map((user) => {
      return <div key={user._id}>{user.name}</div>
    })
  }, [users])

  return (
    <div>
      <ul>{currentUsers}</ul>
    </div>
  )
}

export default Preview

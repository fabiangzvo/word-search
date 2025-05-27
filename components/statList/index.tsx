import { JSX } from 'react'

import ListItem from './components/listItem'
import { StatListProps } from './types'

function StatList({ list }: StatListProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
      {list.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  )
}

export default StatList

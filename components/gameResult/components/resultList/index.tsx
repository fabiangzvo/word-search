import { JSX } from 'react'

import { ResultListProps } from './types'
import ListItem from '../listItem'

function ResultList({ list }: ResultListProps): JSX.Element {
  return (
    <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
      {list.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </div>
  )
}

export default ResultList

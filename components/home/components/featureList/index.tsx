import { type JSX } from 'react'

import FeatureItem from '../featureItem'
import type { FeatureListProps } from './types'

function PuzzleList({ features }: FeatureListProps): JSX.Element {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, i) => (
        <FeatureItem key={i} {...feature} />
      ))}
    </div>
  )
}

export default PuzzleList

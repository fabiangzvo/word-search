import { type JSX, useMemo } from 'react'

import FeatureItem from '../featureItem'
import type { FeatureListProps } from './types'

function PuzzleList({ features }: FeatureListProps): JSX.Element {
  const items = useMemo(
    () => features.map((feature, i) => <FeatureItem key={i} {...feature} />),
    [features]
  )

  return <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{items}</div>
}

export default PuzzleList

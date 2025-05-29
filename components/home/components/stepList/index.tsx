import { JSX } from 'react'

import { StepListProps } from './types'
import StepItem from '../stepItem'

function StepList({ steps }: StepListProps): JSX.Element {
  return (
    <div className="grid max-sm:grid-cols-1 max-md:grid-cols-3 grid-cols-4 gap-8">
      {steps.map((step, i) => (
        <StepItem key={i} {...step} />
      ))}
    </div>
  )
}

export default StepList

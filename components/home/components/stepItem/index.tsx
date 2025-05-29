import { JSX } from 'react'

import type { StepItem } from './types'

function StepItemComponent(props: StepItem): JSX.Element {
  const { title, description, step } = props

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 dark:to-default-900 dark:via-default-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default StepItemComponent

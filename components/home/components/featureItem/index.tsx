import { JSX, cloneElement } from 'react'
import { Card, CardBody } from '@heroui/card'

import type { FeatureItem } from './types'

function FeatureItem(props: FeatureItem): JSX.Element {
  const { icon, title, description } = props
  return (
    <Card className="p-4">
      <CardBody className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 dark:to-default-900 dark:via-default-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          {cloneElement(icon, {
            className: 'w-12 h-12 mx-auto text-white',
          } as SVGAElement)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardBody>
    </Card>
  )
}

export default FeatureItem

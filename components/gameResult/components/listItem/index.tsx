import { JSX } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Divider } from '@heroui/divider'

import { ListItemProps } from './types'

function ListItem({ label, value, icon }: ListItemProps): JSX.Element {
  return (
    <Card shadow="sm">
      <CardBody className="flex flex-row items-center justify-evenly gap-4 my-1">
        <div className="w-2/6 flex justify-center items-center">{icon}</div>
        <Divider orientation="vertical" />
        <div className="flex flex-col items-center justify-center w-4/6">
          <span className="text-foreground-400 text-base font-semibold text-center ">
            {label}
          </span>
          <span className="font-semibold text-xl">{value}</span>
        </div>
      </CardBody>
    </Card>
  )
}

export default ListItem

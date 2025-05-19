import { JSX } from 'react'
import { Button } from '@heroui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { ControlsProps } from './types'

function Controls(props: ControlsProps): JSX.Element {
  const { onMoveBoard } = props

  return (
    <div className="md:hidden flex justify-end gap-2">
      <Button
        isIconOnly
        variant="flat"
        size="sm"
        onPress={() => onMoveBoard(-100, 0)}
      >
        <ArrowLeft />
      </Button>
      <Button
        isIconOnly
        variant="flat"
        size="sm"
        onPress={() => onMoveBoard(100, 0)}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}

export default Controls

'use client'

import { JSX } from 'react'
import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
import { RotateCcw } from 'lucide-react'

import { rebootGame } from '@lib/actions/game'

import { RebootGameProps } from './types'

function RebootGameButton({ gameId }: RebootGameProps): JSX.Element {
  return (
    <Tooltip content="Reiniciar juego">
      <Button
        className="absolute top-0 right-6"
        variant="light"
        color="primary"
        isIconOnly
        onPress={() => rebootGame(gameId)}
      >
        <RotateCcw />
      </Button>
    </Tooltip>
  )
}

export default RebootGameButton

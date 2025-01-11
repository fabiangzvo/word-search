'use client'

import { JSX, useEffect } from 'react'

import { IGameDetailClient } from '@/types/game'

import Preview from './components/preview'

interface GameProps extends IGameDetailClient {}

function Game(props: GameProps): JSX.Element {
  const { puzzle, users } = props

  return (
    <div>
      <Preview puzzle={puzzle} users={users} />
    </div>
  )
}

export default Game

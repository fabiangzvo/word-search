'use client'

import { JSX, useState, useEffect } from 'react'
import { io, type Socket } from 'socket.io-client'

import { IGameDetailClient } from '@/types/game'

import Preview from './components/preview'

interface GameProps extends IGameDetailClient {}

export default function Game(props: GameProps): JSX.Element {
  const { puzzle, users, _id } = props

  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const sock = io('ws://localhost:8080')
    sock.on('connect', () => {
      console.log('Conexión establecida')
    })

    setSocket(sock)

    return () => {
      sock.disconnect()
    }
  }, [])

  return (
    <div>
      <Preview puzzle={puzzle} users={users} />
    </div>
  )
}

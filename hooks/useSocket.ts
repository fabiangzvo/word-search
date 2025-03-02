import { useState, useEffect } from 'react'
import { io, type Socket } from 'socket.io-client'

export function useSocket(): Socket {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const sock = io('ws://localhost:8080')
    sock.on('connect', () => console.log('established connection'))
    sock.on('error', (e) => console.log('error trying connect with backend', e))

    setSocket(sock)

    return () => {
      sock.disconnect()
    }
  }, [])

  return socket!
}

import { useState, useEffect } from 'react'
import { io, type Socket } from 'socket.io-client'

export function useSocket(): {
  socket: Socket | undefined
  isLoading: boolean
} {
  const [socket, setSocket] = useState<Socket>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const sock = io(process.env.NEXT_PUBLIC_SOCKET_URL)

    sock.on('connect', () => {
      setIsLoading(false)
      console.info('established connection')
    })
    sock.on('error', (e) => console.error('error trying connect with backend', e))

    setSocket(sock)

    return () => {
      sock.disconnect()
    }
  }, [])

  return { socket, isLoading }
}

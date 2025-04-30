import { useState, useEffect } from 'react'
import { io, type Socket } from 'socket.io-client'

export function useSocket(): Socket {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const sock = io(process.env.NEXT_PUBLIC_SOCKET_URL)

    sock.on('connect', () => console.log('established connection'))
    sock.on('error', (e) => console.log('error trying connect with backend', e))

    setSocket(sock)

    return () => {
      sock.disconnect()
    }
  }, [])

  return socket!
}

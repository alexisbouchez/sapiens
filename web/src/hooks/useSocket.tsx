import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = io(url, {
      withCredentials: true,
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return socket
}

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || '', {
      withCredentials: true,
    })

    setSocket(socket)

    return () => {
      socket.disconnect()
    }
  }, [])

  return socket
}

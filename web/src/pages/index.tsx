import { useEffect, useState } from 'react'
import Container from '~/components/common/Container'
import type { Page } from '~/types'
import NewMessageForm from '~/components/chat/NewMessageForm'
import MessagesList from '~/components/chat/MessagesList'
import useSocket from '~/hooks/useSocket'

const Home: Page = () => {
  const [messages, setMessages] = useState<string[]>([])
  const socket = useSocket(process.env.NEXT_PUBLIC_BACKEND_URL || '')

  useEffect(() => {
    if (socket) {
      socket.on('serverToClient', (message: string) => {
        setMessages((messages) => [...messages, message])
      })
    }
  }, [socket])

  const handleSubmit = (variables: { message: string }) => {
    if (socket) {
      socket.emit('clientToServer', variables.message)
    }
  }

  return (
    <Container>
      <h1>Discuss</h1>
      <NewMessageForm handleSubmit={handleSubmit} />
      <MessagesList messages={messages} />
    </Container>
  )
}

export default Home

Home.isPrivate = true

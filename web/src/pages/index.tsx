import { useEffect, useState } from 'react'
import Container from '~/components/common/Container'
import type { Page } from '~/types'
import io from 'socket.io-client'
import NewMessageForm from '~/components/chat/NewMessageForm'
import MessagesList from '~/components/chat/MessagesList'

const Home: Page = () => {
  const [messages, setMessages] = useState<string[]>([])

  const socket = io('http://localhost:5000')

  useEffect(() => {
    socket.on('serverToClient', (message: string) => {
      setMessages((messages) => [...messages, message])
    })
  }, [])

  const handleSubmit = (variables: { message: string }) => {
    socket.emit('clientToServer', variables.message)
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

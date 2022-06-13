import { useEffect, useState } from 'react'
import Container from '~/components/common/Container'
import type { Page } from '~/types'
import NewMessageForm from '~/components/chat/NewMessageForm'
import MessagesList from '~/components/chat/MessagesList'
import { useSubscription } from '@apollo/client'
import { CHAT_ADDED } from '~/lib/graphql/subscriptions/chat'

const Home: Page = () => {
  const [messages, setMessages] = useState<string[]>([])

  const { data } = useSubscription(CHAT_ADDED)

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.chatAdded.message])
    }
  }, [data])

  return (
    <Container>
      <h1>Discuss</h1>
      <NewMessageForm />
      <MessagesList messages={messages} />
    </Container>
  )
}

export default Home

Home.isPrivate = true

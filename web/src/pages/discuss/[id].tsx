import { useSubscription } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MessagesList from '~/components/chat/MessagesList'
import NewChatRoom from '~/components/chat/NewChatRoom'
import NewMessageForm from '~/components/chat/NewMessageForm'
import Container from '~/components/common/Container'
import { CHAT_ADDED } from '~/lib/graphql/subscriptions/chat'
import { Page } from '~/types'

const Discuss: Page = () => {
  const {
    query: { id: chatRoomId },
  } = useRouter()
  const [messages, setMessages] = useState<string[]>([])

  const { data } = useSubscription(CHAT_ADDED, {
    variables: { chatRoomId },
  })

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.chatAdded.message])
    }
  }, [data])

  return (
    <Container>
      <h1>Discuss</h1>
      <NewMessageForm chatRoomId={chatRoomId as string} />
      <MessagesList messages={messages} />
    </Container>
  )
}

export default Discuss

Discuss.isPrivate = true

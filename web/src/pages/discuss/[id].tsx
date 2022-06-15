import { useSubscription } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ChatsList from '~/components/chat/ChatsList'
import NewMessageForm from '~/components/chat/NewMessageForm'
import Container from '~/components/common/Container'
import { CHAT_ADDED } from '~/lib/graphql/subscriptions/chat'
import type { Chat, Page } from '~/types'

const Discuss: Page = () => {
  const {
    query: { id: chatRoomId },
  } = useRouter()
  const [chats, setChats] = useState<Chat[]>([])

  const { data } = useSubscription(CHAT_ADDED, {
    variables: { chatRoomId },
  })

  useEffect(() => {
    if (data) {
      setChats([...chats, data.chatAdded])
    }
  }, [data])

  return (
    <Container>
      <h1>Discuss</h1>
      <NewMessageForm chatRoomId={chatRoomId as string} />
      <ChatsList chats={chats} />
    </Container>
  )
}

export default Discuss

Discuss.isPrivate = true

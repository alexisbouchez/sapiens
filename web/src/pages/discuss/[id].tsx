import { useQuery, useSubscription } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ChatsList from '~/components/chat/ChatsList'
import NewMessageForm from '~/components/chat/NewMessageForm'
import Container from '~/components/common/Container'
import { CHATS_QUERY } from '~/lib/graphql/queries/chats'
import { CHAT_ADDED } from '~/lib/graphql/subscriptions/chat'
import type { Chat, Page } from '~/types'

const Discuss: Page = () => {
  const {
    query: { id: chatRoomId },
  } = useRouter()
  const [mounted, setMounted] = useState<boolean>(false)

  const { subscribeToMore, ...result } = useQuery(CHATS_QUERY, {
    variables: { chatRoomId },
  })

  const subscribeToNewChats = () => {
    subscribeToMore({
      document: CHAT_ADDED,
      variables: { chatRoomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }

        const newChat = subscriptionData.data.chatAdded

        return Object.assign({}, prev, { chats: [...prev.chats, newChat] })
      },
    })
  }

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      subscribeToNewChats()
    }
  }, [])

  return (
    <Container>
      <h1>Discuss</h1>
      <NewMessageForm chatRoomId={chatRoomId as string} />
      <ChatsList chats={result.data?.chats || []} />
    </Container>
  )
}

export default Discuss

Discuss.isPrivate = true

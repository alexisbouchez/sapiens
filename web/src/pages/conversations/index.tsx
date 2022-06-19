import { useQuery } from '@apollo/client'
import Container from '~/components/common/Container'
import { CHAT_ROOMS_QUERY } from '~/lib/graphql/queries/chats'
import type { ChatRoom, Page } from '~/types'
import Link from 'next/link'

const Conversations: Page = () => {
  const { data } = useQuery(CHAT_ROOMS_QUERY)

  return (
    <Container>
      <h1>Conversations</h1>
      <ul>
        {data?.chatRooms.map((chatRoom: ChatRoom, key: number) => (
          <Link key={chatRoom.id} href={`/conversations/${chatRoom.id}`}>
            <a>
              <li>{chatRoom.otherUserName}</li>
            </a>
          </Link>
        ))}
      </ul>
    </Container>
  )
}

export default Conversations

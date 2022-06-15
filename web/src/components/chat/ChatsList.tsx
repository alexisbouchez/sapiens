import useMe from '~/hooks/useMe'
import type { Chat } from '~/types'

export interface ChatsListProps {
  chats: Chat[]
}

export default function ChatsList({ chats }: ChatsListProps) {
  const { me } = useMe()

  return (
    <ul>
      {chats.map((chat) => (
        <li
          key={chat.id}
          className={me?.id === chat.userId ? 'text-right' : 'text-left'}
        >
          <p>{chat.message}</p>
        </li>
      ))}
    </ul>
  )
}

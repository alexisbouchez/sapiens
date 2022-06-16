import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { OPEN_CHAT_ROOM } from '~/lib/graphql/mutations/chat'

interface ChatButtonProps {
  freelancerId: string
}

export default function ChatButton({ freelancerId }: ChatButtonProps) {
  const [openChatRoom, { loading }] = useMutation(OPEN_CHAT_ROOM)
  const router = useRouter()

  const onClick = async () => {
    try {
      const {
        data: {
          openChatRoom: { id },
        },
      } = await openChatRoom({ variables: { userId: freelancerId } })
      router.push(`/discuss/${id}`)
    } catch {}
  }

  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? 'Chating...' : 'Chat'}
    </button>
  )
}

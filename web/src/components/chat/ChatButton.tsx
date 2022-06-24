import { useMutation } from '@apollo/client'
import { MailIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import useMe from '~/hooks/useMe'
import { OPEN_CHAT_ROOM } from '~/lib/graphql/mutations/chat'

export interface ChatButtonProps {
  freelancerId: string
}

export default function ChatButton({ freelancerId }: ChatButtonProps) {
  const { me } = useMe()
  const [openChatRoom, { loading }] = useMutation(OPEN_CHAT_ROOM)
  const router = useRouter()

  const onClick = async () => {
    try {
      const {
        data: {
          openChatRoom: { id },
        },
      } = await openChatRoom({ variables: { userId: freelancerId } })
      router.push(`/conversations/${id}`)
    } catch {}
  }

  return (
    <button
      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={me?.id === freelancerId || loading}
      onClick={onClick}
    >
      <MailIcon
        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
      <span>{loading ? 'Loading...' : 'Message'}</span>
    </button>
  )
}

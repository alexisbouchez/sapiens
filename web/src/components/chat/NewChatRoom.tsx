import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import useForm from '~/hooks/useForm'
import { CREATE_CHAT_ROOM } from '~/lib/graphql/mutations/chat'
import SubmitButton from '../common/forms/buttons/SubmitButton'
import InputField from '../common/forms/fields/InputField'

export default function NewChatRoom() {
  const [createChatRoom] = useMutation(CREATE_CHAT_ROOM)
  const router = useRouter()
  const { variables, onChange, onSubmit } = useForm({
    initialVariables: { userId: '' },
    handleSubmit: async (variables) => {
      const { data } = await createChatRoom({ variables })
      router.push(`/discuss/${data.createChatRoom.id}`)
    },
  })

  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="User id"
        id="userId"
        name="userId"
        type="text"
        placeholder="User id"
        value={variables.userId}
        onChange={onChange}
      />
      <SubmitButton>Create chat room</SubmitButton>
    </form>
  )
}

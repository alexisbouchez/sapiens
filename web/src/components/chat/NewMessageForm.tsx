import { useMutation } from '@apollo/client'
import useForm, { HandleSubmit } from '~/hooks/useForm'
import { ADD_CHAT } from '~/lib/graphql/mutations/chat'
import SubmitButton from '../common/forms/buttons/SubmitButton'
import InputField from '../common/forms/fields/InputField'
import TextareaField from '../common/forms/fields/TextareaField'

interface NewMessageFormState {
  message: string
}

const initialVariables: NewMessageFormState = { message: '' }

interface NewMessageFormProps {
  chatRoomId: string
}

export default function NewMessageForm({ chatRoomId }: NewMessageFormProps) {
  const [addChat] = useMutation(ADD_CHAT)

  const handleSubmit: HandleSubmit<NewMessageFormState> = async (
    variables,
    setVariables,
  ) => {
    await addChat({ variables: { ...variables, chatRoomId } })
    setVariables(initialVariables)
  }

  const { onChange, onSubmit, variables } = useForm({
    initialVariables: initialVariables,
    handleSubmit,
  })

  return (
    <form onSubmit={onSubmit} className="flex justify-between w-full">
      <InputField
        type="text"
        id="message"
        name="message"
        placeholder="Message"
        value={variables.message}
        onChange={onChange}
        className="rounded-r-none"
      />
      <SubmitButton className="rounded-l-none">Send</SubmitButton>
    </form>
  )
}

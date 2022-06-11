import useForm, { HandleSubmit } from '~/hooks/useForm'
import useSocket from '~/hooks/useSocket'
import SubmitButton from '../common/forms/buttons/SubmitButton'
import TextareaField from '../common/forms/fields/TextareaField'

interface NewMessageFormState {
  message: string
}

const initialVariables: NewMessageFormState = { message: '' }

export default function NewMessageForm() {
  const socket = useSocket()

  const handleSubmit: HandleSubmit<NewMessageFormState> = (
    variables,
    setVariables,
  ) => {
    if (socket) {
      socket.emit('clientToServer', variables.message)
      setVariables(initialVariables)
    }
  }

  const { onChange, onSubmit, variables } = useForm({
    initialVariables: initialVariables,
    handleSubmit,
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <TextareaField
        id="message"
        label="New message"
        name="message"
        value={variables.message}
        onChange={onChange}
      />
      <SubmitButton>Send</SubmitButton>
    </form>
  )
}

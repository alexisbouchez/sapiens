import useForm, { HandleSubmit } from '~/hooks/useForm'
import useSocket from '~/hooks/useSocket'
import SubmitButton from '../common/forms/buttons/SubmitButton'

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
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="message">New message</label>
        <div>
          <textarea
            name="message"
            id="message"
            value={variables.message}
            onChange={onChange}
          ></textarea>
        </div>
      </div>
      <SubmitButton>Send</SubmitButton>
    </form>
  )
}

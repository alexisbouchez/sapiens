import useForm from '~/hooks/useForm'
import SubmitButton from '../common/forms/buttons/SubmitButton'

export interface NewMessageFormProps {
  handleSubmit: (variables: { message: string }) => void
}

export default function NewMessageForm({ handleSubmit }: NewMessageFormProps) {
  const { onChange, onSubmit } = useForm({
    initialVariables: { message: '' },
    handleSubmit,
  })

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="message">New message</label>
        <div>
          <textarea name="message" id="message" onChange={onChange}></textarea>
        </div>
      </div>
      <SubmitButton>Send</SubmitButton>
    </form>
  )
}

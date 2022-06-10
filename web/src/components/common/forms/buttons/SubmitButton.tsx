export interface SubmitButtonProps {
  loading: boolean
}

export default function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <button type="submit" disabled={loading}>
      {loading ? 'Submitting' : 'Submit'}
    </button>
  )
}

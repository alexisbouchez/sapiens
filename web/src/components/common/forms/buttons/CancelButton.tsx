export interface CancelButtonProps {
  onClick?: () => void
}

export default function CancelButton({ onClick }: CancelButtonProps) {
  const type = onClick ? 'button' : 'reset'

  return (
    <button type={type} onClick={onClick}>
      Cancel
    </button>
  )
}

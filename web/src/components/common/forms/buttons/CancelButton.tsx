export interface CancelButtonProps {
  onClick?: () => void
}

export default function CancelButton({ onClick }: CancelButtonProps) {
  const type = onClick ? 'button' : 'reset'

  return (
    <button
      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-opium-500 focus:ring-offset-2"
      type={type}
      onClick={onClick}
    >
      Cancel
    </button>
  )
}

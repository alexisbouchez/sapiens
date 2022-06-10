export interface AuthHeaderProps {
  title: string
  children?: React.ReactNode
}

export default function AuthHeader({ title, children }: AuthHeaderProps) {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-extrabold  text-gray-900">{title}</h2>
      {children ? (
        <p className="mt-2 text-sm text-gray-600">{children}</p>
      ) : null}
    </div>
  )
}

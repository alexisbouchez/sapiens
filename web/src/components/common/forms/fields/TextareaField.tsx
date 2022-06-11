interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  errors?: string[]
}

export default function TextareaField(props: TextareaFieldProps) {
  const { label, errors, id, ...rest } = props

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id={id}
          {...rest}
        ></textarea>
        {errors ? (
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="text-red-600 text-sm">
                {label} {error}.
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

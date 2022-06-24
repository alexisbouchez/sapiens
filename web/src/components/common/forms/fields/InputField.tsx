interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: string[]
  className?: string
}

export default function InputField(props: InputFieldProps) {
  const { label, type, errors, id, className, ...rest } = props

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="">
        <input
          className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:border-blue-500 sm:text-sm ${className}`}
          id={id}
          type={type || 'text'}
          {...rest}
        />
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

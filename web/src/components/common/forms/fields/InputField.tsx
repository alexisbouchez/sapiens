interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  errors?: string[]
}

export default function InputField(props: InputFieldProps) {
  const { label, name, id, defaultValue, type, value, onChange, errors } = props

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type || 'text'}
        id={id}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      />
      {errors ? (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>
              {label} {error}.
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

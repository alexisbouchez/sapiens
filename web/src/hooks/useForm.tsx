import { ApolloError } from '@apollo/client'
import { useEffect, useState } from 'react'
import treatApolloError from '~/lib/graphql/treatApolloError'

interface useFormsProps<T> {
  initialVariables: T
  handleSubmit: (variables: T) => void | Promise<void>
}

export default function useForm<T>({
  initialVariables: initialVariablesProp,
  handleSubmit,
}: useFormsProps<T>) {
  const [initialVariables, setInitialVariables] = useState(initialVariablesProp)
  const [variables, setVariables] = useState<T>(initialVariables)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [otherError, setOtherError] = useState<string>('')

  useEffect(() => {
    if (
      JSON.stringify(initialVariablesProp) !== JSON.stringify(initialVariables)
    ) {
      setInitialVariables(initialVariablesProp)
      setVariables(initialVariablesProp)
    }
  }, [initialVariablesProp])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVariables({
      ...variables,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await handleSubmit(variables)

      setOtherError('')
      setErrors({})
    } catch (error) {
      if (error instanceof ApolloError) {
        const errors = treatApolloError(error)

        if (typeof errors === 'string') {
          setOtherError(errors)
          setErrors({})
        } else {
          setOtherError('')
          setErrors(errors)
        }
      } else if (error instanceof Error) {
        setOtherError(error.message)
        setErrors({})
      } else {
        setOtherError('An unknown error occurred.')
        setErrors({})
      }
    }
  }

  return {
    variables,
    setVariables,
    onChange,
    onSubmit,
    errors,
    otherError,
  }
}

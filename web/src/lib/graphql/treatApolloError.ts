import type { ApolloError } from '@apollo/client'
import type { Errors } from '~/types'

export default function treatApolloError(error: ApolloError): Errors {
  if (error.message === 'Bad Request Exception') {
    const errors: Record<string, string[]> = {}

    for (const graphQLError of error.graphQLErrors) {
      const apiErrors = (
        graphQLError.extensions.response as { message: string[] }
      ).message

      for (const apiError of apiErrors) {
        const [key, ...rest] = apiError.split(' ')
        const error = rest.join(' ')

        if (errors[key]) {
          errors[key].push(error)
        } else {
          errors[key] = [error]
        }
      }
    }

    return errors
  }

  return error.message
}

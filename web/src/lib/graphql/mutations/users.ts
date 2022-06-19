import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!, $name: String!) {
    updateUser(updateUserInput: { email: $email, name: $name }) {
      email
      name
    }
  }
`

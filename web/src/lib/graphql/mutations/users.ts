import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!) {
    updateUser(updateUserInput: { email: $email }) {
      email
    }
  }
`

import { gql } from '@apollo/client'

export const ME = gql`
  query Me {
    me {
      email
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String!) {
    updateUser(updateUserInput: { email: $email }) {
      email
    }
  }
`

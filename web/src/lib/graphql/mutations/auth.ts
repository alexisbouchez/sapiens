import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    signUp(
      createUserInput: {
        name: $name
        email: $email
        password: $password
        role: $role
      }
    ) {
      id
      email
      name
      role
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(authCredentialsInput: { email: $email, password: $password }) {
      id
      email
      role
      name
      profile {
        id
        price
      }
    }
  }
`

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`

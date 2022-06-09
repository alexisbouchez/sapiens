import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(createUserInput: { email: $email, password: $password })
  }
`

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(authCredentialsInput: { email: $email, password: $password })
  }
`

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`

import { gql } from '@apollo/client'

export const CREATE_PROFILE = gql`
  mutation CreateProfile($name: String!) {
    createProfile(createProfileInput: { name: $name }) {
      id
      name
    }
  }
`

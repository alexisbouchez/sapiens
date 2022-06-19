import { gql } from '@apollo/client'

export const CREATE_PROFILE = gql`
  mutation CreateProfile($price: Float!) {
    createProfile(createProfileInput: { price: $price }) {
      id
      price
    }
  }
`

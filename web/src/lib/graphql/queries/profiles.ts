import { gql } from '@apollo/client'

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($id: String!) {
    profile(id: $id) {
      id
      price
      user {
        id
        name
      }
    }
  }
`

export const QUERY_PROFILES = gql`
  query QueryProfiles {
    profiles {
      id
      price
      user {
        name
      }
    }
  }
`

export const QUERY_PROFILE_IDS = gql`
  query QueryProfileIds {
    profiles {
      id
    }
  }
`

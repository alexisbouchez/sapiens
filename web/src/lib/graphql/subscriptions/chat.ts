import { gql } from '@apollo/client'

export const CHAT_ADDED = gql`
  subscription OnChatAdded {
    chatAdded {
      message
    }
  }
`

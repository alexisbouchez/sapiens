import { gql } from '@apollo/client'

export const CHAT_ADDED = gql`
  subscription OnChatAdded($chatRoomId: String!) {
    chatAdded(chatRoomId: $chatRoomId) {
      id
      message
      userId
    }
  }
`

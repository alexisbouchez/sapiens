import { gql } from '@apollo/client'

export const CHATS_QUERY = gql`
  query ChatsForChatRoom($chatRoomId: String!) {
    chats(chatRoomId: $chatRoomId) {
      id
      message
      userId
    }
  }
`

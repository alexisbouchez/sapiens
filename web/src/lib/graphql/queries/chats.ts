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

export const CHAT_ROOMS_QUERY = gql`
  query ChatRooms {
    chatRooms {
      id
      otherUserName
    }
  }
`

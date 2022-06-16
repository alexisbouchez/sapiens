import { gql } from '@apollo/client'

export const OPEN_CHAT_ROOM = gql`
  mutation OpenChatRoom($userId: String!) {
    openChatRoom(userId: $userId) {
      id
    }
  }
`

export const ADD_CHAT = gql`
  mutation AddChat($chatRoomId: String!, $message: String!) {
    addChat(chatRoomId: $chatRoomId, createChatInput: { message: $message }) {
      message
    }
  }
`

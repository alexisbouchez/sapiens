import { gql } from '@apollo/client'

export const CREATE_CHAT_ROOM = gql`
  mutation CreateChatRoom($userId: String!) {
    createChatRoom(userId: $userId) {
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

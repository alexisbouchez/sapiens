import { gql } from '@apollo/client'

export const ADD_CHAT = gql`
  mutation AddChat($message: String!) {
    addChat(createChatInput: { message: $message }) {
      message
    }
  }
`

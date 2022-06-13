import { gql } from '@apollo/client'

export const CHAT_ADDED = gql`
  subscription OnChatAdded($message: String!) {
    chatAdded(createChatInput: { message: $message }) {
      message
    }
  }
`

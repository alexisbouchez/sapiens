export interface MessagesListProps {
  messages: string[]
}

export default function MessagesList({ messages }: MessagesListProps) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  )
}

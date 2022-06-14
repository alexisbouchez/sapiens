import NewChatRoom from '~/components/chat/NewChatRoom'
import Container from '~/components/common/Container'
import type { Page } from '~/types'

const Home: Page = () => {
  return (
    <Container>
      <h1>Discuss</h1>
      <NewChatRoom />
    </Container>
  )
}

export default Home

Home.isPrivate = true

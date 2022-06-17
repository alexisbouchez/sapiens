import Link from 'next/link'
import Container from '~/components/common/Container'
import type { Page } from '~/types'

const Home: Page = () => {
  return (
    <Container>
      <h1>Discuss</h1>

      <Link href="/profiles">
        <a>Profiles</a>
      </Link>
    </Container>
  )
}

export default Home

Home.isPrivate = true
